---
title: 'Groovy, ViPlugin and Pizza'
date: 2009-02-11T00:25:49.000Z
permalink: /2009/02/11/groovy-viplugin-and-pizza/
categories:
  - general
wordpressId: 252
---

I was invited to the [youDevise](http://www.youdevise.com/) stately pleasure-dome on this night for what turned out to be  a fascinating event: a [coding dojo](http://codingdojo.org/cgi-bin/wiki.pl?WhatIsCodingDojo). I had never been to an event like this, so it turned out to be gentle introduction to a number of new concepts for me.

A coding dojo is an event where programmers use technique of deliberate practice to improve skills. The youDevise chaps have been running [dojo events](https://dev.youdevise.com/YDBlog/index.php?cat=20) for a while now, so I arrived (late) to join a group of people who know a lot more about what was happening. In this case, I wasn't too far behind the group, since pretty much everyone was at a similar skill level with the assigned task: write a new behaviour for a robotic tank using [Groovy](http://groovy.codehaus.org/). Most of the people present had not tried Groovy before, so we were all in the same boat there.

At the start, we were all in a room together. The presenter had already explained the goal, and developers were taking turns at using TDD to write a framework to complete the goal. Once the framework was in a fit state, we all split into pairs to work on individual coding goals. I teamed up with Andy. He looked very familiar to me, and after a brief discussion we decided that we had met 2 years previously at [CITCON 2006](/2006/10/12/citcon-london-2006-retrospective/) (probably). We spent about 20 minutes struggling to get the Groovy plugin for Eclipse to work, and then another 20-30 minutes implementing some functionality.

Some random impressions:

- Groovy is pretty cool. I've read a lot about Groovy over the years, but never really dug in. The code we worked on involved writing code in Groovy that was called from a Java framework. The Groovy code was also calling back into Java as well, which clearly demonstrated to us how easy it was to mix in Groovy code to the existing Java codebase.
- Groovy is almost too flexible. It became obvious as the evening went on that Groovy allows enormous variability in the code. There are a lot of different ways to write the same thing. Although Larry Wall imbued the TIMTOWTDI concept into perl, this extra flexibility costs more in developer understanding. I remember reading [Mike Spille's reviews](http://www.jroller.com/pyrasun/category/Groovy) on Groovy from over 4 years ago, where he raised concerns that the language is too ambiguous. It appears that those concerns are still present
- Two hours is not enough time to become conversant in a new language. Groovy has an enormous advantage in that it is very similar to Java. This means that we could start writing Groovy code without much problem, but I have the feeling the code we wrote wasn't very "Groovyish".
- Holy cow! There's a Vi Plugin for Eclipse! (thanks for the tip off, Andy)
- I really enjoy hanging about with what is obviously a pretty switched on bunch of people.

Anyway, a big thanks to everyone at youDevise for welcoming me in, and I really appreciate the Pizza.
