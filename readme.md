# Highland-pool

Pool for [Highland](http://highlandjs.org/) streams.

[![Build status](https://travis-ci.org/b123400/highland-pool.svg?branch=master)](https://travis-ci.org/b123400/highland-pool)

## Install

```
npm install highland-pool
```

## Usage

```javascript

var Pool = require('highland-pool');

//Make a new pool with maximum 2 streams running at the same time
var pool = Pool(2);

// Pass streams through the pool
var stream1 = pool(someStream());
var stream2 = pool(someStream());
var stream3 = pool(someStream());
var stream4 = pool(someStream());

// Use it as normal highland stream
stream1.pipe(...);
stream2.pipe(...);
stream3.pipe(...);
stream4.pipe(...);

// You can also use it like this:
someStream.through(pool).pipe(...)
```

## Why not .parallel()?

`.parallel()` can only be used on stream of streams, and pool can be used for any stream. You can pass the pools around, set maximum concurrency on streams in a more flexible way, e.g. pool for reading files from file system.
