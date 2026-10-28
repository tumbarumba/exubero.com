---
title: JUnit Anti-patterns (original)
date: 2020-08-08T13:25:51.000Z
wordpressId: 5159
---

### Overview

JUnit is a regression testing framework that allows developers to implement unit tests in Java. Using JUnit, you can cheaply and incrementally build a test suite that will help you measure your progress, spot unintended side effects, and focus your development efforts.

This extra testing code provides tremendous advantages in any development project. However, the subject of this article is the downside of testing: the unit tests themselves can be buggy or badly written. This pages covers some of the major anti-patterns that have been observed to occur with JUnit test cases.

The anti-patterns are:

- [Misuse of Assertions](#Misuse_of_Assertions)
    - [Manual Assertions](#Manual_Assertions)
    - [Multiple Assertions](#Multiple_Assertions)
    - [Redundant Assertions](#Redundant_Assertions)
    - [Using the Wrong Assert](#Using_the_Wrong_Assert)
- [Superficial Test Coverage](#Superficial_Test_Coverage)
- [Overly Complex Tests](#Overly_Complex_Tests)
- [External Dependencies](#External_Dependencies)
- [Catching Unexpected Exceptions](#Catching_Unexpected_Exceptions)
- [Mixing Production and Test Code](#Mixing_Production_and_Test_Code)
- [No Unit Tests](#No_Unit_Tests)

### Misuse of Assertions

The basic building block of JUnit tests is the _assertion_ - a boolean expression which, if false, indicates an error. All JUnit test cases are subclassed from the `[Assert](http://www.junit.org/junit/javadoc/3.8.1/junit/framework/Assert.html)` class. It is expected that individual `test` methods will call one of the many different methods starting with `assert` to specify the intended result of the test. However, there are many different ways to misuse the intended purpose of these assertions, including the following:

- [Manual Assertions](#Manual_Assertions)
- [Multiple Assertions](#Multiple_Assertions)
- [Redundant Assertions](#Redundant_Assertions)
- [Using the Wrong Assert](#Using_the_Wrong_Assert)

#### Manual Assertions

##### Problem Description

Manual assertions describes the scenarios where the JUnit `assert` or `fail` methods are ignored in favour of other methods confirming program accuracy.

A common symptom seen in reviews was the unit test that contained many statements, but no assert of any kind. The developer was effectively using the unit testing code as a way enter the code under test in a debugger.

This practice misses out the main benefits of testing automation — the ability to continuously run the tests in the background without intervention. The [JUnit FAQ](http://junit.sourceforge.net/doc/faq/faq.htm) contains an item devoted to this issue:

> **Why not just use a debugger?**
> 
> Debuggers are commonly used to step through code and inspect that the variables along the way contain the expected values. But stepping through a program in a debugger is a manual process that requires tedious visual inspections. In essence, the debugging session is nothing more than a manual check of expected vs. actual results. Moreover, every time the program changes we must manually step back through the program in the debugger to ensure that nothing broke.

Another symptom of manual asserts are the cases where a large amount of text is written to `System.out` or to a log file. The output was then inspected manually to confirm that it contained the expected values.

**_Missing Assertions_** are a closely related problem to the _Manual Assertions_ anti-pattern. This is where the test method consists of an empty block. If you're lucky, there may be a lonely `TODO` comment, as in the following example:

```
public void testSomething() {
// TODO
}
```

There are some occasions where a test method may not have any assertions. For example, a test case excercising code that once threw an exception. When the code is fixed, the test case guards against regressions, yet it is not really asserting anything beyond the fact that no exceptions were thrown. As usual, common sense must be used when applying these rules.

##### Problem Solution

It is quite unusual to find test methods without asserts. Usually it is a simple matter to determine some expected values in the code under test, and to enter some assert statements to validate the expected values.

##### Other Resources

[PMD](http://pmd.sourceforge.net/) has a the rule [JUnitTestsShouldIncludeAssert](http://pmd.sourceforge.net/rules/junit.html#JUnitTestsShouldIncludeAssert) that will detect this particular anti-pattern.

#### Multiple Assertions

##### Problem Description

When a test method contains multiple assertion statements, it is an indication that the method is testing too much. The [JUnit FAQ](http://junit.sourceforge.net/doc/faq/faq.htm#tests_12) explains the issue as follows:

> JUnit is designed to work best with a number of small tests. It executes each test within a separate instance of the test class. It reports failure on each test. Shared setup code is most natural when sharing between tests. This is a design decision that permeates JUnit, and when you decide to report multiple failures per test, you begin to fight against JUnit. This is not recommended.

This problem can be avoided in the first place by a gentle application of RTFM. The [JUnit Documentation](http://junit.sourceforge.net/) contains quite a large number of hints, tips and best practices for writing JUnit test cases.

##### Problem Solution

From the FAQ - one test method, three assertions:

```
public class MyTestCase extends TestCase {
  public void testSomething() {
    // Set up for the test, manipulating local variables
    assertTrue(condition1);
    assertTrue(condition2);
    assertTrue(condition3);
  }
}
```

This can be refactored into three test methods, one assertion each:

```
public class MyTestCase extends TestCase {
  // Local variables become instance variables

  protected void setUp() {
    // Set up for the test, manipulating instance variables
  }

  public void testCondition1() {
    assertTrue(condition1);
  }

  public void testCondition2() {
    assertTrue(condition2);
  }

  public void testCondition3() {
    assertTrue(condition3);
  }
}
```

This particular aphorism in the FAQ has caused a large amount of discussion. The best advice is that it's not important to have precisely one assert per test; many experienced testers have multiple assertions in a block at the end of a test method. However, it is generally a bad idea to intermix code that exercises functionality with code that asserts expected results. This means that the cause of failures can be very hard to track down.

#### Redundant Assertions

##### Problem Description

Redundant Assertions are extra calls to an `assert` method where the condition being tested is a hard coded `true` value. Usually, this is intended to show the _correct_ code path through the test method, but in reality it clutters the method with excess verbiage. In cases where there are no other assertions, this anti-pattern degenerates into the [Manual Assertions](#Manual_Assertions) anti-pattern.

```
public void testSomething() {
  ...
  assertTrue("...", true);
}
```

##### Problem Solution

Remove any assert calls with hard coded condition statements from test methods.

##### Other Resources

[PMD](http://pmd.sourceforge.net/) has a the rule [UnnecessaryBooleanAssertion](http://pmd.sourceforge.net/rules/junit.html#UnnecessaryBooleanAssertion) that will detect this particular anti-pattern.

#### Using the Wrong Assert

##### Problem Description

There are a large number of different methods beginning with `assert` defined in the `Assert` class. Each of these methods has slightly different arguments and semantics about what they are asserting. However, many programmers seem to stick with a single assertion method: `assertTrue`, and then force the argument of this method into the required boolean expression. The following shows some irregular uses of `assertTrue`:

```
assertTrue("Objects must be the same", expected == actual);
assertTrue("Objects must be equal", expected.equals(actual));
assertTrue("Object must be null", actual == null);
assertTrue("Object must not be null", actual != null);
```

##### Problem Solution

Programmers should learn the appropriate usage of all the assert methods. The following gives an overview of what is available. The above code could be better written as:

```
assertSame("Objects must be the same", expected, actual);
assertEquals("Objects must be equal", expected, actual);
assertNull("Object must be null", actual);
assertNotNull("Object must not be null", actual);
```

##### Other Resources

The [Assert javadoc](http://www.junit.org/junit/javadoc/3.8.1/junit/framework/Assert.html) contains documentation for all the various assert methods.

[PMD](http://pmd.sourceforge.net/) has a number of rules that will detect this particular anti-pattern, namely:

- [UseAssertEqualsInsteadOfAssertTrue](http://pmd.sourceforge.net/rules/junit.html#UseAssertEqualsInsteadOfAssertTrue)
- [UseAssertSameInsteadOfAssertTrue](http://pmd.sourceforge.net/rules/junit.html#UseAssertSameInsteadOfAssertTrue)
- [UseAssertNullInsteadOfAssertTrue](http://pmd.sourceforge.net/rules/junit.html#UseAssertNullInsteadOfAssertTrue)

### Superficial Test Coverage

##### Problem Description

Developers new to unit testing (and some long-time testers) will often write some basic test code, without fully exercising the code that is supposedly under test. This can be manifested in a number of different ways:

Only Happy Path Tests

Only the _expected_ behaviour of the system is tested. Valid input data is fed into the system, and the results are checked against the expected correct answer. What is missing in this case is the exceptional conditions. For example:

- What happens when invalid data is used?
- Are the expected exceptions thrown?
- What are the boundaries for valid and invalid data?

Only Easy Tests

Similar to happy path tests, easy tests concentrate on things that are easy to verify, such as simple property values. However, the real logic of the unit under test is ignored. This is a symptom of an inexperienced developer trying to test complex code.

##### Problem Solution

A test coverage analysis tool can be very useful in determining how much functionality is actually being tested. In particular, they can highlight parts of code that are not being adequately tested. Refer to the [Open Source Code Coverage Tools](http://java-source.net/open-source/code-coverage) page for an overview of some of the available tools for Java.

Coverage tools can help to determine what extra tests need to be written. However, some code that needs to be tested cannot be easily reached from a unit test. This is a code smell that indicates opportunities for refactoring the code under test to improve testability.

### Overly Complex Tests

##### Problem Description

Unit tests, like production code, should be easily understandable. In general, a programmer must understand the intent of an individual test as fast as possible. If a test is so complicated that you can't immediately tell if it is correct or not, it makes it very difficult to determine if the cause of a test failure is bad production code or bad test code. Even worse, this allows the possibly of code that incorrectly passes a test.

##### Problem Solution

The solution to fixing overly complex test code is exactly the same any other code: refactoring to more understandable and encapsulated code. The [Refactoring](http://www.refactoring.com/) website covers all the best known techniques.

In general, you should refactor a test until it can be easily recognised to follow the general structure:

1. Set up
2. Declare the expected results
3. Excercise the unit under test
4. Get the action results
5. Assert that the actual results match the expected results

Alex Garrett's developerWorks article on [JUnit Anti-patterns](http://www-128.ibm.com/developerworks/opensource/library/os-junit/) contains a good example of refactoring overly complex tests.

### External Dependencies

##### Problem Description

There are a number of external dependencies that code may need to rely on to work correctly. For example:

- a specific time or date
- a third-party library jar
- a file
- a database
- a network connection
- a web container
- an application container
- randomness
- many other dependencies

Unit tests are at the lowest level of the testing hierarchy. They are intended to be simple pieces of code that exercise a small piece of production code (i.e. the "unit") in isolation. Unlike higher level testing, unit testing it should be aimed at verifying individual units. The more dependencies that a unit requires before it can be run makes it much harder to confirm the corresponding production code. If you have to configure a database, set up a remote server, start up a web container, etcetera, then the effort required to run the unit tests becomes prohibitive.

A good metric to determine the effectiveness of a set of unit tests is the time it takes for a new developer to get the unit tests running after checking out a clean workspace from version control.

The best possible time could be achieved by running these commands (or the equivalent checkout and invoke tests commands from within an IDE):

```
cvs co <modulename>
cd <modulename>
ant test
```

Obviously, this will only work if there are no external dependencies. The general rule for unit tests can be described as **Avoid External Dependencies**.

##### Problem Solution

The following techniques can be used to avoid external dependencies:

- Use Test Doubles such as Mock Objects to avoid third-party library dependencies
- Ensure all test data is packaged with the test code
- Avoid database calls in unit tests
- Where you really _need_ a database, consider using an in-memory database (such as [HSQLDB](http://hsqldb.sourceforge.net/) or an equivalent)
- Where you can't use mock objects for a container environment, [Cactus](http://jakarta.apache.org/cactus/) provides in-container unit testing extensions to JUnit

### Catching Unexpected Exceptions

##### Problem Description

This anti-pattern seems to catch out a lot of developers who are new to unit testing. When writing production code, developers are generally aware of the problems of uncaught exceptions, and so are relatively diligent about catching exceptions and logging the problem. In the case of unit tests, however, this pattern is completly wrong!

Consider the following test method:

```
public void testCalculation() {
    try {
        deepThought.calculate();
        assertEquals("Calculation wrong", 42, deepThought.getResult());
    }
    catch(CalculationException ex) {
        Log.error("Calculation caused exception", ex);
    }
}
```

This is wrong — the test succeeds even if an exception is thrown!

Although the failure can be detected by examining the logs, it completely sidesteps the JUnit infrastructure for reporting failures. In an automated testing environment such as CruiseControl, there is probably no-one who is actually reading the logs. This gives a false sense of security about the correctness of the code.

A more subtle problem is exhibited by the following example:

```
public void testCalculation() {
    try {
        deepThought.calculate();
        assertEquals("Calculation wrong", 42, deepThought.getResult());
    }
    catch(CalculationException ex) {
        fail("Calculation caused exception");
    }
}
```

Although this example correctly calls fail, and so JUnit will report that something went wrong, the actual stack trace of where the error occurred has been lost.

##### Problem Solution

The general rule for unit tests can be described as "**Don't catch unexpected exceptions**". Unless the test case is checking that an exception should be thrown, there is no reason to catch an exception. Exceptions should be passed up the call stack for JUnit to handle.

The refactored code looks like this:

```
public void testCalculation() throw CalculationException {
    deepThought.calculate();
    assertEquals("Calculation wrong", 42, deepThought.getResult());
}
```

Note that a throws clause has been added to the function definition, and the try/catch block has been removed. The code actually becomes clearer to read and understand.

If you actually need to confirm that an exception is thrown (and fail the test if the exception is not thrown), then the FAQ contains the best approach for this situation:

```
public void testIndexOutOfBoundsException() {
    try {
        ArrayList emptyList = new ArrayList();
        Object o = emptyList.get(0);
        fail("Exception was not thrown");
    }
    catch(IndexOutOfBoundsException ex) {
        // Success!
    }
}
```

### Mixing Production and Test Code

##### Problem Description

The FAQ has a number of suggestions regarding [where to put your test files](http://junit.sourceforge.net/doc/faq/faq.htm#organize_1). I would argue that two of the suggested layouts cause packaging problems:

Test classes in the same folder:

```
src/
com/
  xyz/
     SomeClass.java
     SomeClassTest.java
```

This structure makes it hard to differentiate test code from production code. A naming convention helps, but test code might have other helper classes that are not directly run as a test, but are used by the tests.

Test classes in a sub folder:

```
src/
com/
  xyz/
     SomeClass.java
     test/
         SomeClassTest.java
```

This structure makes it easier to work out which classes are devoted to tests, but now makes it harder to test protected and package private methods. This means that in order to test something, you may have to open up the access control of a method, breaking encapsulation.

Both of these solutions have the problem that you have to do extra work later on when making a software release. Unit testing code should not really be deployed to production environments. Therefore, when packaging the code ready for release, the testing code must be somehow excluded, which can be complex depending upon the naming conventions used.

##### Problem Solution

Test classes in the same package, but a parallel directory structure:

```
src/
com/
  xyz/
     SomeClass.java
test/
com/
  xyz/
     SomeClassTest.java
```

This solution avoids the problems mentioned above:

- There is a clear distinction between test code and production code
- Test code is in the same package as the production code under test, meaning that there are no issues regarding breaking encapsulation to test non-public methods.

### No Unit Tests

##### Problem Description

This is a really a development methodology failure masquerading as a unit testing anti-pattern. In this case, the problem isn't with the tests, but rather the lack of them. This is a big problem, as the bulk of existing projects were written without thought to testing. The [JUnit Test Infected](http://junit.sourceforge.net/doc/testinfected/testing.htm) article explains it best:

> Every programmer knows they should write tests for their code. Few do. The universal response to "Why not?" is "I'm in too much of a hurry." This quickly becomes a vicious cycle — the more pressure you feel, the fewer tests you write. The fewer tests you write, the less productive you are and the less stable your code becomes. The less productive and accurate you are, the more pressure you feel.

##### Problem Solution

Write the tests. Seriously.

Verification that code works correctly is not something that should be left to the end user. Unit testing is the first of a long series of steps to verify that the code works correctly.

Unit tests are a cornerstone of Test Driven Development (TDD), but every other development methodology can certainly benefit from spending the time writing code from the perspective of the calling system. The presence of tests helps provide assurance that any refactorings have not broken any functionality, and confirms that the API is usable. Studies have shown that use of unit tests can drastically improve software quality.

A good reference to understand the value of writing unit tests can be found on the JUnit web site: [Test Infected: Programmers Love Writing Tests](http://junit.sourceforge.net/doc/testinfected/testing.htm).

### Feedback

Is there a problem or mistake on this page? Do you have a JUnit Anti-pattern you'd like to share? Send me an email at joe@exubero.com.

### Acknowledgements

Thanks to all the people on the [JUnit mailing list](http://groups.yahoo.com/group/junit/), as well as those who have written to me directly, for all their helpful advice and suggestions.
