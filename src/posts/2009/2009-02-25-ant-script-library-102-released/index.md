---
title: Ant Script Library 1.0.2 Released
date: 2009-02-25T21:53:43.000Z
permalink: /2009/02/25/ant-script-library-102-released/
categories:
  - build-automation
wordpressId: 261
---

I've just released a new version of the Ant Script Library (1.0.2). The scripts themselves have only had a few incremental changes, but there has been a large amount of updates to the documentation (though there's still a long way to go there, I'm afraid).

The major changes are:

- I've reworked the website to give it a distinct style from the rest of exubero.com, which is much more in line with its Ant focus. See [http://www.exubero.com/asl/](/asl/ "Ant Script Library") for the skinny on that.
- The documentation is now packaged along with the scripts, making them available offline
- I've excluded a large number of optional library jars from the default download. If you call any script target that requires an optional jar, you will be prompted to run the automatic download script. This makes the download much smaller for those people who don't use any of the reporting features.
- There is a new installer module (asl-java-install.xml). This can be used to install an application jar, along with all its library dependencies and configuration into an application assembly.

To get a copy, please visit the [download page](/asl/download.html).
