(() => { // webpackBootstrap
	"use strict";
	var __webpack_modules__ = {
      // __unused_webpack_module 干嘛用的
      "./mod.js": (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
        console.log(__webpack_exports__, '__webpack_exports__')

        __webpack_require__.r(__webpack_exports__);
        
        __webpack_require__.d(__webpack_exports__, {
          "a": () => (a),
          "b": () => (b)
        });
        
        const a = () => {
          const ele = document.createElement('div');
          ele.style.border = '1px solid red';
          ele.innerHTML = '<div>1111111</div>';
          document.body.appendChild(ele);
        }
        const b = () => {console.log(1323432);}
      }
	};
/************************************************************************/
	// The module cache
	var __webpack_module_cache__ = {};
	
	// The require function
	function __webpack_require__(moduleId) {
    console.log(moduleId, 'moduleId');
		// Check if module is in cache
		var cachedModule = __webpack_module_cache__[moduleId];
    // console.log(cachedModule, 'cachedModule');
		if (cachedModule !== undefined) {
			return cachedModule.exports;
		}
		// Create a new module (and put it into the cache)
		var module = __webpack_module_cache__[moduleId] = {
			// no module.id needed
			// no module.loaded needed
			exports: {}
		};
	
		// Execute the module function
		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
	
		// Return the exports of the module
    console.log(module.exports, 111111113)

		return module.exports;
	}
	
/************************************************************************/
	/* webpack/runtime/define property getters */
	(() => {
		// define getter functions for harmony exports
    // 对两个对象进行比较，如果definition中有的值exports没有，那么就给exports加上
		__webpack_require__.d = (exports, definition) => {
      console.log(definition, 1111112)
			for(var key in definition) {
				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
          console.log(key, 1111112)
					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
				}
			}
		};
	})();
	
	/* webpack/runtime/hasOwnProperty shorthand */
	(() => {
		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
	})();
	
	/* webpack/runtime/make namespace object */
	(() => {
		// define __esModule on exports
		__webpack_require__.r = (exports) => {
			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
			}
			Object.defineProperty(exports, '__esModule', { value: true });
		};
	})();
	
/************************************************************************/
// 这个干嘛用的，貌似没发挥作用
  var __webpack_exports__ = {};

  // This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
  (() => {
  /*!*******************!*\
    !*** ./index1.js ***!
    \*******************/
    __webpack_require__.r(__webpack_exports__);
    console.log(__webpack_exports__, '__webpack_exports__')
    var _mod__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mod */ "./mod.js");


    (
      0,_mod__WEBPACK_IMPORTED_MODULE_0__.a
    )();
  })();

})()
;
//# sourceMappingURL=1.js.map