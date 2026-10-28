---
title: 'Atom, Ruby and ERB'
date: 2005-11-19T12:00:12.000Z
permalink: /2005/11/19/atom-ruby-and-erb/
categories:
  - general
wordpressId: 77
---

I've just finished overhauling the blog pages on Exubero, to make them more consistent with the other blogs about. The major new feature: there is now an [Atom feed](/blog/atom.xml) for those of you who prefer your readings to via an aggregated feed.

Just to give myself more work, I hand-rolled the entire thing myself without resorting to a blog management tool. I know that there are plenty that would have fit the bill perfectly for me, but this was mainly a learning exercise into the inner workings of feeds, and to keep honing my new-found Ruby skills.

As it turned out, this was a much simpler task than I had feared. I believe this is mainly because the [Atom](http://en.wikipedia.org/wiki/Atom_%28standard%29) specification was well thought out and simple to implement. Using [ERB](http://www.ruby-doc.org/stdlib/libdoc/erb/rdoc/classes/ERB.html) for templating and [Ruby](http://www.ruby-lang.org/en/), I was able to quickly split up my existing articles and stitch them back together, both as standard XHTML and as an Atom feed.
