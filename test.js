// --------------------------------------------------------------------------------------------------------------------
//
// tyn.io - (c) 2015 Tynio.
//
// License: MIT
//
// --------------------------------------------------------------------------------------------------------------------

// npm
var test = require('tape')

// local
var process = require('./')

// --------------------------------------------------------------------------------------------------------------------

test('Check a blank process', function(t) {
  t.plan(1)

  var info = { processd : 2 }
  var s1 = {
    counters: {},
    gauges: {},
    sets: {},
    timers: {},
    info: { processd : 2 },
    ts: "2015-03-27T12:26:45.000Z",
  }
  var s2 = {
    counters: {},
    gauges: {},
    sets: {},
    timers: {},
    info: { processd : 2 },
    ts: "2015-03-27T12:26:45.000Z",
  }
  t.deepEqual(process(s1), s2, 'The processing is correct')

  t.end()
})

// --------------------------------------------------------------------------------------------------------------------

test('Check a simple process', function(t) {
  t.plan(1)

  var info = { processd : 2 }
  var s1 = {
    counters : { a : 1, b : 2 },
    gauges : { blah : 54 },
    sets : { ip : { "1.2.3.4" : 2, "9.9.9.9" : 1 } },
    timers : { ms : [1, 2, 3] },
    info : { foo : "bar" },
    ts : "2015-03-27T12:26:45.000Z",
  }
  var s2 = {
    counters : { a : 1, b : 2 },
    gauges : { blah : 54 },
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
    info : { foo : "bar" },
    ts : "2015-03-27T12:26:45.000Z",
  }
  t.deepEqual(process(s1), s2, 'The processing is correct')

  t.end()
})

// --------------------------------------------------------------------------------------------------------------------

// var stats1 = {
//   "counters":{
//     "statto.packets.total":2,
//     "statto.msgs.total":3,
//     "statto.msgs.good":5,
//     "statto.msgs.bad":0,
//     "hit.site.chilts":5
//   },
//   "gauges":{"account.closed":1,"account.total":100},
//   "timers":{
//     "req":[117]
//   },
//   "sets":{
//     "ip":{"1.2.3.4":2,"9.9.9.9":5},
//   },
//   "info":{"pid":21983,"host":"tiger"},
//   "ts":"2015-03-27T12:26:45.000Z",
// }

// var stats2 = {
//   "counters":{
//     "statto.packets.total":6,
//     "statto.msgs.total":7,
//     "statto.msgs.good":8,
//     "statto.msgs.bad":1,
//     "hit.site.blah":4,
//     "hit.site.chilts":5
//   },
//   "gauges":{"account.closed":2,"account.total":101},
//   "timers":{
//     "req":[117,85,91,94,101]
//   },
//   "sets":{
//     "ip":{"1.2.3.4":3,"5.6.7.8":4,"9.9.9.9":5},
//   },
//   "info":{"processd":2},
//   "ts":"2015-03-27T12:28:45.000Z",
// }

// test('Check the process', function(t) {
//   t.plan(1)

//   var info = { processd : 2}
//   t.deepEqual(process(stats1), stats2, 'The processing is correct')

//   t.end()
// })

// --------------------------------------------------------------------------------------------------------------------
