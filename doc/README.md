# best-canlender
---

calendar lib


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

# 说明
一个可以自己定制样式的日历库，没有dom操作， 只封装了日历的算法，得到需要的日历数据

# 安装
    $ npm i best-calendar --save

# 使用方法
## 导入

    //By commonjs
    const BTime = require('best-calendar')
    //By ES6 modules
    import BTime form 'best-calendar'
    //By DOM script
    <script src="./js/BTime.min.js"></script>

## 使用
    let calendar = new BTime.Calendar({
        // ...some options
    })

    calendar.on('dateChange', function(date) {
        console.log(date)

        /**
            data = {
                currentYear:2017,
                currentMonth:12,
                currentDay:1,
                lastMonth:[26, 27, 28, 29, 30],
                nextMonth:[1, 2, 3, 4, 5, 6],
                thisMonth: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,15, 16, 17, 18, 19, 20, 21, 22, 23, 24,   25, 26, 27, 28, 29, 30, 31],
                today:"2018/3/7"
            }
        */
    })

# 属性配置
    let calendar = new BTime.Calendar({
        // ...some options
        firstColumnIsWeekend: true
    })
## firstColumnIsWeekend(# option)
    default: true
如果日历的第一列是周末，那么设置firstColumnIsWeekend 为 true，否则 设置成false

# API
## goLastMonth(# method)
    params: no params //没有参数
    
根据日历当前日期获取上一个月的日期数据，并且将日历当前日期设置为上一个月的日期
## goNextMonth(# method)
    params: no params //没有参数
根据日历当前日期获取下一个月的日期数据，并且将日历当前日期设置为下一个月的日期
## goLastYear(# method)
    params: no params //没有参数
根据日历当前日期获取上一年的日期数据，并且将日历当前日期设置为上一年的日期
## goNextYear(# method)
    params: no params //没有参数
根据日历当前日期获取下一年的日期数据，并且将日历当前日期设置为下一年的日期
## go(# method)
    params: one param //一个参数
    arguments[0] type: Number // 类型为数字

    examples: 
        calendar.go(-1)     // 使用效果等同于 calendar.goLastMonth()
        calendar.go(-2)     // 使用效果等用于 执行两次 calendar.goLastMonth()
        calendar.go(-12)    // 使用效果等同于 calendar.goLastYear()
        calendar.go(1)      // 使用效果等同于 calendar.goNextMonth()
        calendar.go(12)     // 使用效果等用于 执行两次 calendar.goNextYear()
## setCurrentDate(# method)
    params: one param
    arguments[0] type: [Object Date] or [Object String] //类型为日期对象 或者 字符串

    examples: 
        calendar.setCurrentDate(new Date('2018/3/8')) 
        calendar.setCurrentDate('2018/3/8')             // 必须以'/'分隔

## on(# method)
    params: two params
        arguments[0] type: String      "只有dateChange事件"
        arguments[1] type: Function    当datechange事件触发时，将执行这个回调函数

    执行方法 'setCurrentDate' 'go' 'goNextYear' 'goLastYear' 'goNextMonth' 'goLastMonth' 会触发这个事件

    example:
        calendar.on('dateChange', function(date) {
            console.log(date)

            /**
                data = {
                    currentYear:2017,
                    currentMonth:12,
                    currentDay:1,
                    lastMonth:[26, 27, 28, 29, 30],
                    nextMonth:[1, 2, 3, 4, 5, 6],
                    thisMonth: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,15, 16, 17, 18, 19, 20, 21, 22, 23, 24,   25, 26, 27, 28, 29, 30, 31],
                    today:"2018/3/7"
                }
            */
        })

如果觉得好用，请给个star,您的支持，是我的动力










