---
title: Agile Applications with Java
date: 2014-12-14T20:07:38.000Z
permalink: /2014/12/14/agile-applications-with-java/
categories:
  - agile
wordpressId: 580
comments:
  - id: 48
    author: Suggs
    date: 2014-12-15T20:49:43.000Z
    content: Schweet schmetz!
---

I've been re-reading a couple of resources on modern application design:

- [The Twelve-Factor App](http://12factor.net/)
- [Java Doesn't Suck – You’re Just Using it Wrong](http://www.jamesward.com/2014/12/03/java-doesnt-suck-youre-just-using-it-wrong)

Those links contain a huge amount of distilled knowledge and advice on how we should build applications today. If you're working on applications that don't follow the advice in those articles, take note!

As an exercise in preparing for a Hackathon at work last month, I wanted something to allow me to quickly get up and running with a Twelve-Factor app without too much fuss. With this goal in mind, I ended up with something that I'm quite happy with:

[https://github.com/tumbarumba/dropwizard-marionette](https://github.com/tumbarumba/dropwizard-marionette).

It's interesting to review how I ended up with that starting point. I went through a number of decisions:

**Problem domain?**

Before the Hackathon there were a number of ideas proposed for projects that could demonstrate skill and business value in 24 hours. I already had narrowed in on one: automation of some administration that affected everyone in the company. It seemed like a focused problem with a clear business benefit.

**Architecture?** 

I thought that an application server to coordinate the administrative tasks, with a web front-end to allow user interaction would be a reasonable way to solve the problem (and give us something to demonstrate at the end of the Hackathon).

**Server language?**

A Hackathon is not a great place to learn a new language, you need to be able to hit the ground running, and so a familiar language is required. For me, this would me a choice of:

- Ruby
- Java (preferably Java 8)
- Scala

However, the most of my team mates would not be that familiar with anything but Java, so that was an easy choice in this situation.

**Server library/framework?**

At the time of the Hackathon, I was aware of these frameworks:

- [Play Framework](https://www.playframework.com/)
- [Dropwizard](http://dropwizard.io/)

The reactive optimisations in the Play Framework were tempting, but I thought that Dropwizard gives a much better coverage of the features of the Twelve-Factor app, plus I was much more familiar with the libraries used by Dropwizard.

**Front-end language?**

Javascript or Coffeescript? My last experiment with Coffeescript was a couple of years ago. It was OK, but I didn't think it was a massive win. Given I would need to be working with other people who are probably less familiar with Coffeescript, Javascript was the only real choice.

**Front-end framework?**

There are lots out there, but I have had experience with [Marionette](http://marionettejs.com/) (effectively an improved [Backbone](http://backbonejs.org/)).

All the above questions led pretty directly to [dropwizard-marionette](https://github.com/tumbarumba/dropwizard-marionette).

Result: **we won**! Twice! My team won both the regional UK Hackathon, and the global Hackathon in a head-to-head with all the other regional winners. I'd like to say that the technical preparation was the real winner, but I suspect that the main decider was based more upon the clear business benefit of our solution. I'm happy either way: my team now has some pretty big trophies we can use to taunt our co-workers. Win-win!
