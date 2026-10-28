---
title: A Continuous Integration Tool is not a Build Platform
date: 2009-01-12T23:57:31.000Z
permalink: /2009/01/12/a-continuous-integration-tool-is-not-a-build-platform/
categories:
  - build-automation
  - continuous-integration
wordpressId: 197
comments:
  - id: 3
    author: Jeffrey Fredrick
    url: 'http://the.ci-guys.com'
    date: 2009-01-21T06:56:37.000Z
    content: >-
      Hi Joe!


      Sounds like in this case maybe you could have a plugin that set properties
      based on the modifications and then your build script logic could do the
      right thing based on those properties?


      Jtf
  - id: 4
    author: Joe
    url: 'http://www.exubero.com'
    date: 2009-01-21T08:47:09.000Z
    content: >-
      Quite right, sir! In this particular case, the build requires the list of
      modified files, which can be obtained from perforce. There is a relatively
      flat file structure, and so we only really want to build the files that
      have been modifed (and files that are dependant upon those). The CC 
      plugin had that information, which is why it is easy to see why it could
      be the first place to look. However, I think it is reasonable to obtain
      the same information from either the perforce tasks in Ant, or use the
      p4.jar from Perforce.


      Cheers,

      Joe
---

I was studying the code for a CruiseControl build schedule plugin today. Something was bothering me, and it finally occurred to me that the plugin was trying to do the wrong job: it was doing the entire job of running the build logic directly.

A quick refresher: CruiseControl first checks for any modifications. If it finds any, it will trigger a build as specified in the <schedule> element. Usually, this will be some sort of external build like Ant, Maven, or perhaps some other external build tool. The common theme here is that the build is an independent task, it can and often is invoked independently of CruiseControl.

However, in this instance, the build logic was coded directly within the CruiseControl builder plugin. There are many problems with this setup:

- The build logic is based upon a set of modifications, and depends upon the internal CruiseControl modification class. This does not allow for any way to trigger a build except by checking in a change
- The build logic now depends upon the continuous integration tool. This is an adverse cyclical dependency
- Even worse, the build logic now depends upon a specific continuous integration tool. This reduces our scope to change to alternative CI tools later.

As of now, I'm looking at the feasibility of migrating the build code out of the CC plugins, and into a number of Ant plugins. I have a feeling that this will simplify the internal logic, make the code easier to test, and make it more usable to boot!

Whenever I'm looking at the build processes for a legacy code base, the steps are always the same:

1. Automate the build
2. Trigger the build to run automatically

In all cases, there should always be an automated build before you even consider looking at a continuous integration tool.
