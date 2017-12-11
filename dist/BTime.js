(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.BTime = factory());
}(this, (function () { 'use strict';

var version = "1.0.0";

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var CountDown = function () {

    /**
     * 
     * @param {Date} targetTime 倒计时的目标时间
     * @param {Date} nowTime  倒计时现在的时间
     * @param {Function} timing 倒计时中回调函数
     * @param {Function} timend 倒计时结束回调函数
     */
    function CountDown(targetTime, nowTime, timing, timend) {
        classCallCheck(this, CountDown);

        this.nowTime = new Date(nowTime).getTime();
        targetTime = new Date(targetTime).getTime();
        this.timeRemaining = +targetTime - +this.nowTime;
        this.interval = null;
        this.timing = timing;
        this.timend = timend;
        this.start();
    }

    createClass(CountDown, [{
        key: 'start',
        value: function start() {
            var numberCountTest = function numberCountTest(value) {
                var numberTest = /^\d{2}$/;
                if (numberTest.test(value)) {
                    return value;
                } else {
                    return '0' + value;
                }
            };
            var getDay = function getDay(millisecond) {
                return numberCountTest(Math.floor(millisecond / 1000 / 60 / 60 / 24));
            };
            var getHours = function getHours(millisecond) {
                return numberCountTest(Math.floor(millisecond / 1000 / 60 / 60 % 24));
            };
            var getMinute = function getMinute(millisecond) {
                return numberCountTest(Math.floor(millisecond / 1000 / 60 % 60));
            };
            var getSecond = function getSecond(millisecond) {
                return numberCountTest(Math.floor(millisecond / 1000 % 60));
            };

            this.interval = setInterval(function () {
                this.timeRemaining -= 500;
                if (this.timeRemaining <= 0) {
                    clearInterval(this.interval);
                    this.timing({
                        day: '00',
                        hours: '00',
                        minute: '00',
                        second: '00'
                    });
                    this.timend();
                } else {
                    this.timing({
                        day: getDay(this.timeRemaining),
                        hours: getHours(this.timeRemaining),
                        minute: getMinute(this.timeRemaining),
                        second: getSecond(this.timeRemaining)
                    });
                }
            }.bind(this), 500);
        }

        /**
         * 
         * @param {Boolean} runCallback run the time end callback，when parameter "runCallback" is true
         * 当runCallback 为true时，运行倒计时结束回调函数 
         */

    }, {
        key: 'stop',
        value: function stop(runCallback) {
            clearInterval(this.interval);
            if (runCallback) {
                this.timend();
            }
        }
    }]);
    return CountDown;
}();

// src/main.js

// import 'lib-flexible'
var modules = {
  CountDown: CountDown
};

var BTime = function BTime() {
  this.version = version;
};

for (var i in modules) {
  BTime.prototype[i] = modules[i];
}

var main = new BTime();

return main;

})));
