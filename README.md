# best-canlender
---

calendar lib

EN/ [中文文档](https://github.com/Richard-Choooou/best-timeTool/tree/master/doc)

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![npm download][download-image]][download-url]


[npm-image]: http://img.shields.io/npm/v/best-calendar.svg?style=flat-square
[npm-url]: https://npmjs.org/package/best-calendar
[travis-image]: https://img.shields.io/travis/react-component/calendar.svg?style=flat-square
[travis-url]: https://travis-ci.org/react-component/calendar
[codecov-image]: https://img.shields.io/codecov/c/github/best-calendar/master.svg?style=flat-square
[codecov-url]: https://codecov.io/gh/react-component/calendar/branch/master
[gemnasium-image]: http://img.shields.io/gemnasium/react-component/calendar.svg?style=flat-square
[gemnasium-url]: https://gemnasium.com/react-component/calendar
[node-image]: https://img.shields.io/badge/node.js-%3E=_0.10-green.svg?style=flat-square
[node-url]: http://nodejs.org/download/
[download-image]: https://img.shields.io/npm/dm/best-calendar.svg?style=flat-square
[download-url]: https://npmjs.org/package/best-calendar

# Introduction
this is a calendar lib, have not DOM, you can customization style by yourself

# Installation
    $ npm i best-calendar --save

# usage
## import 

    //By commonjs
    const BTime = require('best-calendar')
    //By ES6 modules
    import BTime form 'best-calendar'
    //By DOM script
    <script src="./js/BTime.min.js"></script>

## use
    let calendar = new BTime.Calendar({
        // ...some options
    })

    calendar.on('dateChange', function(date) {
        console.log(date)

        /**
            data = {
                year:2017,
                month:12,
                day:1,
                lastMonth:[26, 27, 28, 29, 30],
                nextMonth:[1, 2, 3, 4, 5, 6],
                thisMonth: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,15, 16, 17, 18, 19, 20, 21, 22, 23, 24,   25, 26, 27, 28, 29, 30, 31],
                today:"2018/3/7"
            }
        */
    })

# Configuration
    let calendar = new BTime.Calendar({
        // ...some options
        firstColumnIsWeekend: true
    })
## firstColumnIsWeekend(# option)
    default: true
if this calendar first column date is weekend set it true else set it false

# API
## goLastMonth(# method)
    params: no params
    
go to the last month by current date then get last month calendar data and set current date to last month
## goNextMonth(# method)
    params: no params
go to the next month by current date then get next month calendar data and set current date to next month
## goLastYear(# method)
    params: no params
go to the last year by current date then get last year calendar data and set current date to last year
## goNextYear(# method)
    params: no params
go to the next year by current date then get next year calendar data and set current date to next year
## go(# method)
    params: one param
    arguments[0] type: Number

    examples: 
        calendar.go(-1)     // be equivalent to calendar.goLastMonth()
        calendar.go(-2)     // be equivalent to executed twice calendar.goLastMonth()
        calendar.go(-12)    // be equivalent to calendar.goLastYear()
        calendar.go(1)     // be equivalent to calendar.goNextMonth()
        calendar.go(12)    // be equivalent to calendar.goNextYear()

if this lib is useful, [star it](https://github.com/Richard-Choooou/best-timeTool),thanks










