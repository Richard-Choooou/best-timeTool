/*
 * @Author: zhoupeng 
 * @Date: 2017-08-13 10:44:37 
 * @Last Modified by: zhoupeng
 * @Last Modified time: 2017-08-23 15:15:44
 */
let CalendarLib = function(options) {
	this.options = Object.assign({}, {
		paramType: 'string',
		firstColumnIsWeekday: true,
		dayCount: 42
	}, options)

	this.nowDate = null

	this.userSeletDate = null

	// this.userInputDate = null

	this.init()
}

CalendarLib.prototype = {
	init() {
		let date = this.getNowDate()

		this.userSeletDate = new Date(date)
		return this.getData(date)
	},

	getData(params) {
		this.setData(params)
		return this.__getFinalData(params)
	},

	setData(params) {
		// console.info(params)
		let date = this.__convertParameters(params)

		this.userSeletDate = date
		// console.info(this.userSeletDate)
		// return this.getData(this.userSeletDate)
	},

	getNowDate() {
		if (this.nowDate === null) this.nowDate = new Date()
		return this.nowDate
	},

	go(params) {
		let date = this.userSeletDate
		// console.log(new Date('2017-8-8'))
		// console.info('afterChange', date)
		if (typeof params !== 'number') {
			throw new Error('function go() need a number parameter')
		}
		if (params !== 0) {
			if ( params < 0 ) {
				if (date.getDate() > 28) {
					date = new Date(date.setDate(1))
				}
				this.userSeletDate = new Date(date.setMonth(date.getMonth() - 1))
				// console.log(this.userSeletDate)
				this.go(params + 1)
			} else {
				if (date.getDate() > 28) {
					date = new Date(date.setDate(1))
				}
				this.userSeletDate = new Date(date.setMonth(date.getMonth() + 1))
				// console.log(this.userSeletDate)
				this.go(params - 1) 
			}
		}
		// console.info('userSeletDate', this.userSeletDate)
		return this.__getFinalData(this.userSeletDate)
	},

	goLastMonth() {
		return this.go(-1)
	},

	goNextMonth() {
		return this.go(1)
	},

	goLastYear() {
		return this.go(-12)
	},

	goNextYear() {
		return this.go(12)
	},

	__convertParameters(date) {
		let _a = null

		if (this.options.paramType === 'object') {
			_a = new Date(`${date.year}-${date.month}-${date.day}`)
		} else if (this.options.paramType === 'string') {
			// console.log('123', date)
			// date = date.split('-').join('/')
			// if (typeof date === 'string') {
			// 	date = date.split('-').join('/')
			// 	// console.log('转换后', date)
			// }
			_a = new Date(date)
		}
		// this.userSeletDate = _a
		return _a
	},

	/**
	 * 获取传入的月份的上个月的天数
	 * @param {*} p1 
	 * @return {number} 上个月的天数
	 */
	__getLastMonthDayCount(p1) {
		let date = this.__convertParameters(p1)

		date = new Date(date.setDate(0))
		return date.getDate()

	},

	/**
	 * 获取传入的月份的天数
	 * @param {*} p1 
	 * @return {number} 传入月份的天数
	 */
	__getThisMonthDayCount(p1) {
		let date = this.__convertParameters(p1)

		date = new Date(date.setMonth(date.getMonth() + 1))
		date = new Date(date.setDate(0))
		return date.getDate()
	},

	/**
	 * 获取每个月的第一天为星期几
	 * @param {*} p1
	 * @return {number} 星期一到星期天 0 - 7, 7为星期天 
	 */
	__getMondayInMonth(p1) {
		let date = this.__convertParameters(p1),
			weekDay = null

		date = new Date(date.setDate(1))
		weekDay = date.getDay()
		if (this.options.firstColumnIsWeekday) {
			return weekDay // 0 - 6
		} else {
			return weekDay === 0 ? 7 : weekDay // 1-7
		}
	},

	__getThisYear(p1) {
		let date = this.__convertParameters(p1)

		return date.getFullYear()
	},

	__getThisMonth(p1) {
		let date = this.__convertParameters(p1)

		return date.getMonth() + 1
	},

	__getThisDay(p1) {
		let date = this.__convertParameters(p1)

		return date.getDate()
	},

	__getFinalData(params) {
		// console.log(params)
		let lastMonthDate = this.__getLastMonthDayCount(params),
			thisMonthDate = this.__getThisMonthDayCount(params),
			// nextMonthDate = this.__getNextMonthDayCount(params),
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
				today: `${this.nowDate.getFullYear()}/${this.nowDate.getMonth() + 1}/${this.nowDate.getDate()}`
				
			}

		if (!this.options.firstColumnIsWeekday) {
			fistWeekInMonth--
		}


		for (let i = fistWeekInMonth; i > 0; i--) {
			date.lastMonth.push(lastMonthDate - i + 1)
		}

		for (let i = 1; i <= thisMonthDate; i++) {
			date.thisMonth.push(i)
		}

		for (let i = 1; i <= dayCount - thisMonthDate - fistWeekInMonth; i++) {
			date.nextMonth.push(i)
		}

		return date
	}

}

export default CalendarLib