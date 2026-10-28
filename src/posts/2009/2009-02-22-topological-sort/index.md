---
title: Topological Sort
date: 2009-02-22T22:10:25.000Z
permalink: /2009/02/22/topological-sort/
categories:
  - general
wordpressId: 247
comments:
  - id: 17
    author: Hugh
    date: 2009-02-23T12:18:59.000Z
    content: reinventing make?
  - id: 18
    author: Joe
    url: 'http://www.exubero.com'
    date: 2009-02-23T21:55:20.000Z
    content: 'Yep :-)'
---

I've been tinkering with build systems lately, and the associated dependency graph between source artefacts. For anyone working on a system like this, you will eventually arrive at the algorithm for [Topological Sorting](http://en.wikipedia.org/wiki/Topological_sort). The Wikipedia page had a very good description of the algorithm, but I found [another description](http://www.brpreiss.com/books/opus4/html/page557.html "Topological Sort from Data Structures and Algorithms with Object-Oriented Design Patterns in C++") that appeared clearer to me:

> Repeat the following steps until the graph is empty:
> 
> 1. Select a vertex that has no incoming edges.
> 2. Add the vertex to the sort.
> 3. Delete the vertex and all the edges emanating from it from the graph.

I thought it was a pretty elegant algorithm, and now that I know what I'm looking for, it turns up in a fairly large number of places.
