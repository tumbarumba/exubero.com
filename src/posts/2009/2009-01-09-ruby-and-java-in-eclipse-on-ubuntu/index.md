---
title: Ruby and Java in Eclipse on Ubuntu
date: 2009-01-09T13:16:55.000Z
permalink: /2009/01/09/ruby-and-java-in-eclipse-on-ubuntu/
categories:
  - open-source
wordpressId: 187
---

I've been updating the development environment on my home computer. I'm running Ubuntu at home, and was expecting a pretty easy setup. I was rather surprised to find that the Eclipse environment packaged with Ubuntu 8.10 is actually pretty old (Eclipse 3.2). Given that Eclipse 3.4 has been out for quite a while now, I was expecting it to track the version updates a bit better. No matter - I was able to download the tar.gz for [Eclipse Ganymede](http://www.eclipse.org/ganymede/). After uncompressing the tar, I was able to run the eclipse executable directly, and the program Just Worked™. Very nice, but I would have hoped to have this version integrated with the Ubuntu packaging system.

The first thing I did was to install [Subclipse](subclipse.tigris.org), which is not yet part of the main distribution (I wonder when that will be added?).

Next: test out a Java project. I tried setting up CruiseControl by checking out the project directly from the [source repository](http://cruisecontrol.sourceforge.net/svn.html). The project check out OK, but there were a number of build issues I had to chase up. Given that I'm going to be doing a bit more work with CC, it's probably something for which I might be able to submit some fixes.

Finally, tried setting up a Ruby project. This was slightly harder than expected. I remember using the Ruby Development Tools (RDT) plugin a couple of years ago. However, when I visited the RDT website, it was pretty obvious that the project has become defunct, with no updates for quite a while. This is a broken link on the website pointing to a company called Aptana, who now provide a product called RadRails, which is a repackaged Eclipse set up for Ruby and Rails development. Given that I only had a number of smallish Ruby scripts to maintain, I didn't actually want to download an entirely new IDE, and a stand alone plugin for Ruby development didn't seem to be available.

I was finally able to find the thing I was looking for: it's the [Dynamic Languages Toolkit](http://www.eclipse.org/dltk/), which is actually already part of Eclipse Ganymede. All I had to do was from within Eclipse select the menu Help -> Software Updates... and select the "Available Software" tab. The option for Ruby development can be found in the tree by navigating via Ganymede -> Programming Languages -> Dynamic Languages Toolkit - Ruby Development Tools. Select the checkbox, click "Install..", and it's done.

<figure>

![Eclipse software updates dialog](/2009/01/09/ruby-and-java-in-eclipse-on-ubuntu/images/eclipse-install-ruby.png "eclipse-install-ruby")

<figcaption>Eclipse software updates dialog</figcaption>
</figure>

On my first attempt at debugging, I had the following problem:

```
Debugging Engine not started
The 'Fast Ruby Debugger (ruby-debug)' is selected, but the 'ruby-debug' gem doesn't seem to be installed in the selected Ruby Interpreter (/usr/bin/ruby)
```

Change the relevant option in the ruby dubugging configuration screen, and everything working fine.
