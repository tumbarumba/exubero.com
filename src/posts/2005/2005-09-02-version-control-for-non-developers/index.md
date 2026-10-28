---
title: Version Control for Non-Developers
date: 2005-09-02T12:00:05.000Z
permalink: /2005/09/02/version-control-for-non-developers/
categories:
  - general
wordpressId: 72
---

There have been a number of occasions in the last few weeks where I've been explaining to non-developers the benefit of using a version control system. Unfortunately, many of them don't understand what a version control system does, or how they can be useful.

I think that the time is ripe for version control systems to become more widespread outside of traditional development areas. The main enabler for this transition is the availability of **free**, **robust** and **simple to use** version control software. My favourite (by a long margin) is [Subversion](http://subversion.tigris.org/).

Subversion wins hands-down on the **free** and **robust** facets, but fails miserably on **simple to use**. Most end users will balk at using the command line client svn. Actually, as a developer I tend to prefer the command line interface for many use cases, but I fall within a narrow minority of the general population.

Where Subversion fails, [TortoiseSVN](http://tortoisesvn.tigris.org/) does a fantastic job of providing a user friendly face to Subversion. Thanks to the well thought out layered design of Subversion, TortoiseSVN is able to seamlessly leverage the client library to provide a minimal and elegant UI within Windows Explorer.

What should be under version control? (you ask). I'd argue that pretty much everything should be committed. Any company deals in a large number of files and documents that form the basis of employees work. Word documents, spreadsheets, images, Visio diagrams, text files, emails are all relevent. Martin Fowler has written about the same subject in his note about [More Version Control](http://www.martinfowler.com/bliki/MoreVersionControl.html), and I have to agree with him.

I've had experience in a large company where large numbers of requirements, architecture and design documents were "version controlled" by copying and renaming the said documents periodically. This lead to a huge number of documents lying about the directory structure, all with slightly different names indicating their status (such as "archived/UseCaseXXX-0.1.doc", "baselined/UseCaseXXX-1.0.doc", "drafts/UseCaseXXX-1.1.doc", etc). This whole scheme could have been simplified enormously if they had used a real version control system, and using tags to signify various status.

Recently, I've started work for a client developing a simple website. As usual, I immediatly started checking in my work into Subversion. Sections of the website will contain content provided by the client. Rather than asking the client to send me the content via email so that I can check it in for them, I think that it's well within reason to show the client how to check their work directly into the repository using TortoiseSVN.

In the next few days, I might get around to writing a short tutorial for non-technical users describing how work with TortoiseSVN (I didn't have luck finding an existing tutorial).
