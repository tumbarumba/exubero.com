---
title: Lillifoot Product Categories
date: 2009-05-05T00:33:40.000Z
permalink: /2009/05/05/lillifoot-product-categories/
categories:
  - web
wordpressId: 311
---

I posted a note on the 9th March about [upgrading the Lillifoot website](/2009/03/09/upgrading-the-lillifoot-website/). After spending parts of 4 weekends, and a few late nights during the week, I finally reached a stage where I felt confident enough to push the changes to the unsuspecting public. Have a look here: [http://www.lillifoot.co.uk](http://www.lillifoot.co.uk)

With a cursory glance, you might think that not much has changed. Probably the first thing to catch your eye would be the two new  "buttons" on the home page:

<figure>

![Gender Buttons](/2009/05/05/lillifoot-product-categories/images/gender-buttons.png "gender-buttons")

<figcaption>Gender Buttons</figcaption>
</figure>

These buttons can be used to drill down to a gender specific landing page. This was the primary use case I wanted to handle: help the customer _discover_ interesting content on the website. In many cases the customer may be thinking something along the lines of "I need to find new trainers for little Johnny". These buttons sit in a part of the screen that draws attention to them. I'm not completely happy with what is there now: they appear a bit sterile, and don't quite render properly on IE right now. Ideally, I would like to find some subtle image of a boy and a girl I could work into the button background.

Clicking on either the boys or the girls will navigate to the category selection page:

![Category Buttons](/2009/05/05/lillifoot-product-categories/images/category-buttons.png "Category Buttons")

Clicking through on any of those buttons will navigate to a top level category page. These same category pages can also be accessed via the expanded product navigation menu to the left:

![Category Navigation](/2009/05/05/lillifoot-product-categories/images/category-nav.png "Category Navigation")

The category landing pages are very similar to before, execept the layout has been compressed. Clicking on any individual show picture or title will open up a style-specific page, with a large picture.

The above describes the main changes. Overall, adding in the gender categories added another 20 pages, but adding the individual shoe pages added a significant number of new pages - there are now over 500 pages on the entire site.

It's been very interesting work for me. I've been getting my hands dirty with a lot of Ruby scripting and web design work, which is a diverting change from my day job (Java, Ant and CruiseControl at the moment). For me one of the most fascinating aspects of this change was how it would affect the web statistics.

Before I put this change live, I would have predicted that the bandwidth usage would have rocketed: there was a huge number of new pages, the all the new larger image sizes were now available. Strangely enough, this didn't seem to change at all. There was a slight increase in the pages per visit, and most encouraging was the drop in the bounce rate from about 45% to 30% (that is, two thirds of visitors browse to more than one page). I'll discuss some of the more interesting web statistics later.

All in all, I was pretty happy with the changes made, with the proviso that there is still a lot more tweaking to do, usability and otherwise.
