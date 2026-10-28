---
title: 'Serverless from Scratch: Setting up DNS'
date: 2019-03-06T08:01:29.000Z
permalink: /2019/03/06/serverless-from-scratch-setting-up-dns/
categories:
  - serverless
wordpressId: 5095
---

This is the third post in the Serverless from Scratch series. The previous post on this topic is [Serverless from Scratch: The Static Website](/2019/02/13/serverless-from-scratch-the-static-website/).

As mentioned in my previous post, the domain attentiontodetail.com.au was already taken. I had not response from my queries about buying the domain, so Vince and I had a talk about alternative names. Vince eventually decided on canberra-detailing.com.au as a domain. I like this because it's on brand ("detailing"), and shows where the service is available ("Canberra").

I went to domain.com to order this new domain, but realised at this stage that this registrar can't take orders for Australian domains. Another more specific search pointed me at a list of registrars registered with the Australian domain authority. I ended up using [cheaperdomains.com.au](https://www.cheaperdomains.com.au/).

I re-read the instructions on [using a custom domain with GitHub pages](https://help.github.com/en/articles/using-a-custom-domain-with-github-pages), and I realised something: the repo is in the wrong place. I need it to be the top-level pages website, but I already have a different one for my personal GitHub account ([tumbarumba.github.io](https://tumbarumba.github.io)). I believe the solution in this case is to create a new GitHub organisation, transfer the repo to that organisation with the specific name <<org-name>>.github.io. With these changes, the repo is now at [github.com/canberra-detailing/canberra-detailing.github.io](https://github.com/canberra-detailing/canberra-detailing.github.io).

Setting up a custom domain was relatively easy, once I found the place on the Cheaper Domains website where you could configure DNS. Essentially, I had to create a number of new A records as specified in the [GitHub docs](https://help.github.com/en/articles/setting-up-an-apex-domain), and wait a day for the DNS changes to propagate.

With the DNS now in place, my next task is to add some content to the site. We'll get to the "serverless" part of this blog series eventually, I promise!
