---
title: Upgrading the Lillifoot Website
date: 2009-03-09T22:37:13.000Z
permalink: /2009/03/09/upgrading-the-lillifoot-website/
categories:
  - web
wordpressId: 265
---

It is time to put some time into enhancing the Lillifoot website at [http://www.lillifoot.co.uk](http://www.lillifoot.co.uk) (in fact, it's well overdue). The current incarnation of the website was launched July 2008. Since that time, the website has served up 180,000 pages and 72GB of data. I'm quite proud of the way that the website has developed over the last year. In terms of search engine optimisation, I have managed to consistently get Lillifoot into the top 5 search results for "[childrens shoes](http://www.google.co.uk/search?q=childrens%20shoes)", along with a very long tail of other search keywords. Integration with [Google Checkout](http://checkout.google.com) has meant that Lillifoot has been able to increase on-line sales every month.

However, there are problems:

- There's no way to browse for a specific _style_, _category_ or _size_. Customers who search for a specific brand are pretty much OK, but people searching for other types (such as _trainers_, _boots_ or _sandals_) are out of luck.
- The shoe pictures are too small. Although you don't see it, there are actually two sizes of shoe photos: 275x206px (which is currently shown) and 640x480px (which are currently not displayed anywhere yet). I would like to support pages for individual stock records, showing the larger pictures and possibly more information
- There is only one payment method: Google Checkout. Customer feedback has shown that a proportion of customers will baulk at entering their credit card details into Google. I would like to be able to added support for Paypal and another payment type. The issue here is that I took a short cut with the basket: I'm currently using the [Google Checkout Shopping Cart](http://code.google.com/apis/checkout/developer/Google_Checkout_Shopping_Cart_Overview.html), as it was trivial to set up a shopping cart without setting up server side infrastructure on my own server. This means that to support an alternative payment method, I will have to integrate another third party shopping cart, or implement it myself.
- It can be confusing for people to decide what size shoes they need, especially with the different between UK, European and US sizes. I need to make this clearer, and provide extra charts and information to help customers decide on the size they need, and possibly provide some downloadable tools to help them with measurement.
- I'd like to refresh the look and feel of the site. There is generally a very positive response to the website in terms of usability and appearance, and so I don't want to make radical changes to the site. However, there are many tweaks that can be done to improve the usability.

There's a lot to cover there, and I won't get all this done overnight. It is interesting (for me at least) to get a clearer picture of the changes needed. I will probably be making updates over the next two or so months on this subject, in between updates to the [Ant Script Library](/asl) and other things that catch my eye.
