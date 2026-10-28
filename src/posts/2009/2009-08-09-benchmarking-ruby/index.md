---
title: Benchmarking Ruby
date: 2009-08-09T14:42:55.000Z
permalink: /2009/08/09/benchmarking-ruby/
categories:
  - general
wordpressId: 340
---

This came out last week, but I didn't have time to comment on it. Anthonio Cangiano did some benchmarking tests of various flavours of Ruby. In this benchmarking run, he was comparing the speed of Ruby based upon the compiler used to build Ruby. Previously, Ruby had been compiled using Visual C++ 6.0 (a 10 year old compiler). There has been an effort from the RubyInstaller group to rebuild the Ruby interpreter using MinGW and GCC. The figures are astounding:

[http://antoniocangiano.com/2009/08/04/a-faster-ruby-on-windows-is-possible/](http://antoniocangiano.com/2009/08/04/a-faster-ruby-on-windows-is-possible/)

For the Ruby 1.8 interpreter, there is an average **283%** increase in speed. The improvements in compiler and library optimisation are incredible.
