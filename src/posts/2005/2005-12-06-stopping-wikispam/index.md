---
title: Stopping WikiSpam
date: 2005-12-06T12:00:11.000Z
permalink: /2005/12/06/stopping-wikispam/
categories:
  - general
wordpressId: 84
---

I have a relatively dormant wiki I set up to keep track of classmates from school (see [JoeysWiki](/joeys/)). Although the wiki isn't really active, I didn't really want to take it down (at least, not yet) because it still has some quite relevant information. However, in the last few months the wiki has come under attack from a botnet trying to insert [WikiSpam](http://en.wikipedia.org/wiki/Wikipedia:Spam). I quickly protected the targeted pages, but this hasn't stopped the botnet from attempting to deface the wiki. There must be several hundred computers trying to add content, which is a non-trivial drain on my fairly limited bandwidth.

I wanted to set up a relatively simple (yet automated) way to block the source addresses before they could do anything nasty. My solution involves periodically grepping the apache log files, and updating the firewall rules.

There are a number of components to a script to dynamically configure [iptables](http://www.netfilter.org/projects/iptables/index.html).

#### /etc/sysconfig/iptables.default

`iptables.default`This file contains the default rules for the firewall. Of particular interest, though, is the rule which passes all new connection attempts on port 80 to the HTTP-SPAMCHECK chain:

```
-A INPUT -m state --state NEW -m tcp -p tcp --dport 80 -j HTTP-SPAMCHECK
```

#### /etc/sysconfig/iptables.wikispam

`iptables.wikispam` contains all the reject lines for each individual IP address that is participating in the spam attack. Currently, there are about 170 lines in this file similar to the following:

```
-A HTTP-SPAMCHECK -s 12.163.83.62 -j REJECT
```

#### /etc/sysconfig/iptables.commit

`iptables.commit` contains a final rule to accept the http connection. Since this rule will checked last, all the previous spam checks will have been processed.

```
-A HTTP-SPAMCHECK -j ACCEPT
```

#### /etc/cron.daily/wikispam

This is the script that runs once a day:

```
#!/bin/sh
###############################################################################
# Simple script to search for spam attempts on the wiki (apache log lines
# containing favicon.ico&action), and adding them to the firewall rules
###############################################################################
grep -h "favicon.ico&action" /var/log/httpd/access_log | 
    perl -pe "s/^(.*?) -.*$/-A HTTP-SPAMCHECK -s 1 -j REJECT/" >> 
    /tmp/iptables.wikispam.$$
cat /etc/sysconfig/iptables.wikispam /tmp/iptables.wikispam.$$ | 
    sort | uniq > /tmp/iptables.wikispam.$$.sorted
cat /tmp/iptables.wikispam.$$.sorted > /etc/sysconfig/iptables.wikispam
cat /etc/sysconfig/iptables.default /etc/sysconfig/iptables.wikispam 
    /etc/sysconfig/iptables.commit > /etc/sysconfig/iptables.current
/sbin/iptables-restore < /etc/sysconfig/iptables.current
```

This script is doing the following:

- Finding all lines in the apache log file that contain the signature of the wikispam attack (any line containing the text "favicon.ico&action" in this case)
- Picking out the IP address from that line, and transforming it into a valid rule for iptables, and dumping this into the temporary file.
- Concatenating the existing rules along with the new rules, sorting the result and removing duplicates.
- Assembling iptables.default, iptables.wikispam and iptables.commit into a valid iptables script (called iptables.current).
- Restoring iptables from the iptables.current

I can detect an attack attempt from a bug in the spambot - it tries to modify favicon.ico on a protected page. This solution is still a bit more complex than I like, but at least it's stopped the problem (for the moment, at least).
