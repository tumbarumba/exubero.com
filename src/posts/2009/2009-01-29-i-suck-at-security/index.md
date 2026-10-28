---
title: I Suck at Security
date: 2009-01-29T21:49:57.000Z
permalink: /2009/01/29/i-suck-at-security/
categories:
  - general
wordpressId: 228
comments:
  - id: 11
    author: Hugh
    url: 'http://insecure.org/'
    date: 2009-02-09T22:54:47.000Z
    content: >-
      Laying yourself wide open Joe - you might as well have just put a sign up
      saying hack me here. Giving the IP address means that a better hacker can
      get into the machine that targeted you (as it is unlikely to be the
      hackers actual location) check its logs, find you and do the job properly
      as you have generously told them what software you are running.
  - id: 12
    parent: 11
    author: Joe
    url: 'http://www.exubero.com'
    date: 2009-02-10T08:58:45.000Z
    content: >-
      Hi Hugh. Good point, well made! Strangely enough, when I wrote this I
      actually tried to re-read it through my "Hugh Filter" (i.e. what would
      Hugh think of this?). I obviously need to upgrade my filter :-)


      I've already disabled remote access to the computer in question, and I'm
      fairly certain there are no bugs left behind. I had a suspicion, based
      upon what the intruders did, that it was probably some kids fooling
      around, but I obviously don't really know. (No, I didn't run nmap on the
      ip address). I have removed the remote details from the post, though.
      Thanks for checking!
---

One of the staff at [Lillifoot](http://www.lillifoot.co.uk) gave me a call yesterday - the iMac was doing strange things, and browsing websites all by itself. Was I remotely controlling it? No, but I immediately knew what had happened. Last month I had set up the [Vine VNC Server](http://www.testplant.com/products/vine_server/) to test out remote support. As an experiment, I had started up the server, and tried to connect a VNC viewer via a ssh tunnel. There was some problem (I can't remember what), so I _temporarily_ disabled the security. And then completely forgot about it. Until the phone call yesterday. Anyway, I now know the answer to "How long does it take for someone to find an unprotected VNC server?" (about 6-7 weeks)

Luckily, the curious visitor was only able to connect through a locked down user account, and the staff member was watching when it happened. The logs show no other activity has taken place (though I still did a full scan of the system).
