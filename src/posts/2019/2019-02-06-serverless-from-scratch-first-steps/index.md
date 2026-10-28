---
title: 'Serverless from Scratch: First Steps'
date: 2019-02-06T17:14:42.000Z
permalink: /2019/02/06/serverless-from-scratch-first-steps/
categories:
  - serverless
wordpressId: 5086
---

For a while now, I've wanted to learn more about [Serverless computing](https://en.wikipedia.org/wiki/Serverless_computing). After following [@swardley](https://twitter.com/swardley) and [@PaulDJohnston](https://twitter.com/PaulDJohnston) for a number of years, I feel there's a lot there for me to pick up on - or at least to be able to hold a conversation at a cocktail party. At the moment I know practically zero about how to implement a serverless solution, so I thought I'd write a series of blog posts about my experiences in picking up a new technology. I'm calling this "Serverless from Scratch", and this is the first post in that series. I'd like to cover all the issues I come across - what technologies to use, how to set things up, what the architecture looks like, and anything else that happens. I'm going to make a lot of mistakes. Hopefully I'll be able to fix those up as I go on.

To give myself some structure, I wanted to build something concrete. Luckily, I have a specific project in mind: a simple calendar and reservation system for a [car detailing](https://en.wikipedia.org/wiki/Auto_detailing) business. Customers should be able to view available time slots, and book in an appointment. The owner should be able to control what times can be booked, what times are reserved, and modify individual bookings. Why that thing in particular? Simple: now that I've moved to Canberra, I live quite close to my brother (Vince Schmetzer). Vince owns a car detailing business. I figure I can help with the promotion of his business (he doesn't yet have a website), provide some useful features for Vince and his customers, learn some new skills, and share what I've learned while I'm at it.

At this point in time, I image the steps involved in this project to look something like this:

- Set up a static website. This will initially display contact information, information about services offered, and company information. Essentially, an online brochure.
- Display details of available time slots. I will need to extract this information from Vince's existing calendar (which is currently stored on Apple's iCloud, and accessed from his iPhone).
- Allow customers to reserve a time in the calendar for Vince to perform his magic
- Allow Vince to accept or reject bookings.

There's a whole lot of complexity hidden in the above steps. I'm not sure at this stage exactly how I'm going to implement it all, but it will be fun to puzzle through the steps.

I'll add more links below here as I write more posts on this topic:

- [Serverless from Scratch: The Static Website](/2019/02/13/serverless-from-scratch-the-static-website/)
- [Serverless from Scratch: Setting up DNS](/2019/03/06/serverless-from-scratch-setting-up-dns/)
