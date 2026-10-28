---
title: Converting to Kotlin
date: 2017-11-19T16:45:23.000Z
permalink: /2017/11/19/converting-to-kotlin/
categories:
  - general
wordpressId: 4991
---

![kotlin\_250x250](/2017/11/19/converting-to-kotlin/images/kotlin_250x250.png)After dipping my toe in the water a number of times, I've finally taken the plunge. Over the last couple of weeks I've been migrating a private project from Java to Kotlin. This is a report of how it's been going...

Firstly, my main interest in Kotlin was the cleaner language design, the clear Java migration path and good interoperability with the JVM ecosystem. What do I mean by "cleaner language"? The my favourite example are the [Kotlin data classes](https://kotlinlang.org/docs/reference/data-classes.html). In my code base, I have a large number of classes deriving from "Event". Each one of these event classes has a number of attributes, with corresponding getter functions, plus an equals, hashcode and toString function. Here's one of my classes:

```
public class LearnerAddedToOrganisation implements Event {

    private final LearnerId learnerId;
    private final OrganisationId organisationId;
    private final UserId agentId;
    private final Instant eventTime;

    public LearnerAddedToOrganisation(LearnerId learnerId, OrganisationId organisationId, UserId agentId, Instant eventTime) {
        this.learnerId = requireNonNull(learnerId);
        this.organisationId = requireNonNull(organisationId);
        this.agentId = requireNonNull(agentId);
        this.eventTime = requireNonNull(eventTime);
    }

    @Override
    public LearnerId getId() {
        return learnerId;
    }

    public LearnerId getLearnerId() {
        return learnerId;
    }

    @Override
    public UserId getAgentId() {
        return agentId;
    }

    @Override
    public Instant eventTime() {
        return eventTime;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof LearnerAddedToOrganisation)) {
            return false;
        }
        LearnerAddedToOrganisation that = (LearnerAddedToOrganisation) o;
        return Objects.equals(learnerId, that.learnerId) &&
                Objects.equals(organisationId, that.organisationId) &&
                Objects.equals(agentId, that.agentId) &&
                Objects.equals(eventTime, that.eventTime);
    }

    @Override
    public int hashCode() {
        return Objects.hash(learnerId, organisationId, agentId, eventTime);
    }

    @Override
    public String toString() {
        return String.format("LearnerAddedToOrganisation{learnerId=%s,organisationId=%s,agentId=%s,eventTime=%s}",
                learnerId, organisationId, agentId, eventId);
    }
}
```

Here's the code for the same class after I converted it to Kotlin:

```
data class LearnerAddedToOrganisation(
        override val id:                LearnerId,
                 val organisationId:    OrganisationId,
        override val agentId:           UserId,
        override val eventTime:         Instant) : Event {
    val learnerId: LearnerId
        get() = id
}
```

This Kotlin code has exactly the same functionality as the Java equivalent, plus it also has a [copy function](https://kotlinlang.org/docs/reference/data-classes.html#copying) as well.

This conciseness can lead to some large reductions in code size. The module I converted to Kotlin originally had ~8,000 lines of Java code. After conversion, it contained ~4,800 lines of Kotlin, which corresponds to a 40% reduction in code size. This is a significant improvement! Consider that programmer output in terms of lines of code tends to be relatively stable, independent of language. Switching to a language where the same features can be implemented in fewer lines of code means more features can be built.

The more I use Kotlin, the more I find I enjoy using it. I'm definitely going to use it more in the future.
