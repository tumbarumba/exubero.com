---
title: "Machine Learning (Week\_2)"
date: 2022-01-09T14:09:10.000Z
wordpressId: 5197
---

I’m studying [Machine Learning](https://www.coursera.org/learn/machine-learning) on Coursera. These are my revision notes for week 2. This follows on from my [week 1](/2022/01/08/machine-learning-week-1/) notes.

## Multivariate Linear Regression

### Multiple Features

Previously, we were using a single variable (_x_) to predict a value (_y_). For example, using the floor area of a house to predict the price. This can be generalised to allow multiple variables (_x1, x2, x3, ..._) to contribute to the value prediction.

For example:

<figure>

| **Size (feet2)** | **Number of**   **bedrooms** | **Number of**   **floors** | **Age of home**   **(years)** | **Price ($1000)** |
| --- | --- | --- | --- | --- |
| _**x1**_ | _**x2**_ | _**x3**_ | _**x4**_ | _**y**_ |
| 2104 | 5 | 1 | 45 | 460 |
| 1416 | 3 | 2 | 40 | 232 |
| 1534 | 3 | 2 | 30 | 315 |
| 852 | 2 | 1 | 36 | 178 |
| ... | ... | ... | ... | ... |

<figcaption>

Multiple Features (Variables)

</figcaption>

</figure>

Notation:

- _**n**_ = number of features (n = 4 in this example)
- _**x(i)**_ = input (features) of _ith_ training example. This can be represented as a vector.
- **_xj(i)_** = value of feature _j_ in _ith_ training example

Previously, the hypothesis took the form:

```
hθ(x) = θ0 + θ1x
```

Adding more features, this can be extended as follows:

```
hθ(x) = θ0 + θ1x1 + θ2x2 + ... + θnxn
```

For convenience of notation, define _x0 = 1_. This allows us to use matrix notation to write in a compact form:

```
    [x0 ]         [θ0 ]
    [x1 ]         [θ1 ]
X = [x2 ]     θ = [θ2 ]  
    [...]         [...]
    [xn ]         [θn ]

hθ(x) = θ0x0 + θ1x1 + θ2x2 + ... + θnxn
      = θTX
```

This is called multivariate linear regression.

### Gradient Descent for Multiple Variables

Taking into account the multiple features, the new algorithm for (n >= 1) to determine the minimum is:

```
repeat until convergence {
  θj := θj - α . (1/m) . Σ (hθ(x(i)) - y(i)).xj(i)
}

(simultaneously update θj for j = 0, ..., n)
```

### Feature Scaling

Idea: make sure features are on a similar scale.

In practice, get every feature into approximately a _\-1 <= xi <= 1_ range.

If the features have very different scales, the gradient descent algorithm can take a very long time to converge on the minimum.

Mean normalisation involves subtracting the average value for an input variable from the values for that input variable resulting in a new average value for the input variable of just zero. To implement both of these techniques, adjust your input values as shown in this formula:

```
xi := (xi - μi) / si

where:
  μi is the average of all values for feature (i)
  si is the range of values (max - min), or the standard dev.
```

### Learning Rate

Automatic convergence test: declare convergence if _J(θ)_ decreases by less than _ε_ in one iteration. _ε_ can be an arbitrary small value (e.g. 0.001). A more reliable way can be to look at the output of the cost function, and verify that it conversges on a value. If the plot shows that the cost function value is increasing, then a smaller value of _α_ should be chosen.

Summary:

- If _α_ is too small: slow convergence
- If _α_ is too large: _J(θ)_ may not decrease on every iteration; may not converge

### Features and Polynomial Regression

## Computing Parameters Analytically
