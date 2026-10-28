---
title: 'Web Engineering, Retro Style'
date: 2025-08-12T10:48:12.000Z
permalink: /2025/08/12/web-engineering-retro-style/
categories:
  - web
tags:
  - programming
  - technology
  - web-development
wordpressId: 5339
---

This is a bit of a link dump and commentary about my current thoughts on web engineering in 2025, retro style.

It seems like the whole web development world has jumped onto the React ecosystem for pretty much _everything_. The 2025 Stackoverflow developer survey puts React in by far the most popular web development framework:

- [https://survey.stackoverflow.co/2025/technology#1-web-frameworks-and-technologies](https://survey.stackoverflow.co/2025/technology#1-web-frameworks-and-technologies)

I find this a bit painful, as the React ecosystem is _complex_. I think you can have a much more robust and fully featured web experience with a much, much simpler technology stack. The following is a series of links to idea that explain where I've learned such a countercultural mindset.

First: Dan McKinley gave a talk in 2014 called "Choose Boring Technology". To me, it introduced the concept of "innovation tokens", and the idea that you don't have to be on the bleeding edge of everything. Business value comes from spending your innovation tokens carefully on things that make a material difference to what matters to the users.

- [https://boringtechnology.club/](https://boringtechnology.club/)

Next is a talk by Stuart Langrade 6 years ago (in 2025), called "You really don't need all that JavaScript, I promise", which highlights the main problems, as well as offers a path forward based on the old principles of standard web pages with progressive enhancement:

- [https://www.kryogenix.org/code/dont-need-that-js/pp2022/](https://www.kryogenix.org/code/dont-need-that-js/pp2022/) (text version of talk)

- [https://www.youtube.com/watch?v=rxlJRydqmk8](https://www.youtube.com/watch?v=rxlJRydqmk8) (From GOTO 2019)

Jono Alderson has some more modern arguments and examples from this year, which is both a call to arms against the proliferation of SPAs, how to use modern HTML and CSS features to get the same (or better) user experience:

- [https://www.jonoalderson.com/conjecture/javascript-broke-the-web-and-called-it-progress/](https://www.jonoalderson.com/conjecture/javascript-broke-the-web-and-called-it-progress/)

- [https://www.jonoalderson.com/conjecture/its-time-for-modern-css-to-kill-the-spa/](https://www.jonoalderson.com/conjecture/its-time-for-modern-css-to-kill-the-spa/)

A quote from the last link:

> Use modern server rendering. Use actual pages. Animate with CSS. Preload with intent. Ship less JavaScript.

Finally, HTML can do a lot!

- [https://sans.style/](https://sans.style/)

In summary: I think server rending of full HTML pages is the way to do for 99% of use cases.
