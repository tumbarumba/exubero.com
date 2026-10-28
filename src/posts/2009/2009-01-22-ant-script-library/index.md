---
title: Ant Script Library
date: 2009-01-22T02:58:04.000Z
permalink: /2009/01/22/ant-script-library/
categories:
  - build-automation
wordpressId: 222
comments:
  - id: 10
    author: Hugh
    url: 'http://www.hughreid.com'
    date: 2009-04-22T07:48:13.000Z
    content: |-
      Found this which might be useful as a comparison
      <a href="http://antiplate.origo.ethz.ch/" rel="nofollow">antiplate</a>
---

I always seem to re-implement the same Ant scripts where ever I go. To try an short-circuit this pointless bit of re-work, I've re-implemented the scripts (again) in my own time, and am packaging them up for generate release under the Apache license, allowing me to properly reuse these scripts. I've uploaded them here:

You use this by unzipping the contents to your workspace, and create your own build.xml file similar to the following:

`<project name="afp-renderer" default="dist"> <import file="../ant-script-library/asl-java.xml"/> </project>`

In the coming weeks I'll explain more about the design and usage of these scripts, but for the moment you can have a poke about. I'm interested if anyone has any feedback about these.

You can get hold of the scripts from the [download page](/asl/download.html).
