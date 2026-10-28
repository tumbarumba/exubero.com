---
title: Detecting Cycles using JDepend and Ant
date: 2009-09-03T22:57:45.000Z
permalink: /2009/09/03/detecting-cycles-using-jdepend-and-ant/
categories:
  - continuous-integration
wordpressId: 351
comments:
  - id: 41
    author: Hugh
    date: 2009-09-07T10:00:34.000Z
    content: >-
      Why not just get out of the habit of lumping too many packages into one
      src tree?
---

[Package dependency cycles are bad](http://www.google.com/search?q=Package+dependency+cycles+are+bad), mmkay? However, it's amazing how easy it is for cycles to accidentally appear, especially among teams of developers who may not be aware of the pitfalls. Ideally, I would like the automated build to break if a cycle appears, ensuring that the problem can be fixed up before it gets out of hand.

[JDepend](http://clarkware.com/software/JDepend.html) already reports if cycles are present between packages, but it isn't as easy as it could be to cause the build to break. One suggestion is to write a JUnit test that runs JDepend separately, and fails if a cycle is found (see the [JDepend documentation](http://clarkware.com/software/JDepend.html#junit)). Although possible, I don't think it is as elegant as it could be, because:

- I have to get the path to the compiled code into the unit test, either by hard coding the path, or possibly passing it in as a parameter somehow. This is tight coupling between the unit test and the place from which it runs.
- I have to invoke JDepend twice: once to check for cycles, and again to generate the HTML report.

I think that an Ant script is a much better place for this functionality: it already has all the path information, all it needs is a way to find out if there are any cycles. If so, it can fail the build if appropriate. Unfortunately, the current [JDepend Ant task](http://ant.apache.org/manual/OptionalTasks/jdepend.html) doesn't provide a way to find out. Until now, that is! I've just completed a couple of patches: one to JDepend itself, and another to the JDepend Ant task. My patch added an extra attribute to the <jdepend> element called "cyclesdetectedproperty". This will set a property if JDepend detected a cycle. I expect that this could be used in a manner similar to this:

```
<target name="report-jdepend" depends="compile"
       description="Creates a package dependency report">
   <mkdir dir="${java-report.jdepend-data-dir}"/>
   <jdepend outputfile="${java-report.jdepend-data-dir}/jdepend.xml"
            format="xml"
            cyclesdetectedproperty="jdepend-cycles-found">
       <exclude name="java.*"/>
       <exclude name="javax.*"/>
       <classespath>
           <pathelement location="${java-build.classes-dir}"/>
       </classespath>
   </jdepend>

   <mkdir dir="${java-report.jdepend-dir}"/>
   <xslt basedir="${java-report.jdepend-data-dir}"
          destdir="${java-report.jdepend-dir}"
          includes="jdepend.xml"
          style="${ant.home}/etc/jdepend.xsl"/>

   <fail if="jdepend-cycles-found">Cyclical package dependencies found</fail>
</target>
```

I haven't released these patches yet, but I will soon be adding it to the [Ant Script Library](/asl/). All going well, I'll try and get the patches rolled back into the JDepend and Ant code bases. Let me know if you're interested in seeing it earlier.

**Update:**

I just spotted the [verifydesign](http://ant-contrib.sourceforge.net/tasks/tasks/verifydesign.html) task in AntContrib, which actually does what I would like, and more. Pretty neat, but I'd still prefer that I could fail the build from JDepend, as it is a much simpler task to configure.

<target name="report-jdepend" depends="compile" description="Creates a package dependency report"> <mkdir dir="${java-report.jdepend-

data-dir}"/> <jdepend outputfile="${java-report.jdepend-data-dir}/jdepend.xml" format="xml" cyclesdetectedproperty="jdepend-cycles-found"> <exclude name="java.\*"/> <exclude name="javax.\*"/> <classespath> <pathelement location="${java-build.classes-dir}"/> </classespath> </jdepend>

<mkdir dir="${java-report.jdepend-dir}"/> <xslt basedir="${java-report.jdepend-data-dir}" destdir="${java-report.jdepend-dir}" includes="jdepend.xml" style="${ant.home}/etc/jdepend.xsl"/>

<fail if="jdepend-cycles-found">Cyclical package dependencies found</fail> </target>
