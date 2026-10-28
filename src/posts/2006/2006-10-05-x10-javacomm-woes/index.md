---
title: 'X10, JavaComm Woes'
date: 2006-10-05T12:00:50.000Z
permalink: /2006/10/05/x10-javacomm-woes/
categories:
  - continuous-integration
wordpressId: 130
---

It's like this, see: I've been longing for years to set set up some lava lamps to indicate the current build status (as described by [Alberto Savoia](http://www.developertesting.com/archives/month200404/20040401-eXtremeFeedbackForSoftwareDevelopment.html) and [Mike Clark](http://www.pragmaticautomation.com/cgi-bin/pragauto.cgi/Monitor/Devices/BubbleBubbleBuildsInTrouble.rdoc)). I'm an expert at [CruiseControl](http://cruisecontrol.sourceforge.net/), which supports an [X10 publisher](http://cruisecontrol.sourceforge.net/main/configxml.html#x10). All good so far.

Now, to use X10 from Java, there are two libraries you need:

- Jesse Peterson's pure Java implementation of the X10 protocol, which is available from [http://www.jpeterson.com/](http://www.jpeterson.com/).
- The Sun Communications API, available from [http://java.sun.com/products/javacomm/](http://java.sun.com/products/javacomm/).

First problem: Jesse Peterson's website appears to have disappeared from the net, and the domain is now parked.

Second problem: the Java Communications API download for Windows (which includes the crucial win32com.dll file) appears to have been completely removed from the Sun website.

Luckily, CruiseControl contains both x10.jar, comm.jar and win32com.dll in its own download bundle (although the setup instructions are still missing). Unfortunately, I couldn't finish setting up the equipment at this stage, as my work duties intruded, but a number of people looked very interested in the lava lamps that are sitting above my desk right now. I was hoping to have a successful implemenation report to brag about at [CITCON](http://www.citconf.com/), but you can't win 'em all.

The main worry is that the current implementation appears to be completely unsupported. If both the X10 library and the Java Communications API have been withdrawn, I may have to find a more supported method for integrating the lamps into the build process. It's very disappointing that the Java integration with standard ports is still lacking after all these years.
