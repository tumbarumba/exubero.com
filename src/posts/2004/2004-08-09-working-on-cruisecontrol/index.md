---
title: Working on CruiseControl
date: 2004-08-09T12:00:02.000Z
permalink: /2004/08/09/working-on-cruisecontrol/
categories:
  - continuous-integration
wordpressId: 30
---

Using [CruiseControl](http://cruisecontrol.sourceforge.net/) day in and day out for months on end gave me a lot of appreciation for the power of the tool, but I wasn't really satisfied with the standard of the documentation available.

In the spirit of open source development, I fixed it. The problems I saw (and fixed) were:

1. There was no navigation feedback: clicking on a link in the navigation list should provide some sort of highlight to indicate the current page in the web site. This is enormously useful in allowing a user to get a mental picture of the structure of the web site.
2. The navigation was inconsistent: clicking on "build loop" or "jsp" completely changes the order of the menu, which makes it confusing and can be hard to find the link back to where the user came from.
3. The navigation was not complete: there are a large number of pages that do not appear in the navigation list, which means that it is confusing and easy to get lost once you have left a top level page.
4. Some information on the site was (and still is) out of date.
5. The configxml page is a bit big, and doesn't give good indications on the xml elements to which it describes.
6. The HTML markup was non-semantic (for example, headings are not marked up as headings). This makes it harder for search engines and other automated tools to understand the structure of the documents.

My fixes were recently checked into version control, and are now visible on the CruiseControl home page. I'm planning to continue making enhancements to the CruiseControl documentation, which can be previewed within the exubero domain.
