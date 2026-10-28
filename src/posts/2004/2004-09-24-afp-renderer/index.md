---
title: AFP Renderer
date: 2004-09-24T12:00:01.000Z
permalink: /2004/09/24/afp-renderer/
categories:
  - open-source
wordpressId: 35
---

As part of a project that we're working on together, my friend Pete Townsend developed some library code to generate prints for insurance policy applicants. Input data comes from an XML document, and is converted to an AFP print stream (AFP is a MO:DCA print format used on mainframes). Leveraging available open source tools, Pete created a plugin output renderer for [Apache FOP](http://xml.apache.org/fop/).

There's nothing unusual about this type work, any developer working for a large corporation will do similar tasks. The amazing thing is that Pete managed to convince our management that donating this project back to the Apache Foundation would be a good idea. The result of this is the [AFP Renderer](http://sourceforge.net/projects/afp-renderer/) project on SourceForge. In a fit of madness, I told Pete I could help out with creating the [AFP Renderer Homepage](http://afp-renderer.sourceforge.net/).

The ultimate aim is to get the AFP Renderer source code integrated directly into the Apache FOP codebase. In the meantime, SourceForge has (yet another) project.
