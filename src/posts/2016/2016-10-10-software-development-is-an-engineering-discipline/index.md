---
title: Software Development is an Engineering Discipline
date: 2016-10-10T20:27:19.000Z
permalink: /2016/10/10/software-development-is-an-engineering-discipline/
categories:
  - general
wordpressId: 689
---

There is a view that [software development is a craft](https://8thlight.com/blog/doug-bradbury/2009/08/22/why-software-development-is-a-craft.html); that "[Software Craftsmanship](https://en.wikipedia.org/wiki/Software_craftsmanship)" is a better metaphor for software development than is engineering or science. I'm going to argue against this view: software development _**is**_ an engineering discipline, and relies strongly on scientific principles. Firstly, what is an engineering? Here's one definition of the engineering method:

> The Engineering Method is the use of heuristics to cause the best change in a poorly understood or uncertain situation within the available resources. - Billy Vaughn Koen

What heuristics? In general, they look something like this:

 

> ![engineering-method-steps\_v6b](/2016/10/10/software-development-is-an-engineering-discipline/images/engineering-method-steps_v6b.png)(from the article "[Comparing the Engineering Design Process and the Scientific Method](http://www.sciencebuddies.org/engineering-design-process/engineering-design-compare-scientific-method.shtml)")

The first thing to notice is the feedback loops here. The steps _brainstorm ⇒ develop ⇒ test_ corresponds to the TDD cycle in software development:

![tdd-simple.svg](/2016/10/10/software-development-is-an-engineering-discipline/images/tdd-simple-svg.png) _(from "[Growing Object-Oriented Software, Guided by Tests](http://www.growing-object-oriented-software.com/figures.html)")_

The difference between the engineering design process with physical products and TDD in software is mainly the speed of the feedback loop. A skilled developer can often go through the red-green-refactor loop in less than 5 minutes, as there is no physical materials to manipulate. When you then add in the steps _specify requirements ⇒ ... ⇒ meets requirements_ around the TDD cycle, you get the ATDD cycle:

![tdd-with-acceptance-tests](/2016/10/10/software-development-is-an-engineering-discipline/images/tdd-with-acceptance-tests1.png)

Depending upon the size of feature that the the acceptance test describes, this could take anywhere from an hour to a week, though high-performing teams learn that quicker feedback is critical to quality.

Zooming out, there is a larger feedback loop surrounding the ATDD loop: the lead time between new software capabilities being prioritised and the capability being used by an end user. The DevOps movement is built on the focus on the software and organisational structures required to get software into the hands of end users as quickly as possible.

The size of the feedback loop is probably the most critical part of successful engineering. Consider, for example, the first human powered flight across the English Channel. The [Kremer Prize](https://en.wikipedia.org/wiki/Kremer_prize) was established in 1959 to give some motivation to show that human powered flight was both possible, as able to go long distances.

The challenge was picked up by many peoples and teams, but there was very little progress until the problem was examined by Paul MacCready, who noted that the engineers were [trying to solve the wrong problem](http://www.azarask.in/blog/post/the-wrong-problem/).

> MacCready’s insight was that everyone working on solving human-powered flight would spend upwards of a year building an airplane on conjecture and theory without the grounding of empirical tests. Triumphantly, they’d complete their plane and wheel it out for a test flight. Minutes later, a years worth of work would smash into the ground.
> 
> ...
> 
> The problem was the process itself... He came up with a new problem that he set out to solve: how can you build a plane that could be rebuilt in hours not months. And he did. He built a plane with Mylar, aluminium tubing, and wire.

After two and a half years, MacCready team successfully flew the Gossamer Albatross II across the English Channel in just under 3 hours.

![Gossamer Albatross](/2016/10/10/software-development-is-an-engineering-discipline/images/752px-Gossamer_Albatross_II_in_flight.jpg)

_(Gossamer Albatross II in flight, from [Wikimedia Commons](https://en.wikipedia.org/wiki/File:Gossamer_Albatross_II_in_flight.jpg), public domain)_

Compare this feedback loop to a more traditional engineering discipline based upon something less malleable than software: [traffic engineering](https://en.wikipedia.org/wiki/Traffic_engineering_%28transportation%29). This is a branch of civil engineering that uses engineering techniques to achieve the safe and efficient movement of people and goods on roadways. In this case the engineering medium is road signs, lane markings, asphalt, road size and shape. In some cases, the traffic engineer will look to move roads through entire buildings. The behaviour of traffic can be very complex, with surprising effects from interventions (think of adding a lane to a busy road, causing induced demand, causing worse traffic delays). In all these examples, the feedback loop for understanding if the intervention was successful can range anywhere from days to years. In order to reduce the risk of untested changes, traffic engineers must use models of the road, and run the simulation in software.

In summary: software development that makes use of feedback loops to help understand and direct the problem solution is most definitely engineering.

One question is left to ask: where does Software Craftsmanship fit in the context of software engineering? My take is that Craftsmanship is the focus on the skills that are known to be effective, a body of knowledge on the techniques that are effective. Engineering without skills won't get you very far. Skills without engineering means that you can build the wrong thing very well. Both are required.

_(This post was prompted by a discussion between [Dave Farley](https://twitter.com/davefarley77) and myself when we were both at the book launch of [Infrastructure as Code](http://infrastructure-as-code.com/) by [Kief Morris](https://twitter.com/kief). A subsequent discussion with [Andy Parker](https://twitter.com/aparker42) helped refine the topic)_
