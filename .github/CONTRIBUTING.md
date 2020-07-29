# Contribution Guidelines

This file is intended for you to know what code styles we use, and some conventions we primarily adapt in Clarity. You are required to abide to these guidelines otherwise your commits
will not be accepted. No buts.


## Definitions 

Definitions must short and concise, and present it's intended meaning. While we allow shorthands like `i` for iterators, using definitions like `x = y;` or `y= 0;` is not allowed.

C-style definitions are allowed.

## Comments

Commenting code is required but as much as possible, your code must be self-explanatory, if it cannot be self-explanatory, this is where you use a lot of comments to explain the code.

You don't need to explain the entire code verbatim, just lay out what it does and the rest would adapt and know. 

## Tabs vs. Spaces

Strictly use spaces, we adhere to double spacing.

## Adding dependencies

If you're going to end up adding something like `is-odd` or `bluebird`, then don't bother. Use Native Node.js APIs when possible, only use NPM libraries if the task is too complex to be coded project-wise.

## Runtime type-checking

We validate input using `joi`. Make sure if your code accepts input from the user at REST, **validate** the POST object. It's a security risk if we don't validate inputs.

## ESLint

Make sure some of your code passes ESLint rules - if you think something is supposed to pass but not, then raise it as a issue. A lot of ESLint warnings and error here are valid TypeScript and we're working with ESLint to fix that.