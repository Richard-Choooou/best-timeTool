class Core {
    constructor() {
        this.nowDate = new Date()
    }

    /**
	 * 获取传入的月份的上个月的天数
	 * @param {*} p1 
	 * @return {number} 上个月的天数
	 */
	__getLastMonthDayCount(p1) {
		let date = new Date(p1)

		date = new Date(date.setDate(0))
		return date.getDate()

    }
    
    /**
	 * 获取传入的月份的天数
	 * @param {*} p1 
	 * @return {number} 传入月份的天数
	 */
	__getThisMonthDayCount(p1) {
		let date = new Date(p1)

		date = new Date(date.setMonth(date.getMonth() + 1))
		date = new Date(date.setDate(0))
		return date.getDate()
    }
    
    /**
	 * 获取每个月的第一天为星期几
	 * @param {*} p1
	 * @return {number} 星期一到星期天 0 - 7, 7为星期天 
	 */
	__getMondayInMonth(p1) {
		let date = new Date(p1),
			weekDay = null

		date = new Date(date.setDate(1))
		weekDay = date.getDay()
		if (this.options.firstColumnIsWeekday) {
			return weekDay // 0 - 6
		} else {
			return weekDay === 0 ? 7 : weekDay // 1-7
		}
    }
    /**
     * 
     * @param {*} p1
     * 获取传入date的year
     */
    __getThisYear(p1) {
		let date = new Date(p1)

		return date.getFullYear()
	}

    /**
     * 
     * @param {*} p1
     * 获取传入date的month
     */    
	__getThisMonth(p1) {
		let date = new Date(p1)

		return date.getMonth() + 1
	}

    /**
     * 
     * @param {*} p1
     * 获取传入date的day 
     */
	__getThisDay(p1) {
		let date = new Date(p1)

		return date.getDate()
	}
}

export {Core}