---
title: Worst Hosting Company Award...
date: 2009-08-16T16:19:40.000Z
permalink: /2009/08/16/worst-hosting-company-award/
categories:
  - general
wordpressId: 324
---

Here's a summary of a series of emails and phone conversations I had with my _old_ dedicated hosting provider. You should get a sense of why I don't do business with them any more.

**Worst Hosting Company (WHC)**: we are going to move your dedicated host to a new location in 1 months' time, and we must assign a new IP address to your host within 1 week. One of our engineers will call you within 2 days to arrange the IP renumbering.

_Note: no phone number was given - I had to wait for their call_

_(1 week passes)_

**WHC**: You have less than 48 hours to contact us regarding the IP address renumbering of your dedicated host. If you do not call us in this time, the work will be completed in 2 days. Please call us on xxx-xxxx-xxxx

**Renaissance Developer (RD)**: Whoa! I'd rather you didn't do that! I have multiple virtual machines (VMs) running on that host, including an [e-commerce website](http://www.lillifoot.co.uk "Lillifoot Children's Shoes"), not to mention various other websites and services. Instead, can you please set up another dedicated host for me in the new location, and I can migrate my VMs to the new host before the switch over. I'd rather avoid any downtime.

**WHC**: We'll look into this for you.

_(a day passes)_

**WHC**: Sorry, we don't have any dedicated hosts available. _(WTF! It's a hosting company!)_

**RD**: Oh, OK. Well, please let me know the new IP addresses for the my VMs. I will need to update their network configuration when you switch over.

_(a day passes)_

**WHC**: You have less than 24 hours to contact us, before we implement our IP address renumbering. Please contact us urgently.

**RD**: _(phones urgently, but the engineer responsible for the renumbering is unavailable. I leave a message to call me back)_

_(6 hours later)_

**RD**: _(phones urgently again, but the engineer responsible for the renumbering is unavailable. I leave a message to call me back)_

_(the next day)_

**WHC**: Unfortunately we have not received contact from you despite repeated notices. This means we are unable to make the necessary changes to your server, but we will be completing the IP re-numbering at switch level, meaning your server will be offline until such time as you contact us to re-establish the service.

**RD**: Whoa! Don't do that! My VMs are not yet ready. Please let me know urgently what the new IP addresses are!

**WHC**: Oh, sorry. Here are the addresses. Can you give us the root password, and we can reconfigure the host tomorrow morning?

**RD**: _(dubiously)_ OK, I'll set up an account for you in the wheel group. I will have to adjust the access permissions to let you in.

_(the next morning, I adjust the access permissions for the sshd service in hosts.allow and hosts.deny, but in the rush I manage to really stuff it up: I've locked myself out of my machine! Doh! Now I've got to ask WHC for help)_

**RD**: Can someone with console access please clear out the hosts.deny file on my host?

_(a day passes)_

**RD**: Help! Anyone?

**WHC**: An engineer callout will cost £50. Are you happy to pay this?

**RD**: _(grumpy)_ Well, I've got not real choice here, have I? I'll pay the fee, just fix it up for me!

_(a week passes, but at least my host still seems accessible)_

**WHC**: We've fixed you problem for you. At the same time, we've also assigned a new IP address to your host.

**RD**: What! I told you not to update it before I updated my VMs! You've just put my e-commerce website offline!

**WHC**: ...

_(I reconfigure my VMs with the new IP addresses they gave me. Unfortunately, the VMs remain inaccessible from outside the hosting site)_

**RD**: It appears the address routing is incorrrect. Can you please ensure that the network is configured to route the assigned addresses to my host?

_(6 hours pass)_

**WHC**: OK, it is done

**RD**: Not all the addresses work. Please make sure _all_ the addresses are routed to my host.

_(another day passes)_

**WHC**: OK, it is done

**RD**: Your DNS name server is not working. Can you please advise?

**WHC**: Ah, you're referring to the old name server. Here's the new one

_(why couldn't you tell me that in the first place?)_

I think there was more shenannigans, but I can't remember any more details. As I mentioned earlier, I'm no longer doing business with WHC (whose name starts with "Stream", and ends in "line.net"). I notice that they don't seem to offer a dedicated hosting package any more. I'm not surprised.
