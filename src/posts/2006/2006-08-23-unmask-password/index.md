---
title: Unmask Password
date: 2006-08-23T12:00:30.000Z
permalink: /2006/08/23/unmask-password/
categories:
  - general
wordpressId: 121
---

I've been doing a lot of work around encryption lately. One of the tasks involved creating a dialog allowing the user to enter their password for encryption or decryption. One feature I put on this dialog was a "mask password" checkbox. When checked, the password appears as asterisks, meaning the people near the person are unable to see what is being typed. When unchecked, the plaintext of the passphrase is visible.

During review, someone asked why this feature was even available? Wasn't it a security hole?

The problem is that a cryptograpic key requires anywhere from 56 to 128 bits of entropy, depending upon the algorithm. An 8 character password can have anywhere from 8 to 40 bits of entropy, depending upon how rigorous the user is in avoiding dictionary words, or variants thereof, and using non-alphabetic characters. A much better strategy is for users to use unlimited length passphrases, perhaps using "shocking nonsense" as a mnemonic. An interesting discussion on this subject can be found in the [PGP Passphrase FAQ](http://www.virtualschool.edu/mon/Crypto/PGPPassPhraseFAQ.html).

The problem with unlimited length passphrases is that people (in general) are terrible typists. Without the feedback of seeing exactly what they are typing, they are unable to correctly type in long phrases without error.

Allowing the user to unmask the password as they are typing gives them the confidence to use much more secure passphrases, with the added issue that they must make sure that no-one is watching as they type. In general, this is something the users are much more able to evaluating the risk. Considered altogether, the actually **increases** the security of the entire process.
