---
title: 'CITCON ''09: Better Ant Builds'
date: 2009-09-20T20:53:53.000Z
permalink: /2009/09/20/citcon-09-better-ant-builds/
categories:
  - build-automation
  - continuous-integration
wordpressId: 376
---

The first session I attended (and partially ran) was Better Ant Builds.

During the session proposals, Ivan Moore originally suggested a talk on better builds for Java programs. There were later proposals for sessions regarding improvements to Maven, so I proposed my own session "Better Ant Builds" to differentiate it from the Maven sessions.

My main goal was to promote by own contribution to this area: the [Ant Script Library](/asl/). JTF knew about this, and asked some leading questions when I proposed the talk about my library, which I thought was funny. I thought it would have been a bit too cheeky to give a great big marketing pitch, but then again I'm not the best marketer. Thanks for the push, Jeff!

Despite there being no projector available, I was able to talk a fair bit about the ASL, along with some of it's background and design. People seemed interested, which I'm taking as a good sign. I won't go into details, the [website](/asl/) already has everything I discussed.

Jeff also pointed out the [Ant Master Build Scripts](http://code.google.com/p/ant-master-build-scripts/), which at a glance seems to be a very similar project to the ASL. Looking at them, I'm pretty impressed. The author of those scripts presented a session at JavaOne called "[Object Oriented Ant Scripts for the Enterprise](http://developers.sun.com/learning/javaoneonline/j1sessn.jsp?sessn=TS-4166&yr=2009&track=javase)", which I think nails the leading design principles for reusable Ant scripts. I'd say the the master build scripts have a higher emphasis on J2EE projects, which the ASL leans more to building Java libraries, applications and static analysis. Plenty of room for both projects to grow!

The main question I had for the group was this: "How do you test an Ant script"? Historically, this has not been a problem. You wrote a script for a specific project. You ran the script, and it either worked or it didn't. However, the Ant Script Library doesn't have it's own project - it is reused to build other projects. From my point of view, I really want to be able to set up an "integration test". The answer is pretty obvious: set up a real project that you can use to run the ant script against. After running the script, you should be able to assert that artifacts are created in the expected locations. Duh! (in hindsight, anyway)

One more good tip: [GitHub](http://github.com/) is a good place to set up an open source project. Another alternative might be [Google Code](http://code.google.com/). Currently, I'm running ASL from my own Subversion server. I'm thinking about moving to a location that can handle proper project infrastructure (version control, wiki, mailing lists, etc). Personally, I really like subversion, and I think it's a pretty nice way to integrate ASL with your own project using svn:externals (assuming you're using Subversion, too). Google Code uses Subversion, but GitHub uses another version control system I can't remember (oh, wait: Git). Food for thought; I'll think about that one for a bit.

For more details of the session, there is a [write up on the wiki](http://citconf.com/wiki/index.php?title=BetterAntBuilds).

**Update**: The Build Doctor was actually taking good notes (as opposed to my vague recollection from 2 days later), and has a lot more detail in his [own blog post](http://www.build-doctor.com/2009/09/20/better-apache-ant-builds) on the discussion.
