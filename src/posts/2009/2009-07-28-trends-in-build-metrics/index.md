---
title: Trends in Build Metrics
date: 2009-07-28T22:43:15.000Z
permalink: /2009/07/28/trends-in-build-metrics/
categories:
  - build-automation
wordpressId: 231
comments:
  - id: 22
    author: Jeffrey Fredrick
    url: 'http://www.anthillpro.com/blogs/'
    date: 2009-08-05T01:44:54.000Z
    content: >-
      Hi Joe!


      You make a really good point on the importance of trends over time. I got
      used to taking that for granted while I was Agitar with our Dashboard, and
      now that I'm at Urbancode trending is built into AnthillPro as well. But
      there's something about build tools that seems oriented to points in time
      rather than trends. No idea why...
  - id: 23
    author: Joe
    url: 'http://www.exubero.com'
    date: 2009-08-05T08:28:03.000Z
    content: >-
      I remember the Bamboo presentation at CITCON London 2006: it really opened
      my eyes to the power of trend information. I haven't yet seen what
      AnthillPro can do, but I image it must be pretty neat.


      To me, it makes sense that CI products are well placed to present trends
      in a coherent manner, because they are in charge of the invoking build
      after each change. They inherently know the time based aspects of the
      code.


      However, I don't regard trending as a CI only exercise: I believe it
      should be part of a good automated build to give access to this. One day
      I'll get it into ASL (perhaps!)
  - id: 25
    author: NIck Pellow
    url: 'http://clover.atlassian.com'
    date: 2009-09-04T03:50:06.000Z
    content: >-
      Hi Joe, 


      The upcoming release of Clover 2.6.0 may be interest to you. It includes
      an API to allow Clover to be integrated into any Ant build - the javadocs
      are already online here: http://docs.atlassian.com/atlassian-clover/


      Alternatively, you can integrate Clover into an Ant build with about 3
      lines of Ant XML:
      http://confluence.atlassian.com/display/CLOVER/Clover-for-Ant+Two+Line+Integration

      This will also generate clover history points, and historical reports to
      allow trend-reporting - something very valuable when viewing Code Coverage
      data.


      If you would like any help getting Clover integrated with the ASL, please
      let me know!


      Cheers,

      Nick Pellow 

      Atlassian - Clover
  - id: 26
    parent: 25
    author: Joe
    url: 'http://www.exubero.com'
    date: 2009-09-05T23:19:02.000Z
    content: >-
      Hi Nick, I'm quite impressed! Clover has certainly advanced a lot since I
      last looked. I hadn't realised Clovers' trend reporting had improved so
      much.


      I've previously only been looking at adding non-commercial modules to ASL,
      because it makes it very easy for me to distribute an "all-in-one"
      download. However, it certainly wouldn't be too hard to add a module to
      integrate Clover, with instructions on how to configure it. 


      I might get in contact later to discuss how to add it in to ASL. It will
      probably be much later, though, as I have some deadlines over the next few
      weeks and months (not to mention CITCON!)
---

I've been upgrading the [Ant Script Library](/asl/) with a number of new code inspection reports, including [FindBugs](http://findbugs.sourceforge.net), [Checkstyle](http://checkstyle.sourceforge.net/) and [PMD Copy Paste Detection](http://pmd.sourceforge.net/cpd.html); this is on top of the existing [PMD Analysis](http://pmd.sourceforge.net), [Cobertura](http://cobertura.sourceforge.net) and [JDepend](http://www.clarkware.com/software/JDepend.html) reports. (Note that these updates have not yet been released). I was thinking about adding in [Panopticode](http://www.panopticode.org/), too. I love the heatmap display, but I noticed that the project appears to be abandoned at the moment, without any updates for over 2 years. Perhaps I still will later on.

All the above reports give a great way to view the state of the code at a given time. One thing missing from those is trends over time. Trend information can help give you an idea of how a system is improving (or getting worse!) over time, and so enable better architectural oversight. For that reason, I started looking around for tools to help me there. I found three that I liked:

- [Sonar](http://sonar.codehaus.org/) appears to be the most advanced at the moment, at it has some great reports (check out the publicly available Sonar reports on [Nemo](http://nemo.sonarsource.org/)). I have one problem, though: Sonar requires Maven to run. I'm loath to add a complete competing build system to the ASL.
- [QALab](http://qalab.sourceforge.net/) looks interesting, but it also looks to be an abandoned project, with no update for over three years.
- [XRadar](http://xradar.sourceforge.net/) appears to be the best bet at the moment, a new version was released a few weeks ago. It looks quite comprehensive.

Does anyone else have any recommondations for tools?
