---
title: Practical Lightweight Architecture
date: 2014-04-01T03:51:58.000Z
permalink: /2014/04/01/practical-lightweight-architecture/
categories:
  - agile
  - architecture
wordpressId: 468
---

I recently read Simon Brown's post [Getting to a software architecture quickly](http://www.codingthearchitecture.com/2014/03/13/getting_to_a_software_architecture_quickly.html), which is itself a response to Victor Grgic's post ["Think big, act small" - what does it mean in architecture?](http://leanarch.eu/2014/03/05/think-big-act-small-what-does-it-mean-in-architecture/). I fully recommend Simon and Victor's approach; it's pretty much the same I've been using recently. This post is an expansion of the documents, conversations and activities that I use as a way of converging upon an architecture for a project.

As Simon says, the aim is:

> Just enough up front design to create firm foundations for the software product and its delivery

Starting from a blank slate can be hard, so I usually start with an architecture document with a set of headings to act as scaffolding for further elaboration. The headings I currently use are:

- **Overview**: a brief overview of the system, possibly setting the vision of what the system is trying to achieve and what the success criteria looks like.
- **Architectural Context**: a [context diagram](http://www.methodsandtools.com/archive/softwarearchitecturesketches.php), showing the very high level system view
- **Containers and Connections**: one or more [container diagrams](http://www.methodsandtools.com/archive/softwarearchitecturesketches.php), showing a bit more detail.
- **Straw-man Proposal**: a "just enough detail" description of what the system is and how it fits together. It is complementary to the containers and connections diagrams. The aim is not to fully specify the system, but rather give enough architectural guidance to steer the implementation team.
- **Open Questions**: a set of unresolved questions. Initially, this will be the biggest part of the document.
- **Design Decisions**: a record of design decisions that have been made. This is the record of thought processes that lead to the current implementation proposal. Most importantly, each design decision has a "rationale" and "concerns" sub-sections, to try and capture why something is the way it is. Often I will use sub-sections for "Design Decisions Made" (things we have decided to do first), and "Design Decisions Deferred" (questions we are consciously deciding to defer, in the spirit of [real options](http://www.infoq.com/articles/real-options-enhance-agility)).

This is a living document. It will never be complete, but it represents a single place where team members and stakeholders can come to get a view of the current thinking about what will be built, and collaboratively decide on the next steps. I prefer to use a format that can be edited collaboratively, such a wiki or a Google Docs document.

The "Overview" and "Architectural Context" sections will be filled out first, usually by a single developer/architect. Those sections tend to be the smallest and most stable parts of the document, and help set the scene for the following discussions. Any use cases or requirements can be investigated here. Possibly screen mock-ups can be invaluable in giving clarity to what would be a useful way of interacting with the proposed system.

Next, there will be a development team meeting to try and brainstorm various risks, issues and use cases. Focus will be on the initial features that need to be implemented first, along with all the architectural "ities" that must be addressed (e.g. scalability, security, maintainability, extensibility, simplicity, longevity, and so on), and perhaps even languages and tools. This meeting will raise a lot of questions (how do we... ?), which will be added to the "Open Questions" section, and possibly some decisions, which will be added to the "Design Decisions" section along with the rationale and possible concerns.

If there is a clear consensus on an appropriate way forward, one or two people will take responsibly to record this in the "Containers and Connections" section, along with detail in the "Straw-man Proposal".

From this point on, there is a rather iterative style of working through the open questions. For each question, there will usually be a design decision made or deferred, and an update to the diagrams an implementation proposal. There may be many more meetings to decide various issues, or a smaller group may work on this independently. Questions are added as new issues are discovered or someone has a new thought about areas of uncertainty (there's always more questions).

Eventually, there will be a point where the team believes that there is enough clarity on the architecture to begin work. This doesn't mean that all the questions will have been answered, but rather the main risks have been identified and hopefully addressed. At this stage the team might elect to begin work on the walking skeleton, as suggested by the [GOOS book](http://www.amazon.com/Growing-Object-Oriented-Software-Guided-Tests/dp/0321503627).
