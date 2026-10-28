---
title: Project Dependencies Using Ant
date: 2016-12-28T21:02:12.000Z
permalink: /ant/dependencies/
wordpressId: 730
---

### Overview

This article discusses a technique for managing the build order of separate sub-projects in a large software system purely using task dependencies within Ant scripts.

Unlike other solutions, this technique for managing dependencies does not need any external tasks to those already distributed with Apache Ant, as it leverages Ant's inbuilt target dependency behaviour. See the Ant [Related Projects](http://ant.apache.org/projects.html) page for many examples of other alternative solutions to the method presented in this article.

### Example System

For the purposes of describing this technique, I'll use an example application that has been split into four components:

web

Views and user interaction code. Depends upon the model and common components.

admin

Functionality to administer the application data. Depends upon the model and common components.

model

Objects that encapsulate data and associated behaviour. Depends upon the common component.

common

Shared utilities and methods. Has no other dependencies.

Based upon this description, the dependencies between components can be illustrated as follows:

![deps](/ant/dependencies/images/deps.png)

 

These projects are contained in sibling directories underneath a top level "**`example`**" directory.

### Building a Component

The standard way to build a component from Ant is to declare a `build` or `compile` target and use the javac task. Other targets can build a distributable or clean up generated files. For example:

#### build.xml (example)

```
<?xml version="1.0" encoding="ISO-8859-1"?>
<project name="build" default="dist">
    <target name="clean" description="Delete generated files">
        ...
    </target>
    <target name="compile" description="Compile code">
        ...
    </target>
    <target name="dist" depends="compile" description="Build distributable">
        ...
    </target>
</project>
```

Traditionally, a script similar to the example above would have been copied into each of the component directories. However, Ant 1.6 introduced the `<import>` task, which greatly simplifies writing scripts for multiple projects with a similar structure. Making use of this feature, we will use a common build script containing all the shared targets, and a much simplified script in each component.

The common build script looks like this:

#### build-common.xml

```
<?xml version="1.0" encoding="ISO-8859-1"?>
<project name="build-common" default="default">
    <target name="default" depends="dist"/>

    <target name="clean">
        <echo message="${ant.project.name} - build-common.clean"/>
    </target>

    <target name="compile">
        <echo message="${ant.project.name} - build-common.compile"/>
    </target>

    <target name="dist" depends="compile">
        <echo message="${ant.project.name} - build-common.dist"/>
    </target>
</project>
```

This example is only echoing messages to enable the targets to be traced. A real script would be calling the `<delete>`, `<javac>` and `<jar>` tasks respectively.

To use these common tasks, each component creates a build.xml file that simply imports `build-common.xml`. In the case of the `admin` component, `build.xml` will look like this:

#### admin/build.xml

```
<?xml version="1.0" encoding="ISO-8859-1"?>
<project name="admin" default="default">
    <import file="../build-common.xml"/>
</project>
```

The only difference for the other projects is the value of the `name` attribute of the `project` element. To build the distributable for a project, enter the following:

```
> ant dist
```

This works fine if all dependencies are already present. However, in the case of the admin, model and web components, the code depends upon jars that may not yet be built. There needs to be a way to ensure that building any component will always build dependencies beforehand.

### Declaring Dependencies

Dependencies between components are described within a single Ant script called `dependencies.xml`, saved at the top level of the directory structure. For each component, there is a corresponding target called `depend.{componentname}` defined within `dependencies.xml`. The depends list for this target will specify the other component dependencies. The sole task for each of these targets is to recursively call Ant within the corresponding component directory. Putting this all together, the script looks like this:

#### dependencies.xml

```
<?xml version="1.0" encoding="ISO-8859-1"?>
<project name="dependencies" default="depend.all">
    <dirname property="dependencies.basedir" file="${ant.file.dependencies}"/>
    <!-- ================================================================== -->
    <target name="depend.all"
            depends="depend.admin, depend.web">
    </target>
    <!-- ================================================================== -->
    <target name="depend.admin"
            depends="depend.model, depend.utilities">
        <ant dir="${dependencies.basedir}/admin" inheritAll="false"/>
    </target>
    <!-- ================================================================== -->
    <target name="depend.model"
            depends="depend.utilities">
        <ant dir="${dependencies.basedir}/model" inheritAll="false"/>
    </target>
    <!-- ================================================================== -->
    <target name="depend.utilities">
        <ant dir="${dependencies.basedir}/utilities" inheritAll="false"/>
    </target>
    <!-- ================================================================== -->
    <target name="depend.web"
            depends="depend.model, depend.utilities">
        <ant dir="${dependencies.basedir}/web" inheritAll="false"/>
    </target>
</project>
```

### Calling Dependencies

Now that dependencies have been defined, there needs to be a way to automatically call the builds of dependenent projects. Making the following changes will achieve this:

- update `build-common.xml` to import `dependencies.xml`
- declare a new target `dist.dependencies` that uses `<antcall>` to call into the appropriate target. Since the project name is always stored in the property `ant.project.name`, a single target is sufficient

The updated `build-common.xml` now looks like this:

#### build-common.xml

```
<?xml version="1.0" encoding="ISO-8859-1"?>
<project name="build-common" default="default">
    <import file="dependencies.xml"/>

    <target name="default" depends="dist"/>

    <target name="clean">
        <echo message="${ant.project.name} - build-common.clean"/>
    </target>

    <target name="compile">
        <echo message="${ant.project.name} - build-common.compile"/>
    </target>

    <target name="dist" depends="compile">
        <echo message="${ant.project.name} - build-common.dist"/>
    </target>

    <target name="dist.dependencies">
        <antcall target="depend.${ant.project.name}"/>
    </target>
</project>
```

That's it! Running the following command from within _any_ component will always build dependant components first:

```
> ant dist.dependencies
```

For example, here is the output of running the command from within the `web` component:

```
Buildfile: build.xml
 
dist.dependencies:
 
depend.utilities:
 
compile:
     [echo] utilities - build-common.compile
 
dist:
     [echo] utilities - build-common.dist
 
default:
 
depend.model:
 
compile:
     [echo] model - build-common.compile
 
dist:
     [echo] model - build-common.dist
 
default:
 
depend.web:
 
compile:
     [echo] web - build-common.compile
 
dist:
     [echo] web - build-common.dist
 
default:
 
BUILD SUCCESSFUL
Total time: 0 seconds
```
