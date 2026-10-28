---
title: 'Singletons are Evil 2: the Rant'
date: 2009-10-02T10:44:09.000Z
permalink: /2009/10/02/singletons-are-evil-2-the-rant/
categories:
  - general
wordpressId: 397
comments:
  - id: 46
    author: Paul
    date: 2009-12-04T21:49:57.000Z
    content: >-
      I wish I'd read this (and the links in your previous post) the day before
      yesterday. I had an interview yesterday where three of the four
      interviewers asked me about Singleton. I explained what it were but
      mentioned that I barely, if at all, use Singletons - in fact I couldn't
      remember the last time I'd coded one myself.


      But I struggled in explaining why I don't use the pattern. I used
      Singletons a lot when I started coding but over time developed an
      aversion, and seemed to always find ways to do what I wanted to do without
      a Singleton (multithreading and subclassing were a couple of problems I
      mentioned) - and I don't find it aesthetically pleasing, although I didn't
      say that.


      This has clarified what I knew instinctually and I now have a nice spiel
      showing its problems.
---

I've wrote about this [before](/2006/04/04/singletons-are-evil/), but singletons really are evil. It's worth repeating, as I'm finding out that the message hasn't really reached a lot of people yet.

I've been helping out with interviewing candidates for a senior developer/technical lead/technical architect role at my current client. To my dismay, there is a very consistent problem across all the canditates I've met: they all like the Singleton pattern. The converstation usually runs along these lines:

**Me**: Can you name any design patterns?

**Candiate**: Singleton _(they will usually name a few more patterns, but Singleton is almost always the first one named)_

**Me**: Can you tell me about the pros and cons of Singleton?

**Candidate**: They're really useful, I use them all the time! They ensure that you only have a single instance of an object at any one time. Also, you don't need to pass references to them, because they can be accessed directly.

**Me**: OK, are there any problems with the use of singletons?

**Candidate**: Umm... you can sometimes get multiple instances if you use multiple JVMs.

I'm starting to use this as a weeder question in interviews now. I don't care if your resume says you have 8 years of experience in enterprise Java. If you've got that much experience, I'm hoping you've heard (or discovered yourself) that Singleton make code brittle and harder to maintain. I don't mind if you use Singletons on rare occasions (I do it myself sometimes), but you really need to be fully aware of the problems that they cause.

You can view my [previous post](/2006/04/04/singletons-are-evil/) for a list of links with more details, but in summary, some of the problems are:

- You lose control over memory management. It's basically a resource leak.
- It promotes tight coupling. Need an implementation? Go to the singleton over there! However, by hard coding the singleton class, it makes it harder to mock, stub out or otherwise change.
- It hides dependencies. It is harder to spot from the public methods of a class that it makes use of a singleton service.
- By mixing the responsiblities of providing a service, and managing the object lifetime (badly), a singleton violates the Single Responsibility Principle. If you only want a single instance of a class, create one at the start of the program and pass it objects that need it. If you use something like Spring, you can even declare in configuration that an object is a singleton. No need to hard code that policy in code!
- A Singleton in a multithreaded environment can be tricky. Make sure that you handle all the edge cases!
- As Stevie says, the Singleton "pattern" encourages you to forget everything you know about OO design, since OO is hard, and procedural is easy.

There are more problems, but that's a good start.
