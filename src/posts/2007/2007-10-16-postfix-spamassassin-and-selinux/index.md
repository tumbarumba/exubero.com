---
title: Postfix SpamAssassin and SELinux
date: 2007-10-16T12:00:44.000Z
permalink: /2007/10/16/postfix-spamassassin-and-selinux/
categories:
  - general
wordpressId: 163
---

I've just had three very long nights in a row, configuring a new mail server for [Lillifoot](http://www.lillifoot.co.uk/), and trying to get SpamAssassin working. It's finally working very sweetly, but I pulled a fair amount of hair out getting there.

My configuration is as follows:

- **Xen Hypervisor**: Dual Core 3.0GHz Intel Pentium 2Gb. I'm currently only running the mailserver as a Xen guest on this right now, but I will add more virtual machines later.
- **Mailserver (Xen Guest)**: I set up a guest and called it `mail.exubero.com`.
- **Operating System**: I'm running [Centos 5](http://www.centos.org/) in the Xen guest. I performed a clean minimal installation (headless), and disabled all services except sshd.
- **Services**: On top of the above base, the following services were installed:
    - [Postfix](http://www.postfix.org/)
    - [SpamAssassin](http://spamassassin.apache.org/)
    - [Procmail](http://www.procmail.org/)

I was able to install Postfix without too much trouble. After updating the DNS MX records for exubero.com and lillifoot.co.uk to point to mail.exubero.com, we're in business. There were a number of issues in the first day as I worked the kinks out of the configuration (I'm only really an amateur mailserver administrator).

What I hadn't previously appreciated was how much spam my previous ISP had been catching. Not a huge amount, but still in the range of 20-30 per day. Not a problem: off to install SpamAssassin.

I found a very good configuration guide for [Postfix, SpamAssassin and Procmail](http://traxel.com/doc/spamassassin-setup.html) by Robert Bushman. There were very clear instructions with easy to follow steps. All preparation steps worked fine, and I was able to test the configuration without issue. However, after I enabled the configuration in the running server, I got a strange error:

```
pipe[4403]: fatal: pipe_command: execvp /usr/local/bin/sa-filter: Permission denied
postfix/pipe[4400]: 5ECB0186DD3: to=<joe@example.com>, relay=spamassassin, delay=3.4,
  delays=2.9/0.04/0/0.46, dsn=4.3.0, status=deferred (temporary failure.
  Command output: pipe: fatal: pipe_command: execvp /usr/local/bin/sa-filter:
  Permission denied )
```

This is saying that the SpamAssassin filter (`sa-filter`) did not have permissions to run.

The configuration in `master.cf` shows that the script is run using the new "`filter`" user I created as per the instructions:

```
# Spam Filter
spamassassin unix - n n - - pipe
  user=filter argv=/usr/local/bin/sa-filter -f ${sender} -- ${recipient}
```

Hmmmm... the script worked fine when I was testing it manually, and running under the `filter` user. Check the script permissions:

```
[joe@mail ~]$ ll /usr/local/bin/sa-filter
-rwxr-xr-- 1 filter filter 72 Oct 16 01:21 /usr/local/bin/sa-filter
```

That looks good. I spent a long time researching this particular problem, without much success. The logs were inconclusive, and I couldn't track down anything useful. In the end, I reverted the Postfix configuration changes, and left it for a day.

Finally, researching a related but different problem, I came across a reference to SELinux causing problems with Postfix. With this idea, I tried changing the SELinux policy to "`permissive`"; suddenly, everything starts working. Wheee! For some reason, SELinux wasn't logging it's usual error messages to `/var/log/messages`.

Obviously, the more robust solution is to tweak the SELinux configuration to allow the script to run while SELinux is enabled. Dear Lazyweb, If anyone can help me on that one, send me an email and I'll post an update to this article.
