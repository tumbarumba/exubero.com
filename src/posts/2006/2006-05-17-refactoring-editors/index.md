---
title: Refactoring Editors
date: 2006-05-17T12:00:44.000Z
permalink: /2006/05/17/refactoring-editors/
categories:
  - general
wordpressId: 110
---

After a 6 year hiatus from C++ (doing mainly Java), I've finally jumped back into doing some C++ development using Microsoft Visual Studio. I was quite keen to see how the development environments compare after some many years away. In summary, I was severely disappointed.

A bit of background: I was a long time user of Visual Studio until 2000, when I started doing (paid) Java development. In the past 6 years, I've been using various IDEs, including JDeveloper (slow and buggy!), Websphere Application Developer / Rational Application Developer (slower and buggier!), Eclipse and IntelliJ. Occasionally, I like to use Vim or TextPad for quick edits. In recent years, I've settled on [Eclipse](http://www.eclipse.org/) as my main Java development environment, and have grown very proficient at using its features (to the extent that I even though I have the opportunity to migrate to the renowned IntelliJ, I find I'm still more productive in Eclipse).

The tools that I have come to depend upon most are the [refactoring features](http://www-128.ibm.com/developerworks/library/os-ecref/) available within Eclipse. I can't imagine doing serious development without proper refactoring support, yet that's the situation in which I find myself. Although Visual Studio does offer factoring support for C#, C++ appears to be left out in the cold. I can see that there are commercial refactoring plugins available, but that is a far cry from the out-of-the-box features available within Eclipse.

Although some refactorings are simple, many are can be quite complex, and result in modifying many different files. When done manually, this task is error prone. Automated tools should be able to excel in this type of task. Given that C++ is a much more dangerous language in which to develop, with many more "gotchas", the lack of refactoring support is quite alarming.

C++ already suffers a major productivity disadvantage due to the numerous and varied ways you can shoot yourself in the foot, along the sheer complexity of the language. Many modern languages have bypassed these problems. Additionally, having access to a powerful refactoring editor allows programmers to raise their level of thinking to a higher abstraction level. This is a good thing, and having such an editor readily available for C++ would be a major advantage (or at least cover some of the language shortfalls).
