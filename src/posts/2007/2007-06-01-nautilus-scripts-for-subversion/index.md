---
title: Nautilus Scripts for Subversion
date: 2007-06-01T12:00:36.000Z
permalink: /2007/06/01/nautilus-scripts-for-subversion/
categories:
  - general
wordpressId: 150
---

I'm in the process of helping my wife start up a [new business venture](http://www.lillifoot.co.uk/) (more on that later). As a result, we are hiring people to help us. At this stage, there is a large amount of planning involved, and so I have set up a subversion repository where we can share and collaborate on documents.

We have hired Lisa to work for us part time on marketing. She has her own computer running Windows Vista. After getting her to install [TortoiseSVN](http://tortoisesvn.tigris.org/), and giving her a short training course, she was quickly up and running. As Lisa was already experienced in using the File Explorer in windows, she was easily able to grasp the extra functionality and purpose of TortoiseSVN. In this way, I think that TortoiseSVN excels at being an incredibly useful piece of software with a minimal UI that doesn't get in the way. Non-developers can easily use it.

We have also hired Jan as a new store manager. I provided her with a laptop running Ubuntu Feisty. With OpenOffice installed, it makes an excellent document writing tool, and virtually immune to the virus and malware problems that plague Windows. I believed it would be just as usable, until I hit a snag: I couldn't find an equivalent of TortoiseSVN for Linux. Although there are a large number of [Subversion clients](http://subversion.tigris.org/links.html#clients), most of them are aimed at developers. Non-developers are left to fend for themselves among the complex user interface options that they don't really care about or want to know.

Luckily, after a bit of extra digging, I found the [Nautilus Scripts for Subversion](http://marius.scurtescu.com/node/85), by Marius Scurtescu. From my (and Jan's!) point of view, they give almost the same level of usabilty for a non-developer user. They're even [available on Feisty](http://packages.ubuntu.com/feisty/devel/nautilus-script-collection-svn).

I also found them suprising easy to extend. I was able to add two new commands ("Lock" and "Unlock") in moments by modifying existing scripts. I was also able to fix a problem: stderr wasn't being redirected to the zenity input file in all cases. A simple fix was to add a few `&>` about to redirect io from svn correctly.

I have made my changes available: here are my [Updated Nautilus Scripts for Subversion](/nautilus-svn-scripts-0.9.2.joe.tar.gz). Marius, if you want to include these changes in your distribution, feel free to take them from here.
