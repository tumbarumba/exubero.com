---
title: IvyDE Rocks
date: 2009-01-18T22:30:00.000Z
permalink: /2009/01/18/ivyde-rocks/
categories:
  - build-automation
wordpressId: 217
---

If you don't want to read through the rest of this posting, here's the conclusion: if you're developing Java applications in Eclipse, you need to give [Ivy DE](http://ant.apache.org/ivy/ivyde/) a go. It very elegantly integrates any dependencies declared in a pom.xml or ivy.xml into the Eclipse classpath. (Yes, that's right: it handles Maven pom.xml files just nicely, thank you very much - take note Guy, Marc, et al).

In the Java build environment, you can manage external library dependencies in a number of ways:

1. Manual global jars (for example, setting a global classpath to a shared directory containing every jar used by all the applications).
2. Manual project jars (for example, by checking libraries into a "lib" subdirectory in the project).
3. Declaratively, using a dependency management tool, such as [Ivy](http://ant.apache.org/ivy/) or [Maven](http://maven.apache.org/). In this case, you declare the dependencies in a single file (ivy.xml for Ivy, or pom.xml for Maven). These tools handle transitive dependencies, allowing you to concisely declare the top level dependant artefacts, without having to track every ultimate dependant required by not necessarily used directly by your project.

Options 1 and 2 is probably how the majority of projects approach external library dependencies. It's relatively simple and easy to understand, but is unfortunately very brittle and subject to failure. Manually managing jars in a global location is especially prone to failure, when "upgrading" a single jar has the opportunity to break a number of applications unless the release is tested very carefully.

Personally, I've been using a Maven pom.xml to manage dependencies in my projects for the last couple of years. For the builds, I've been using Ant to build the code. I've mentioned before that [I'm not a big fan of Maven](/2007/03/13/why-i-prefer-ant-over-maven/), but I do like the Maven plugins for Ant. This gave me a problem in Eclipse: how to manage the classpath. Because I wasn't using Maven to manage the builds, I couldn't use the Maven Eclipse plugin (it tries to take over the entire build - not just the classpath dependencies). I settled on using the pom.xml to bring all the dependencies into a project specific lib directory, and adding those jars to the classpath. Not the best solution, as there was duplicated classpath information, but at least is was mostly automated - the pom.xml was still the primary specification of the dependencies.

I finally got around to installing [Ivy DE](http://ant.apache.org/ivy/ivyde/) last week, and I was really impressed with how well it works. With a relatively small change to the Eclipse classpath handling, either ivy.xml or pom.xml can become the classpath specification used by Eclipse, removing all redundancy in the situation. In less than 5 minutes after installing the plugin and following the [setup instructions](http://ant.apache.org/ivy/ivyde/history/latest-milestone/cp_container.html), I was able to update the classpath to use the dependancies declared in the ivy.xml file. My builds are now completely DRY. Nice!
