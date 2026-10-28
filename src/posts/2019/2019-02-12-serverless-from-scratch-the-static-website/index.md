---
title: 'Serverless from Scratch: The Static Website'
date: 2019-02-13T10:29:53.000Z
permalink: /2019/02/13/serverless-from-scratch-the-static-website/
categories:
  - serverless
wordpressId: 5089
comments:
  - id: 284
    author: Alan WU
    date: 2019-02-24T14:01:17.000Z
    content: So great! looking forward to your next posts.
---

This is the second post in the Serverless from Scratch series. The previous posts on this topic is [Serverless from Scratch: First Steps](/2019/02/06/serverless-from-scratch-first-steps/).

As mentioned in my last post, the first thing I want to do is set up a static website. Later on I will add functionality to read, display and update the calendar, but first I need a location on the internet to do this from.

Initially, I need two things to get started:

- A domain name
- A place to host the site

The rest of this post explores both of those tasks.

## Registering a Domain Name

In registering a domain name, my first question is _what_ domain name? The name of the company as registered in ASIC is called "Attention to Auto Detail". However, Vince and his customers always refer to it as "Attention to Detail". On this basis, I'm going to attempt to register the domain "AttentionToDetail.com.au", as there doesn't appear to be a website hosted at that domain right now.

Next question: what domain registrar should I use? I've been away from Australia for a long time, and I'm not familiar with the local options. I tried the Google search "[best dns domain registrar australia](https://www.google.com.au/search?q=best+dns+domain+registrar+australia)". This lead me to this review: [The Best Domain Registrars 2019 – the Good, the Bad and the Ugly](https://makeawebsitehub.com/reviews/domain-registrars/), which suggests [domain.com](https://www.domain.com) as a good option. I try to register "AttentionToDetail.com.au", but it tells me that the domain is already registered (bummer!).

I think I have a couple of options:

1. Chose a new domain. I have a quick chat with Vince about options. He doesn't have any ideas off the top of his head, but he'll think about it and get back to me.
2. Ask the current registrant to transfer the domain. Given that there's not a website there currently, I wonder if it's possible to buy the domain from the current registrant? I have a look at the whois record for the domain, and send an email to the email address, approximately asking: "Are you willing to transfer the domain"?

Both of those options will take time to resolve, so I look at the next task.

## Website Hosting

Many domain registrars will package domain name registration and website hosting together. However, I have a strong preference for another alternative: [GitHub Pages](https://pages.github.com/). This option combines my favourite version control tool ([git](https://git-scm.com/)), my favourite markup language ([Markdown](https://en.wikipedia.org/wiki/Markdown)), and my favourite site generation tool ([Jekyll](https://jekyllrb.com/)). I may not use it forever, but at least I can set up something quickly.

I set up a new repository at [github.com/tumbarumba/attention-to-detail](https://github.com/tumbarumba/attention-to-detail), and configured it to publish GitHub Pages. Until the the domain name issue is resolved, the website can be viewed at [https://tumbarumba.github.io/attention-to-detail/](https://tumbarumba.github.io/attention-to-detail/). It's very bare right now (just a title), but I can incrementally add content as I go.

My next steps:

- Set up DNS records for the website
- Add content to the website, and make it look pretty. This will initially be contact information, information about services offered, and company information. Essentially, an online brochure.
- Display details of available time slots. I will need to extract this information from Vince’s existing calendar (which is currently stored on Apple’s iCloud, and accessed from his iPhone).
- Allow customers to reserve a time in the calendar for Vince to perform his magic
- Allow Vince to accept or reject bookings.

Read the next post in this series: [Setting up DNS](/2019/03/06/serverless-from-scratch-setting-up-dns/).
