---
title: Design Principles for the Ant Script Library
date: 2009-01-31T00:52:45.000Z
permalink: /2009/01/31/design-principles-for-the-ant-script-library/
categories:
  - build-automation
wordpressId: 233
comments:
  - id: 14
    author: George
    url: 'http://www.supplesoftware.com'
    date: 2009-02-01T20:15:18.000Z
    content: >-
      Hey Joe,


      Isn't this a roundabout way of implementing the Maven philosophy of
      convention enforcement? Even if it's not the best convention, but one that
      satisfies the acceptance criteria.... Maven's good! It stops us from
      thinking!.....


      George
  - id: 15
    author: Joe
    url: 'http://www.exubero.com'
    date: 2009-02-01T21:57:08.000Z
    content: >-
      Hi George,


      This is really nothing to do with Maven, and there is no enforcement.
      However, by following the pre-configured conventions, you are able to
      produce exactly the same result with much less configuration. Given that I
      have to preconfigure <em>some</em> sort of directory structure, it makes
      sense to use an existing "standard". It certainly makes it easier if you
      want to try the two build systems side-by-side.


      Cheers,

      Joe
---

I've uploaded an updated version of the Ant Script Library. It contains support for executable jars, wars, and Apache Ivy. It can be downloaded here:

[http://www.exubero.com/asl/ant-script-library-1.0.1.zip](/asl/ant-script-library-1.0.1.zip "Ant Script Library v1.0.1")

I'm getting around to writing more complete documentation for how to use these, but for the moment I wanted to explain the considerations behind design of these scripts (referred to as the ASL in the remainder of this post).

## Orthogonal Modules

The ASL is composed of a number of files, each containing a relatively small number of targets. The targets are named in relatively generic terms. The purpose is to allow alternate scripts to be imported if a different implementation is required. For example, if you like to use [Apache Ivy](http://ant.apache.org/ivy/) to manage your dependencies in a repository, you can import the Ivy targets as follows:

`<import file="ant-script-library/asl-repo-ivy.xml"/>`

This import will then make the following targets available in your script: repo-cleancache, repo-report, repo-resolve, repo-retrieve.

If you later decided that you didn't want to use Ivy, but rather the [Maven Ant Tasks](http://maven.apache.org/ant-tasks/index.html) instead, you could replace the previous import with the following:

`<import file="ant-script-library/asl-repo-maven.xml"/>`

With this one change, your build script then changes to use a completely different repository management tool. Because this different module provides targets with the same names, no other changes would be required in the script (though in this case, you would have to replace the ivy.xml file with an equivalent pom.xml).

## Small Targets

Each ASL module is composed a number of top level targets public targets (these have descriptions, and so are described when you type \``ant -p`\`), as well as a number of private targets (these are prefixed with a '-' to ensure that they can't accidentally be invoked from the command line). Looking over the scripts, you will not that no target is more than 5 - 10 lines long, and does at most one or two tasks. The are a number of reasons for this:

- It becomes much easier to understand and maintain the scripts, because there is nothing really complex in any one target
- It becomes very easy to override specific targets to give different functionality. This is especially important when you are writing library scripts - it is almost certain that some targets will need to be overridden in the main script.

## Convention Over Configuration

The ASL has a number of build in configuration defaults, such as the location of the source directory, the location of the test source directory, and so on.  If your application conforms to these expected default, your build script can become incredibly simple. The simplest possible script might be:

`<project name="my-project" default="dist"> <import file="ant-script-library/asl-java.xml"/> </project>`

In general, the ASL scripts tend to expect your project conforms to the Maven [standard directory layout](http://maven.apache.org/guides/introduction/introduction-to-the-standard-directory-layout.html).

## Configuration Over Overriding

Not everyone has their project laid out in exactly the way, and it's not always easy to change this. In these cases, it's usually just a matter of defining specific properties with the actual values for your project before importing the ASL scripts. For example:

`<project name="my-project" default="dist"> <property name="java-build.src-dir location="src"/> <property name="java-test.src-dir location="test"/> <import file="ant-script-library/asl-java.xml"/> </project>`

Admittedly,the documentation for the properties is not there right now, but these can easily be determined by inspecting the ASL scripts.

## Overriding Over Reimplementation

In cases where you need to do something complete different to what the ASL scripts are doing, you can override specific targets in the top level build script. Just those targets will be overriden, and everything will work without change. For example:

`<project name="my-project" default="dist"> <import file="ant-script-library/asl-java.xml"/> <!-- *********************************************************************** * target override: copy-resources ************************************************************************ --> <target name="copy-resources" description="Copies resources in preparation to be packaged in jar"> <copy todir="${java-build.classes-dir}"> <fileset dir="resources"/> </copy> </target> </project>`
