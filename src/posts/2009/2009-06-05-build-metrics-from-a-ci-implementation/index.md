---
title: Build Metrics from a CI Implementation
date: 2009-06-05T00:00:01.000Z
permalink: /2009/06/05/build-metrics-from-a-ci-implementation/
categories:
  - continuous-integration
wordpressId: 325
---

One of my favourite features of CruiseControl is the build metrics tab in the old reporting application. One of the graphs marks when builds occur, with date on the horizontal axis, and time on the vertical axis. This means that sequential builds through the day form a dotted line at a slant. "Good" builds are blue, and "Bad" builds are red.

![CruiseControl Build Metrics](/2009/06/05/build-metrics-from-a-ci-implementation/images/cc-metrics-mainline.png "CruiseControl Build Metrics")

More than anything else, this graph tells a story. Here, a relatively large team of developers, spread across 2 time zones are coming to grips with this new fangled "continuous integration" malarkey, over a period of 7 weeks after the new build system was switched on at the end of April.

- Initially, the builds are sporadic; the developers are unsure of the new tools (which includes a completely unfamiliar SCM tool and CruiseControl), as well as the CI commit rules ("don't break the build!").
- For the first week, there are only a handful of commits, about a third of them break. People feel a little overwhelmed by the changes; many of the developers are unhappy with the new system, there is a general muttering in the corridors.
- In the second week, developers gain more confidence, and by Wednesday, the number of commits starts to rise drastically.
- In the third week, the shit hits the fan as everyone jumps into the fray and starts to commit their changes as fast as they can. This week sees the first bouts of long term breakages, and developers check in broken code, and don't know how to fix it. The muttering in the corridors gets louder, and people start complaining over the harsh strictures involved ("We didn't have to worry about this before!")
- The fourth week shows a slight improvement, though there are still a number of 3 hour breakages.
- By the fifth week, things appear to be running much smoother. Breakages are still occurring, but the developers have learned to watch out for them, and have become a bit more careful about verifying their code before they check it in. The week also marks the end of a major code release cycle.
- In weeks 6 and 7 the builds are going along much more smoothly, and the team has developed a good rhythm: code, test (sometimes), check in, and watch for problems. Bugs are fixed very quickly indeed. The grumbling in the corridors has mostly stopped, as everyone gets more familiar with what is expected. The release team had an easier job, as well this time. There was much less compilation problems as they tried to build a release.

From my perspective, it's a fascinating process to watch, as a team comes to grips with a new process. I suspect the team is still pining for old "easier" ways, but there are now a number of developers and release engineers who have grown to appreciate the advantages.
