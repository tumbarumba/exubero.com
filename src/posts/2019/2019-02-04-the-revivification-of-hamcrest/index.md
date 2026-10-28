---
title: The Revivification of Hamcrest
date: 2019-02-04T22:41:09.000Z
permalink: /2019/02/04/the-revivification-of-hamcrest/
categories:
  - open-source
wordpressId: 5082
---

I love [Hamcrest](http://hamcrest.org/JavaHamcrest/). I've been my first choice library for writing assertions in tests for many years. I know that there's other alternatives (such as [JUnit assertions](https://junit.org/junit4/javadoc/4.12/org/junit/Assert.html), or [AssertJ](http://joel-costigliola.github.io/assertj/)), but I've always preferred the literate style and composability of Hamcrest.

Some time in early October 2018, I was in a discussion with a colleague about different assertion libraries. They made a statement which floored me: "Hamcrest is dead". I went to the Java Hamcrest website, but it didn't really help. The last release was version 1.3 in 2012, and nothing since. Looking at the the commits in GitHub, I also noticed some strange references to a 2.0.0.0 release, but it wasn't mentioned in the docs anywhere. There was a number of issues and pull requests that didn't seem to have anyone looking at them. All in all, the website looked a bit derelict. I resolved to fix this.

The first thing I tried was to update the docs. The docs were hosted as GitHub pages, so it was a matter of updating the appropriate markdown files, and issuing a pull request. After a bit of discussion, it was merged.

Next, I asked about a creating a new release, and offered to help. In response, Steve Freeman gave me commit access to the repository and said "Go for it". (I think it helped that I know Steve very well through [XTC](http://www.extremetuesday.com/)).

Steve did have one suggestion, which I thought was sensible: merge hamcrest-core and hamcrest-library into a single jar. The reasons for separating out the different jars didn't make sense any more, especially after JUnit 5 was released without a dependency on Hamcrest. As it turned out, this was the most complicated part of the release. There is not really a good way to merge jars in a backwards compatible way. We wanted to draw a line under the old jar ("hamcrest-core" and "hamcrest-library"), and call the new library just plain "hamcrest". This is easy to do, but it does cause a bit of havoc with the dependency resolution tools in Maven, Gradle, and the like. If there are no other dependencies around, it's not a problem, but if there is an existing transitive dependency on "hamcrest-core-1.3.jar", it won't automatically upgrade. For people who use JUnit 4.x, this is a real problem. There are ways and means of configuring the build tools to exclude the old dependency, but it's not obvious or trivial. I ended up re-release new versions of "hamcrest-core" and "hamcrest-library" as empty jars with a dependency on the new "hamcrest" jar. Even that caused problems - you can't release an empty jar to Maven Central - hence the two new do-nothing package private classes "HamcrestCoreIsDeprecated" and "HamcrestLibraryIsDeprecated".

The final question to resolve was "What version number to use?". The previous release was 1.3. Under the rules of [semantic versioning](https://semver.org/), the next version probably should have been 1.4. However, there were a few problems with this:

- We had changed the jar packaging. Although still API compatible, it probably requires changes to the build
- We had upgraded the minimum required Java runtime version from 1.5 to 1.7. As it turns out, this is important for the very rare projects that still use Java 1.5 (such as Junit 4)
- There was already a release of java-hamcrest-2.0.0.0.jar on Maven Central. This was an aborted refactoring attempt from 2015. It shouldn't really have been release to Maven Central, as it was in an incomplete state, but it can't be removed once it was put there. I thought it would be confusing to have a new release of Hamcrest with a smaller version number than this artifact.

For the above reasons, the final version we chose was 2.1.

I put out a number of release candidates in November and December. As it turned out, there were a number of issues raised, mainly with the repackaging, which was fixed or addressed. I was trying to complete everything before my big move from England to Australia, but I didn't quite make it. The final release of Hamcrest 2.1 went out on the 21st December 2018. For more detail on how this release came about, there's a lot of discussion on the GitHub [Issue #224: Release Version 2.1 on Maven](https://github.com/hamcrest/JavaHamcrest/issues/224).

So, take that, mister "Hamcrest is dead"!![its-alive](/2019/02/04/the-revivification-of-hamcrest/images/its-alive.jpg)
