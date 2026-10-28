---
title: Building a JavaScript CI/CD Pipeline
date: 2019-11-21T10:17:41.000Z
permalink: /2019/11/21/building-a-javascript-ci-cd-pipeline/
categories:
  - continuous-integration
  - qachef
wordpressId: 5131
---

What's it like to for an experienced developer to learn the latest JavaScript tooling from scratch in 2019?

It's not pretty.

## The Goal

At [QA Chef](https://qachef.com/), we want to build systems that are:

- modular (strong cohesion, loose coupling, well designed components)
- simple and easy to maintain or rewrite (we'd like to keep our options open for better ways of doing things in the future)
- using the latest language features (the new features are _really_ good - see [The Good Parts](#the-good-parts) below)
- with a robust and fast build pipeline
- with the ability to deploy continuously
- with testability and observability built in

I had a number of discussions with CTO Andy about our approach, and what technology platform(s) to use. We agreed that given our dependency on JavaScript on the browser-based applications we had, using Node.js for services would allow us to concentrate our expertise.

The first thing I wanted to do: build a robust continuous integration pipeline for our chosen technology.

## Starting From Scratch

In the 5 years since I'd last been an active JavaScript developer, a whole new set of tooling seems to have emerged. Luckily, I had been to a talk by Cory House at [SDD](https://sddconf.com/) in 2016, were he gave a talk about setting up "modern" JavaScript development environments. Referring back to my (now 3 year old) notes, I found his [javascript-development-environment](https://github.com/coryhouse/javascript-development-environment) project on GitHub. This is a project you can use as a template to kick-start new projects. A quick glance showed that the code didn't seem to have been updated in 3 years, which was a worry (things move fast in JavaScript land!). However, a closer investigation showed that Cory had created the [update-2019 branch](https://github.com/coryhouse/javascript-development-environment/tree/update-2019). Cool! At least I had something to start with.

Cory's starter project has the following tools and libraries:

- [Node.js](https://nodejs.org/en/): used to run build tooling and server applications (i.e. the webserver)
- [npm](https://www.npmjs.com/): used for package management
- [Babel](https://babeljs.io/) (which includes sub-components core, cli, node, preset-env and register). Allows you to write code in the latest version of JavaScript, even on platforms that don't fully support the latest language feature (I'm looking at you, Node.js!)
- [Express](https://expressjs.com/): A webserver that runs on the Node.js platform
- [Webpack](https://webpack.js.org/): Bundles together library that are used for browser based applications.
- [ESLint](https://eslint.org/): A tool to check the quality of code
- [Mocha](https://mochajs.org/): A testing framework
- [Chai](https://www.chaijs.com/): An assertion library
- [JSDom](https://github.com/jsdom/jsdom): Tools for working with web documents (used in tests)
- ... and [a heap of other utilities](https://github.com/coryhouse/javascript-development-environment/blob/master/package.json#L30)

The only problem: what _is_ all this stuff? I was aware of most of these projects, but 5 years in the wilderness, not honing my craft on these tools, meant that I had a lot to cover. I briefly discussed with my colleague Andy about bringing in an expert in these technologies to help us, but we were nervous about the time it would take us to find someone we could trust, and then the extra time it would take them to learn our domain. We didn't get the expert help, which in retrospect was probably a false economy, given the problems I've encountered (see [The Bad Parts](#the-bad-parts) below)

## The Bad Parts

### Configuring Babel

For all its nice features, I was surprised to find that Node.js was quite a long way behind in directly supporting the latest language features, and in particular, the lack of support for ES2015 modules. This means that if we want to use the latest features, we have to use Babel.

Babel is not simple to configure. I initially had a lot of trouble following the Cory's examples because there was a lot of assumed knowledge that I didn't have:

- There's a .babelrc file
- ... except when you use the "babel" section of the package.json file
- There's a huge amount of options to configure
- But don't bother with that, because you can use the presets
- Which presets, though?
- ... and exactly what is the correct way to configure these?

OK, you have Babel configured. You can now write code using the latest version of the ECMAScript standard. We're cool, right?

Not so fast! How are you going to package and invoke the code? There seems to be a number of options:

- Set up a build step where the code is transpiled into an older version of JavaScript, and get Node.js to run that.
- Run "babel-node" instead of "node", where the transpilation steps happens on the fly.

I ended up configuring npm to use babel-node.

All in all, it took a few days to get all these pieces working together nicely, and I had to adjust my mental models of what was happening under the covers a few times.

### Configuring Webpack

Webpack is interesting. I does two things which I consider valuable:

- Finds all the dependencies used in your code
- Packages them into a one or more artifacts for delivery to browsers.

I wasn't so worried about the overhead of the browser requesting multiple dependencies, but I was _really_ keen on the way webpack manages dependencies. In the old days, for every vendor library I used, i would grab a copy of it, check it into my code base, and then add links in the HTML to request the dependency directly. Webpack let's me avoid all of that. I just add the dependency to package.json, and as long it the dependency is referenced in my code, it will be properly packaged up without any further intervention.

That's the theory, anyway. As it turns out, my mental model of how webpack worked wasn't quite right to begin with. Add in some slightly confusing terminology, and a very complex configuration file, it ended up taking many days to fully understand things well enough to correctly configure it. In addition, express allow different types of "middleware", which is supposed to give a better development experience, but ended up confusing me for many days. If something were to go wrong, I'd probably still have a lot of trouble fixing it

### Separating code into modules

Surprisingly, separating code into modules causes me probably the biggest pain. All in all, it took me over a week to sort our what I expected to be a fairly simply architectural decomposition.

After looking into I wanted to split our code base into 3 packages:

- "@qachef/domain" for shared domain code which can be used on either the browser or the server
- "@qachef/events" for server side event storage, retrieval and other infrastructure bits
- "@qachef/web" for the user facing web server, along with view rendering.

These are all private packages, which I didn't want to share with the world at large.

My first thought on separating dependencies: set up a private npm repository, and publish to there. How hard can it be? As it turns out, it's not trivial. You need to set up a [private CouchDB server](https://stackoverflow.com/questions/7575627/can-you-host-a-private-repository-for-your-organization-to-use-with-npm), which is doable, but I though that committing to maintaining infrastructure like that would be a bit too much for a small organisation like QA Chef. I didn't spend too long on this line of thought, but it still takes time to sort through the options.

My second thought on separating dependencies: use a private git repository as npm dependencies. I thought that this actually has good support in npm. As it turns out, there are a number of "quirks" (a.k.a. bugs). These may be fixed in the future, but it took me a number of days to explore ways of sidestepping the problem, which ultimately didn't work. What was the problem, exactly? This:

In the "@qachef/web" package, I set up dependencies to look something like this:

```
"dependencies": {
    "@qachef/qachef-domain":
      "git+https://<gitlab-token>:<password>@gitlab.com:qachef/qachef-domain.git"
    ...
}}
```

When I tested this on my own machine, it worked find. As it turns out, npm has difficultly parsing a dependency with a url that looks like that, and silently switches to actually request from a https based url with username and password, to a ssh based url like this: "ssh://git@gitlab.com/qachef/qachef-domain.git". My own machine has ssh keys installed, but of course the GitLab CI serve didn't, and so it failed to load the dependency. I did have to spend a fair amount of time getting the GitLab to use the correct Docker image with the right version of Node.js and the right version of git available, but in the end I couldn't work out a way to avoid triggering the bug.

My third thought on separating dependencies: pay NPM Inc for a private repo. It's only $US7 a month, which is a lot cheaper than the amount of time I had spent trying to solve this problem. I did actually set this up, but then I started to think about how to distribute access keys into the CI infrastructure. I thought about this a bit, then decided that a monorepo setup might just avoid _all_ of these types of problems.

My fourth thought on separating dependencies: use a monorepo. As I discovered during the past couple of weeks, it's possible to set up a file based dependency with a relative URL, like this:

```
"dependencies": {
    "@qachef/qachef-domain": "file:../qachef-domain"
...
}}
```

On the surface, it sounded like it was the simplest way to solve the problem. As it turned out, I ended up triggering another bug in NPM: [ENOENT error when the same package appears in local dependencies](https://npm.community/t/enoent-error-when-the-same-package-appears-in-local-dependencies/10099). According to the comments in that bug, this is a fundamental problem with the way that NPM handles dependencies, and can't be fixed until npm 7.0 (whenever that will be).

I was able to find a work around that involved deleting the package-lock.json file, and running "npm install" instead of "npm ci" on CI, but it seems quite hacky, and it look me far to long to converge on something that worked.

All in all, it was a very long and frustrating experience to do what I expected to be a fairly simple exercise in architectural decomposition.

## The Good Parts

Even with all the complaints, there's still a lot to recommend

The core language has improved, a _**lot**_ since the ES5 days, when I learned JavaScript: The Good Parts. What's new?

ES2015 (a.k.a ES6) added a heap of new features. The one's I've been using most (so far):

- Arrows and lexical "this" simplify anonymous function declarations enormously
- Classes are now a lot more usable
- Template strings are awesome (string handling was one of my pet hates in JavaScript back in the day)
- Destructuring! Nice!
- Modules! Finally proper encapsulation and separation.
- Promises
- Plus [more features](https://github.com/lukehoban/es6features#readme).

ES2017 added more good stuff, but I've mainly focused on the introduction of async/await. I've been experimenting with this feature. My experience is that the code appears to be clearer and more understandable, though I'm still trying to understand the appropriate places to use it.

One thing that's been a bit of a shining light in the dark: [WebStorm](https://www.jetbrains.com/webstorm/). As someone who's been using IntelliJ for many years, being able to work in a familiar development environment has been a huge boon.
