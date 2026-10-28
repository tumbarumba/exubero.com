---
title: Why I Prefer Ant Over Maven
date: 2007-03-13T12:00:07.000Z
permalink: /2007/03/13/why-i-prefer-ant-over-maven/
categories:
  - build-automation
wordpressId: 139
---

[Ant](http://ant.apache.org/) is a fairly mature software build system. I use Ant in pretty much all of my Java projects. [Maven](http://maven.apache.org/) is a newer alternative to Ant that has been gaining mindshare over recent years. As such, a collegue recently asked me why don't we use Maven instead of Ant? On the surface, Maven appears to be a good choice. It automatically handles many scenarios that must be manually handled in Ant. However, there are a number of points that make me quite hesitant to adopt Maven...

Before I go on, I will say that Maven is OK. In my opinion, build automation is of prime importance. A Maven build can be Complete, Repeatable, Informative, Schedulable, and Portable (the _CRISP_ properties of a build that Mike Clark defines). Given a choice between no automated build, and a Maven build, there is only one sensible choice.

However, Ant is still my build system of choice, for the following reasons:

- Maven is harder to extend. Although it can handle probably 90% of projects directly. For the other 10%, it can be very difficult to adapt Maven. Although Maven does have a plugin framework, it is less mature than the Ant task API. (Note the strategic use of invented statistics in this paragraph).
- Maven uses a declarative style. Many people like the declarative style. On the other hand, Ant uses a more procedural style. Personally, I'm more comfortably with the Ant style, as I can explicitly verify every single step that an Ant build will perform. I can't say that for a Maven build. Its more of a "black box".
- I believe that the Ant development team has a much more robust and mature development methodology. I monitor both the Ant and Maven dev mailing lists. I'm much more impressed with the Ant group with their attention to detail (for example, backwards compatibility issues, updating documentation, release milestones). I will readily agree that Maven 2 is a huge improvement over Maven 1, but there are still a number of issues that make me wary:
    - Maven developers don't have cohesive release procedures. For example, Maven 2.0.5 was released a month ago, yet the Maven Antlib is still stuck at version 2.0.4. I can't determine when they're planning to release Maven Antlib 2.0.5.
    - The Maven website lacks cohesion, which makes it hard to find information (for example, try and find the documentation for the Maven Antlib from [http://maven.apache.org/](http://maven.apache.org/)). There seem to be multiple links which lead back to exactly the same page, which is a well known mistake in navigation schemes. On the other hand, the Ant website has a terrible design, but at least I can find information on it.
    - As of this moment (12th March 2007 14:44 GMT) the maven download page at [http://maven.apache.org/download.html](http://maven.apache.org/download.html) is broken. Although I'm sure it will be fixed soon, these sort of mistakes seem to happen fairly often.
- Ant is ubiquitous in the Java development space. Every single Jave IDE integrates natively with Ant. The same cannot be said for Maven. Although there are a number of Maven plugins, none of them have the maturity or the features available in the Ant plugin ecosystem. For example, you can execute and debug Ant scripts in Eclipse (even setting breakpoints!). Another of my favourites: the [yWorks Ant Explorer](http://www.yworks.com/en/products_antexplorer_about.htm) is just one example of the many third-party tools available.

Anyway, on a more positive note, I think that the maven repository is _very_ well done. Being able to transparently retrieve dependencies without any further intervention is a very powerful technique. I love the fact that I can make use of the repository having to completely switch to Maven through the use of the Maven Antlib. The Ant development team even abandoned their own repository tasks they were preparing for version 1.7 because they thought that the Maven repository did everything that they needed.
