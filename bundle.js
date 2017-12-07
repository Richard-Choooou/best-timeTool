(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.BCalendar = factory());
}(this, (function () { 'use strict';

var version = "1.0.0";

// src/main.js

// import 'lib-flexible'
var main = function () {
    var a = 40;
    var b = 30;

    console.log(a, b);
    console.log(version);
};

return main;

})));
