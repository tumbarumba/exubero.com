---
title: Communication Trumps Checklists
date: 2009-07-29T22:16:44.000Z
permalink: /2009/07/29/communication-trumps-checklists/
categories:
  - general
wordpressId: 335
comments:
  - id: 34
    author: Julian Simpson
    url: 'http://www.build-doctor.com'
    date: 2009-07-30T13:41:32.000Z
    content: >-
      Hi Joe,


      Last year I was told that I was now the 'gatekeeper of quality' at the IT
      shop I was working in.  Let's ignore the fact that you can't inspect in
      quality.  I wrote a checklist and clung to it.  The checklist was for all
      the things that broke our deployments: sql files with the wrong encodings,
      with commands for the wrong version of the RDBMS, etc.  


      It was murder.  But it did expose just how many releases weren't ready for
      prime time.  I got some automated tests going with CI so that developers
      got the feedback.  Some things (like hopelessly inadequate deployment
      instructions) can't really be checklisted, though.


      It was a useful tool to help screen existing, broken work.  As a way of
      life?  Not on your nellie.
  - id: 35
    author: Bernie
    date: 2009-07-31T09:42:00.000Z
    content: >-
      The same problem in another situation is getting people at the pub to wash
      their hands after going to the toilet. ;-)


      The culture of the developers needs to change. The process should be left
      as simple as possible.
  - id: 36
    author: Jeffrey Fredrick
    url: 'http://www.anthillpro.com/blogs/'
    date: 2009-08-05T01:48:01.000Z
    content: >-
      PJ and I came to realization that development organizations with low
      quality reduce risk by slowing the pace of change. Fewer committed changes
      means fewer new defects! And a 41 point checklist is a great way to get
      there...


      That said, I'm actually in favor of checks, they should just be automated
      either in the build or by the build system.
  - id: 37
    author: Joe
    url: 'http://www.exubero.com'
    date: 2009-08-05T08:03:53.000Z
    content: >-
      In the last month I've actually just enabled a large amount of automated
      checks at my current client, and will be bringing some more online soon.
      The group management here really like these reports, as it gives them a
      better handle on the quality of their codebase.


      In the case of the 41 point checklist I mentioned, the idea was pushed as
      a way to "improve quality". I don't believe it was an attempt to slow down
      development, but rather a reaction to the perceived quality problems
      highlighted by the reports. "We must do something to improve quality. A
      checklist is something. Therefore be must use a checklist".
---

The [Java Posse](http://www.javaposse.com/) recently posted a podcast titled "[Effective Communication](http://www.javaposse.com/index.php?post_id=508594)" (it was a recording of a session of their "RoundUp" un-conference). I found it a fascinating discussion, all the more because it echoed many of the problems I'm experiencing right now.

Primarily, how do you get a group of developers to work effectively together? Communication is the key, and the way it happens can have a dramatic effect on the success of a project. To my mind, agile techniques such as [pair programming](http://en.wikipedia.org/wiki/Pair_programming), [daily stand-ups](http://en.wikipedia.org/wiki/Stand-up_meeting) and [information radiators](http://alistair.cockburn.us/Information+radiator) provide the best possible way to ensure knowledge and team culture is shared among all the members of the team. The podcast episode touched upon that, but they also spent a lot of time on various code review techniques and tools, which is another way to share knowledge (if done well). The show notes contain a lot of links to code review tools ([Crucible](http://www.atlassian.com/software/crucible/) being a crowd favourite - I must investigate).

The net effect of all these techniques is that communication is improved. The team can't but help develop a shared understanding of coding standards, patterns, techniques, architecture, and so on. The team learns better how to work together. Risks of all sorts are harder to stay hidden because people are talking.

On the opposite end of the spectrum, I was recently asked to help develop a set of templates and checklists to help "improve quality". I don't hold much stock in code templates (especially in Java). Checklists can be very useful during design and review sessions, but the actual request was "Can we force the developer to answer this 41 question checklist every time they commit a change?". My manager and I tried to explain the sheer amount of pain this would cause developers, without really improving quality. If there are problems with the development process, adding more beaurocracy to the process will rarely help. Improving communications channels always will.
