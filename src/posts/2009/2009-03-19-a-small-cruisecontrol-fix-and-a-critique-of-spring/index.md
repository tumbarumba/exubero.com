---
title: 'A Small CruiseControl Fix, and a Critique of Spring'
date: 2009-03-19T22:35:15.000Z
permalink: /2009/03/19/a-small-cruisecontrol-fix-and-a-critique-of-spring/
categories:
  - continuous-integration
  - open-source
wordpressId: 277
comments:
  - id: 27
    author: Hugh
    date: 2009-03-20T09:06:14.000Z
    content: why not fix the memory leak in the dashboard while you are at it
  - id: 28
    author: Joe
    url: 'http://www.exubero.com'
    date: 2009-03-20T20:29:51.000Z
    content: 'OK, I''ll bite.... what''s the issue you''re seeing?'
  - id: 29
    author: Joe
    url: 'http://www.exubero.com'
    date: 2009-03-20T20:59:08.000Z
    content: >-
      I'm guessing you're seeing issue <a
      href="http://jira.public.thoughtworks.org/browse/CC-831"
      rel="nofollow">CC-831</a>?
  - id: 31
    author: Jeffrey Fredrick
    url: 'http://the.ci-guys.com'
    date: 2009-03-23T14:12:19.000Z
    content: >-
      I think that deprecated comment is deprecated. It (like the dashboard) was
      written by the CruiseControl Enterprise team before they went their own
      way with Cruise.


      So the choice to deprecate the API or not is left to us, the CC community.
  - id: 32
    author: Joe
    url: 'http://www.exubero.com'
    date: 2009-03-23T20:40:55.000Z
    content: >-
      Hi Jeffrey, thanks for the tip. I'll get together a documentation patch
      for the bit about the widgets to remove the deprecation warning, and
      attach it to CC-899 (it will probably take a few days for me to get around
      to doing that)


      Probably more importantly, I think it would be great if there was some
      sort of hacking guide for the dashboard to help people get to grips with
      how to start modifying it. I'm not at the stage yet where I can start on
      that, but I'll keep it in mind as I learn more about the dashboard
---

I quite like the new [Dashboard](http://cruisecontrol.sourceforge.net/dashboard.html) that was added to CruiseControl last year. It has a certain style that makes it appealing to the end users who may be watching the build status, and is a step up from the old [reporting JSPs](http://cruisecontrol.sourceforge.net/reporting/jsp/index.html). Until today, I had never really looked into how it was implemented.

My problem today was that the Dashboard does not show raw build output by default (it will show plenty of reports and other bits and pieces from an Ant build). In my case, I'm calling an external build tool (not Ant) using the CC <exec> builder, but there is no way to actually see the output.

A quick look at the `dashboard-config.xml` file showed that there appeared to be a simple way to add another tab to the build display using classes from the Widget package. Looking in the CC source code, I spotted a class called `net.sourceforge.cruisecontrol.dashboard.widgets.AntOutputWidget`, which despite it's name, looked like it would display the build output for anything. I tried adding a reference to this class to the configuration. Sure enough, a new tab appeared. Unfortunately, it only ever displayed the text "No information for Ant Output". Doh!

Googling about, I was able to turn up a [message from Pete Doyle](http://www.nabble.com/First-attempt-at-fixing-Ant-Output-widget-\(2.7.2\)-p16692905.html) who had exactly the same problem. He had even submitted a patch to the CC mailing list, but it appeared to have been missed. I tried out his patch, and everything worked fine (after a few fine tweaks). While I was there, I created a new task in the CruiseControl issue tracker: [CC-899](http://jira.public.thoughtworks.org/browse/CC-899). Hopefully, this can get rolled into the next CC release. Score 1 for open source!

However, the story doesn't end there. Before I moved on, I just happened to glance at the [documentation for subtabs](http://cruisecontrol.sourceforge.net/dashboard.html#subtabs). There is a strong note warning that these widgets are deprecated:

> _Note that the dashboard widget API is deprecated and will be replaced in a future version of CruiseControl. We strongly recommend developers do not create widgets using this API, as it will not be supported in the future._

I found this curious: I didn't think the code for Widgets was that bad, what New and Improved implementation was replacing it? The answer was harder to work out than I expected.

The problem (as I see it) is that there is a relatively convoluted set of Spring configuration files joining bits and pieces together in hidden ways, and somehow using a heap of Velocity templates to generate the UI. My issue is that although the code appears to be quite solid and well factored, the configuration that wires it all together is quite opaque. Because it is Spring configuration (programming by XML), I lost the ability to easily navigate the code using the IDE. It was back to searching for snippets of text, and then looking up the referenced classes.

XML is not a good language in which to write programs. I don't mind Spring in small doses, but I've been burnt a number of times by very large and unwieldy Spring configurations that wire together lots of small pieces in such a way that it's very hard to get a view of the important features. Scoping, encapsulation, IDE integration: trodden over in a very haphazard way.

I'm all for dependency injection and inversion of control, but I definitely think that most of that can be done more efficiently in code. There are a few posts floating about on the same subject. Here are some of my favourites:

- Crazy Bob (inventor of Guice): [I Don't Get Spring](http://crazybob.org/2006/01/i-dont-get-spring.html)
- Floating point: [A Critique of Spring](http://floatingpoint.tinou.com/2007/03/a_critique_of_s.html).
