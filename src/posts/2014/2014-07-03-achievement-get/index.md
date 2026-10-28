---
title: Achievement Get!
date: 2014-07-03T23:37:12.000Z
permalink: /2014/07/03/achievement-get/
categories:
  - mobile
wordpressId: 499
---

I've just manage to build and install my first Android app on my new Nexus 5! It wasn't as hard as I thought.

Back story: my favourite Android game for a long time was a very simple spider solitaire game by Ken Magic. It's fairly popular on the [Play store](https://play.google.com/store/apps/details?id=com.kmagic.solitaire&hl=en), but it has a major problem: the only way to deal more cards is to press the hardware search button or trackball. Many modern phone don't have either of those buttons, which meant that the game was unplayable.

Fortunately, the code is open source (available from [solitaire-for-android](http://code.google.com/p/solitaire-for-android/)). I snagged a copy (now up on [github](https://github.com/tumbarumba/solitaire)), and made a few tweaks:

- removed the 'Quit' menu (which I never used)
- replaced it with a new 'Deal' menu

Done!

Actually, not quite. I had to mess around a bit to build the apk, and then transfer it to the phone, but on the whole, not too painful!

I think I might keep on tweaking the game a bit. I've been meaning to play around with mobile development, and this it a fairly easy introduction. However, the code is a bit of a mess, and completely without tests. Perhaps a bit of clean up first.
