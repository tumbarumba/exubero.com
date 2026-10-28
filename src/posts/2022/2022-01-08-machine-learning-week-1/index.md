---
title: Machine Learning (Week 1)
date: 2022-01-08T23:59:38.000Z
permalink: /2022/01/08/machine-learning-week-1/
wordpressId: 5178
---

I’m studying [Machine Learning](https://www.coursera.org/learn/machine-learning) on Coursera. These are my revision notes for week 1.

## Introduction

### What is Machine Learning?

Machine learning grew out of work in artificial intelligence. It is a new capability for computers. Examples:

- Database mining.
    - Large datasets from growth of automation/web. e.g. web click data, medical records, biology, engineering
- Applications that can't be programmed by hand
    - e.g. Autonomous helicopter, handwriting recognition, most of Natural Language Processing (NLP), computer vision
- Self-customising programs
    - e.g. Amazon, Netflix product recommendations
- Understanding human learning (brain, real AI)

There isn't a well accepted definition of what is or isn't machine learning.

Some definitions....

- Arthur Samuel (1959). Machine learning is the field of study that gives computer the ability to learn without being explicitly programmed.
    - Arthur taught a program to play checkers. Even though Arthur wasn't a good checkers player, he got the computer to play thousands of games against itself, and noted board layouts lead to better (or worse) outcomes. He eventually taught the computer to play better than himself
- Tom Mitchell (1998). Well-posed Learning Problem: A computer program is said to learn from experience E with respect to some task T and some performance measure P, if its performance on T, as measured by P, improves with experience E.

Machine learning algorithms:

- Supervised learning
- Unsupervised learning

Others: reinforcement learning, recommender systems

### Supervised Learning

Supervised learning where "right answers" are given for given values, and these can be used to predict answers for new values. There are two types of problems that can be addressed:

- Regression problem - predict continuous valued output (e.g. house price for floor area).
- Classification problem - discrete valued output (0 or 1). e.g. given a tumour size, is it malignant (1) or benign (0)?

Many supervised learning problems have multiple (or even infinite) number of features which can be used to predict the result.

### Unsupervised Learning

Unsupervised learning is where there are no correct answers given initially, and the algorithm must find some structure in the data.

A clustering algorithm is an example of this. Some examples:

- Google News collects together various stories on the same event in a cluster
- Genetic data can be analysed to group together individuals with similar traits
- Organising computing clusters
- Social network analysis
- Market segmentation
- Astronomical data analysis

The cocktail party problem illustrates non-clustering unsupervised learning: two people in the same room, along with two microphones at different distances from each person. Each microphone will record different sounds of overlapping voices. The cocktail party algorithm can separate out the different voices or sounds. Surprisingly, it only takes one line of code to implement this algorithm:

```
[W,s,v] = svd((repmat(sum(x.*x,1),size(x,1),1).*x)*x');
```

This code works in the Octave coding environment. "svd" stands for single value decomposition, which is a linear algebra algorithm built into Octave. It would be much more complex to implement elsewhere. Many people prototype their algorithms in Octave, and then translate to C++ or other languages later.

## Model and Cost Function

### Model Representation

A dataset containing housing prices for Portland, Oregon. Given a size in feet2, can we predict the prices of the house.

Notation:

- **m** = number of training examples
- **x**'s = "input" variable / features
- **y**'s = "output" variable / "target" variable
- **(x,y)** = one single training example
- **(x(i),y(i))** = ith training example, where "i" just represents an index into the training data (not a value to the ith power)

A "**Training Set**" is fed into a "**Learning Algorithm**". It is a job of the learning algorithm to output a function, called "**h**" (for hypothesis). **h** takes **x** as an input, and outputs a predicted value for **y**. e.g. "x" = size of house, "y" = estimated value of house.

How do we represent "h"?

```
hθ(x) = θ0 + θ1x
```

This prediction shows that _y_ is a straight line (linear) function of _x_. _θ0_ and _θ1_ are called the parameters of the function.

This is called linear regression with one variable, also called univariate linear regression.

### Cost Function

How to choose the parameters? (_θ0_ and _θ1_)

The idea is to choose _θ0_ and _θ1_ so that _hθ(x)_ is close to _y_ for our training examples _(x,y)_.

Mathematically, we are trying to find the values of _(θ0,θ1)_ that minimise the value of:

```
 J(θ0,θ1) = (1/2m) . Σ (hθ(x(i)) - y)2.
```

_J(_θ0,θ1_)_ is the cost function, also called a squared error function. There are other error functions, but the squared error function works reasonably for most linear regression functions.

## Parameter Learning

### Gradient Descent

Have some function _J(_θ0,θ1_)_

Want min __θ0,θ1__ for _J(_θ0,θ1_)_

Outline:

- Start with some __θ0,θ1__
- Keep changing __θ0,θ1__ to reduce _J(_θ0,θ1_)_ until we hopefully end up at a minimum

Note that gradient descent actually works for any number of parameters (not just 2)

Algorithm:

```
repeat until convergence {
  θj := θj - α(δ/δθj)J(θ0,θ1) (for j=0 and j=1)
}
```

We must simultaneously update θ0 and θ1

α is the learning rate, and corresponds to how big the steps are taken.

(δ/δ__θj__)_J(_θ0,θ1_)_ is the partial derivative of the function _J(_θ0,θ1_)_, for j=0 and j=1.

### Gradient Descent Intuition

The derivative function is the slope of the cost function J.

If the cost function slopes up, the derivative will be positive. Since the algorithm subtracts the derivative value, the parameter will become smaller for the next iteration.

If the cost function slopes down, the derivative will be negative. Since the algorithm subtracts the negative derivative value, the parameter will become larger for the next iteration.

Eventually, the algorithm will converge to a value of the parameters where the slope is 0, which is a local minimum.

If α is too small, the learning rate will be very slow, and it could take a long time to converge

If α is too large, gradient descent can overshoot the minimum. It may fail to converge, or even diverge.

As we approach a local minimum, gradient descent will automatically take smaller steps. So, no need to decrease α over time, as the slope approaches zero as we get closer to the minimum.

### Gradient Descent for Linear Regression

We need the partial derivative of the cost function. These can be calculated as follows:

```
repeat until convergence {
  θ0 := θ0 - α . (1/m) . Σ (hθ(x(i)) - y(i))
  θ1 := θ1 - α . (1/m) . Σ (hθ(x(i)) - y(i)).x(i)
}
```

The shape of the linear cost function is always a convex function (a bow shaped surface), which means that there is always a single global minima.

"Batch" Gradient Descent: each step of gradient descent uses all the training examples.
