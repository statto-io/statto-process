// --------------------------------------------------------------------------------------------------------------------
//
// tyn.io - (c) 2015 Tynio.
//
// License: MIT
//
// --------------------------------------------------------------------------------------------------------------------

// npm
var clone = require('clone')

// --------------------------------------------------------------------------------------------------------------------

function process(raw) {
  var stats = {
    counters : raw.counters,
    gauges   : raw.gauges,
    sets     : {},
    timers   : {},
    ts       : raw.ts,
    info     : raw.info,
  }

  // process some stats so the backends don't have to
  var timerKeys = Object.keys(raw.timers || {})
  timerKeys.forEach(function(timer) {
    // see if we have any data
    if ( raw.timers[timer].length === 0 ) {
      stats.timers[timer] = {}
    }

    // yes, got some timings, sort them first
    var times = raw.timers[timer].sort(function(a, b) { return a - b })

    // calculate some stats per timer
    var data = {
      sum   : times.reduce(function(a, b) { return a + b }),
      count : times.length,
      min   : times[0],
      max   : times[times.length-1],
    }
    data.mean = data.sum / data.count

    // find the median
    var middle = Math.floor(data.count/2)
    // take the middle value, or the average of the middle two
    var median = (data.count % 2) ? times[middle] : (times[middle-1] + times[middle])/2
    data.median = median

    // find the standard deviation
    var sumOfDiffs = 0
    for (var i = 0; i < data.count; i++) {
      sumOfDiffs += (times[i] - data.mean) * (times[i] - data.mean)
    }
    data.std = Math.sqrt(sumOfDiffs / data.count)

    stats.timers[timer] = data
  })

  var setsKeys = Object.keys(raw.sets || {})
  setsKeys.forEach(function(set) {
    var info = {
      // bottom : 0,
      // top    : 0,
      unique : 0,
      total  : 0,
    }

    // see how many keys this set has
    var keys = Object.keys(raw.sets[set])

    // get the uniques
    info.unique = keys.length

    // get the total
    info.total = keys.reduce(function(sum, key) {
      return sum + raw.sets[set][key]
    }, 0)

    stats.sets[set] = info
  })

  return stats
}


// --------------------------------------------------------------------------------------------------------------------

module.exports = process

// --------------------------------------------------------------------------------------------------------------------
