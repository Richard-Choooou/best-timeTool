export class CountDown {
    
    /**
     * 
     * @param {Date} targetTime 倒计时的目标时间
     * @param {Date} nowTime  倒计时现在的时间
     * @param {Function} timing 倒计时中回调函数
     * @param {Function} timend 倒计时结束回调函数
     */
    constructor(targetTime, nowTime, timing, timend) {
        this.nowTime = new Date(nowTime).getTime()
        targetTime = new Date(targetTime).getTime()
        this.timeRemaining = (+targetTime) - (+this.nowTime)
        this.interval = null
        this.timing = timing
        this.timend = timend
        this.start()
    }
 
    start() {
        var numberCountTest = function (value) {
            var numberTest = /^\d{2}$/
            if (numberTest.test(value)) {
                return value
            } else {
                return '0' + value
            }
        }
        var getDay = function (millisecond) {
            return numberCountTest(Math.floor(millisecond / 1000 / 60 / 60 / 24))
        }
        var getHours = function (millisecond) {
            return numberCountTest(Math.floor(millisecond / 1000 / 60 / 60 % 24))
        }
        var getMinute = function (millisecond) {
            return numberCountTest(Math.floor(millisecond / 1000 / 60 % 60))
        }
        var getSecond = function (millisecond) {
            return numberCountTest(Math.floor(millisecond / 1000 % 60))
        }

        this.interval = setInterval(function() {
            this.timeRemaining -= 500
            if(this.timeRemaining <= 0) {
                clearInterval(this.interval)
                this.timing({
                    day: '00',
                    hours: '00',
                    minute: '00',
                    second: '00'
                }) 
                this.timend()
            }else {
                this.timing({
                    day: getDay(this.timeRemaining),
                    hours: getHours(this.timeRemaining),
                    minute: getMinute(this.timeRemaining),
                    second: getSecond(this.timeRemaining)
                })
            }
            
        }.bind(this), 500)
    }

    /**
     * 
     * @param {Boolean} runCallback run the time end callback，when parameter "runCallback" is true
     * 当runCallback 为true时，运行倒计时结束回调函数 
     */
    stop(runCallback) {
        clearInterval(this.interval)
        if(runCallback) {
            this.timend()
        }
    }
}