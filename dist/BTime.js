(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.BTime = factory());
}(this, (function () { 'use strict';

var version = "1.0.0";

/*
 * @Author: zhoupeng 
 * @Date: 2017-09-01 10:46:33 
 * @Last Modified by: zhoupeng
 * @Last Modified time: 2017-09-06 16:38:24
 */
var injectObserver = function (Constructor) {
	Constructor.prototype.on = function (event, callback) {
		if (!event || !callback) {
			throw new Error('missing parameter, function "on" need two parameters, one of them is event, another is callback function');
		}
		this.events = this.events || [];
		this.events.push({
			event: event,
			funcName: callback.name || 'anonymous',
			callback: callback
		});
	};

	Constructor.prototype.off = function (event, func) {
		if (!this.events) {
			console.error(Constructor.name + ' have no event');
			return;
		}

		if (!func.name) {
			console.error('can not remove a anonymous function');
			return;
		}

		for (var i = 0, j = this.events; i < j.length; i++) {
			if (j[i].funcName === func.name && j[i].event === event) {
				j.splice(i, 1);
				return;
			}
		}

		console.error(Constructor.name + '\'s ' + event + ' event have no ' + func.name + ' function');
	};

	Constructor.prototype.dispatchEvent = function (eventName) {
		for (var _len = arguments.length, params = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
			params[_key - 1] = arguments[_key];
		}

		this.events = this.events || [];
		this.events.forEach(function (value) {
			if (value.event === eventName) {
				value.callback.apply(value, params);
			}
		});
	};
};

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









var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

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
        // this.timing = timing
        // this.timend = timend
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
                    this.dispatchEvent('timing', {
                        day: '00',
                        hours: '00',
                        minute: '00',
                        second: '00'
                    });
                    this.dispatchEvent('timend');
                } else {
                    this.dispatchEvent('timing', {
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
                this.dispatchEvent('timend');
            }
        }
    }]);
    return CountDown;
}();

injectObserver(CountDown);

var Core = function () {
	function Core() {
		classCallCheck(this, Core);

		this.nowDate = new Date();
	}

	/**
 * 获取传入的月份的上个月的天数
 * @param {*} p1 
 * @return {number} 上个月的天数
 */


	createClass(Core, [{
		key: "__getLastMonthDayCount",
		value: function __getLastMonthDayCount(p1) {
			var date = new Date(p1);

			date = new Date(date.setDate(0));
			return date.getDate();
		}

		/**
  * 获取传入的月份的天数
  * @param {*} p1 
  * @return {number} 传入月份的天数
  */

	}, {
		key: "__getThisMonthDayCount",
		value: function __getThisMonthDayCount(p1) {
			var date = new Date(p1);

			date = new Date(date.setMonth(date.getMonth() + 1));
			date = new Date(date.setDate(0));
			return date.getDate();
		}

		/**
  * 获取每个月的第一天为星期几
  * @param {*} p1
  * @return {number} 星期一到星期天 0 - 7, 7为星期天 
  */

	}, {
		key: "__getMondayInMonth",
		value: function __getMondayInMonth(p1) {
			var date = new Date(p1),
			    weekDay = null;

			date = new Date(date.setDate(1));
			weekDay = date.getDay();
			if (this.options.firstColumnIsWeekday) {
				return weekDay; // 0 - 6
			} else {
				return weekDay === 0 ? 7 : weekDay; // 1-7
			}
		}
		/**
   * 
   * @param {*} p1
   * 获取传入date的year
   */

	}, {
		key: "__getThisYear",
		value: function __getThisYear(p1) {
			var date = new Date(p1);

			return date.getFullYear();
		}

		/**
   * 
   * @param {*} p1
   * 获取传入date的month
   */

	}, {
		key: "__getThisMonth",
		value: function __getThisMonth(p1) {
			var date = new Date(p1);

			return date.getMonth() + 1;
		}

		/**
   * 
   * @param {*} p1
   * 获取传入date的day 
   */

	}, {
		key: "__getThisDay",
		value: function __getThisDay(p1) {
			var date = new Date(p1);

			return date.getDate();
		}
	}]);
	return Core;
}();

var Calendar = function (_Core) {
	inherits(Calendar, _Core);

	function Calendar(options) {
		classCallCheck(this, Calendar);

		var _this = possibleConstructorReturn(this, (Calendar.__proto__ || Object.getPrototypeOf(Calendar)).call(this));

		_this.options = Object.assign({}, {
			firstColumnIsWeekday: true,
			dayCount: 42,
			startDate: _this.nowDate
		}, options);
		_this.userSeletDate = _this.options.startDate;
		setTimeout(function () {
			_this.dispatchEvent('dateChange', _this.go(0));
		}, 0);
		return _this;
	}

	createClass(Calendar, [{
		key: 'go',
		value: function go(params) {
			var date = this.userSeletDate;
			if (typeof params !== 'number') {
				throw new Error('function go() need a number parameter');
			}
			if (params !== 0) {
				if (params < 0) {
					if (date.getDate() > 28) {
						date = new Date(date.setDate(1));
					}
					this.userSeletDate = new Date(date.setMonth(date.getMonth() - 1));
					// console.log(this.userSeletDate)
					this.go(params + 1);
				} else {
					if (date.getDate() > 28) {
						date = new Date(date.setDate(1));
					}
					this.userSeletDate = new Date(date.setMonth(date.getMonth() + 1));
					// console.log(this.userSeletDate)
					this.go(params - 1);
				}
			}
			return this.__getFinalData(this.userSeletDate);
		}
	}, {
		key: 'getThisDate',
		value: function getThisDate(params) {
			var _date = new Date(params);
			if (_date) {
				this.userSeletDate = _date;
				this.dispatchEvent('dateChange', this.__getFinalData(_date));
			} else {
				throw new Error('[BTime: getThisDate]: parameter error');
			}
		}
	}, {
		key: 'goLastMonth',
		value: function goLastMonth() {
			this.dispatchEvent('dateChange', this.go(-1));
		}
	}, {
		key: 'goNextMonth',
		value: function goNextMonth() {
			this.dispatchEvent('dateChange', this.go(1));
		}
	}, {
		key: 'goLastYear',
		value: function goLastYear() {
			this.dispatchEvent('dateChange', this.go(-12));
		}
	}, {
		key: 'goNextYear',
		value: function goNextYear() {
			this.dispatchEvent('dateChange', this.go(12));
		}
	}, {
		key: '__getFinalData',
		value: function __getFinalData(params) {
			var lastMonthDate = this.__getLastMonthDayCount(params),
			    thisMonthDate = this.__getThisMonthDayCount(params),
			    fistWeekInMonth = this.__getMondayInMonth(params),
			    dayCount = this.options.dayCount,
			    year = this.__getThisYear(params),
			    month = this.__getThisMonth(params),
			    day = this.__getThisDay(params),
			    date = {
				lastMonth: [],
				thisMonth: [],
				nextMonth: [],
				year: year,
				month: month,
				day: day,
				today: this.nowDate.getFullYear() + '/' + (this.nowDate.getMonth() + 1) + '/' + this.nowDate.getDate()
			};

			if (!this.options.firstColumnIsWeekday) {
				fistWeekInMonth--;
			}

			for (var i = fistWeekInMonth; i > 0; i--) {
				date.lastMonth.push(lastMonthDate - i + 1);
			}

			for (var _i = 1; _i <= thisMonthDate; _i++) {
				date.thisMonth.push(_i);
			}

			for (var _i2 = 1; _i2 <= dayCount - thisMonthDate - fistWeekInMonth; _i2++) {
				date.nextMonth.push(_i2);
			}

			return date;
		}
	}]);
	return Calendar;
}(Core);

injectObserver(Calendar);

// src/main.js

// import 'lib-flexible'
var modules = {
  CountDown: CountDown,
  Calendar: Calendar
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
