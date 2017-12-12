// src/main.js

import { version } from '../package.json'
import {CountDown} from './modules/count-down'
import {Calendar} from './modules/calendar'
// import 'lib-flexible'
const modules = {
  CountDown,
  Calendar
}

const BTime = function() {
    this.version = version
}



for(let i in modules) {
  BTime.prototype[i] = modules[i]
}
 
export default new BTime()