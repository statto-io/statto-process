# statto-merge #

Processes a set of raw statto data into something which provides more details and removes
anything unnecessary.

## Synopsis ##

Simple example of your statto server stats being processed immediately:

```js
var statto = require('statto')
var process = require('statto-process')

var stattoServer = statto()

stattoServer.on('stats', function(stats) {
  console.log('stats :', stats)

  var data = process(stats)
  console.log('data :', data)
})
```

Here's an example of the before and after stats.

```js
var stats = {
  counters : { a : 1, b : 2 },
  gauges : { blah : 54 },
  sets : { ip : { "1.2.3.4" : 2, "9.9.9.9" : 1 } },
  timers : { ms : [1, 2, 3] },
  info : { foo : "bar" },
  ts : "2015-03-27T12:26:45.000Z",
}

// =>

var data = {
  counters : { a : 1, b : 2 }, // unchanged
  gauges : { blah : 54 }, // unchanged
  sets : {
    ip : {
      unique : 2,
      total  : 3,
    },
  },
  timers : {
    ms : {
      sum : 6,
      count : 3,
      min : 1,
      max : 3,
      mean : 2,
      median : 2,
      std : 0.816496580927726,
    }
  },
  info : { foo : "bar" }, // unchanged
  ts : "2015-03-27T12:26:45.000Z", // unchanged
}
```


## ChangeLog ##

### 0.1.0 (2015-03-29) ###

* [NEW] Initial version

## Author ##

Written by [Andrew Chilton](http://chilts.org/) - [Twitter](https://twitter.com/andychilton).

Written for [Tynio](https://tyn.io/) so we can use a statsd-like daemon in a much easier way. Our use-case involves a
stats callback which writes each file to Rackspace's Cloud Files, which are aggregated in a separate process elsewhere.
ie. the stats daemon is not where the hard work is, it's pretty easy.

## License ##

The MIT License (MIT)

Copyright 2015 Tynio Ltd.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
documentation files (the "Software"), to deal in the Software without restriction, including without limitation the
rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit
persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the
Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

(Ends)
