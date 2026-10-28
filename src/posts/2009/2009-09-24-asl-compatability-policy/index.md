---
title: ASL Compatability Policy
date: 2009-09-24T23:08:04.000Z
permalink: /2009/09/24/asl-compatability-policy/
categories:
  - build-automation
wordpressId: 388
---

An astute reader asked if the [Ant Script Library](/asl/) will be updated to make use of any of the new features that will be available in the upcoming Ant 1.8 release. New features include enhancements to boolean properties, the import element to support optional imports, and new features such as include and target group. Many of these features can help simplify complex build scripts, and could make a big difference to something like the ASL (indeed, [EasyAnt](http://www.easyant.org) has been a driver behind some of these features).  So when Ant 1.8 is released, will I make use of these new features?

Short answer: No

Slightly longer answer: Not yet.

Long answer: As a matter of policy, after Ant 1.8 is released, I will avoid making use of any 1.8 specific features for a relatively long period. I will definitely make sure that the ASL is fully compatible with Ant 1.8, but it will still be fully compatible with Ant 1.7.

This is because the ASL is intended to be used as an add-on library to an existing ant infrastructure. However, in my experience many companies and IDEs are quite conservative in upgrading their Ant installations. Probably in a year or two after Ant 1.8 is released, I might feel comfortable in adding dependencies on the latest features (probably keeping a 1.7 compatible branch of the ASL available for a longer time). By that time I expect that Ant 1.8 will have made inroads to corporate build installations and IDEs. However, I've worked in places where Ant 1.7 (now 3 years old!) is still under consideration. If history is anything to judge, there will be a long period before Ant 1.8 makes it into some development shops.

I would regard this as probably the major difference in philosophy between ASL and EasyAnt:

- EasyAnt is a _replacement_ for Ant. It extends the internals of Ant to add non-standard features (e.g. "phases"). It is invoked by calling a completely different front end script. It contains an embedded and modified version of Ant, which must be installed separately. This gives them the freedom to make full use of new features, but it means a full switchover is required.
- ASL is less ambitious (it's _just_ a library), but I think it makes it easier to accept in more conservative organisations that are happy with Ant, but are looking for a way to control build script complexity. For this reason, the ASL must be more conservative, too (though I might end up having two versions of the ASL, one for Ant 1.7 and another for Ant 1.8)
