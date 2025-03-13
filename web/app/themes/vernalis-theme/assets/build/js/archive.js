"use strict";
(self["webpackChunkseizedixneuf_theme"] = self["webpackChunkseizedixneuf_theme"] || []).push([["/build/js/archive"],{

/***/ "./src/js/archive.js":
/*!***************************!*\
  !*** ./src/js/archive.js ***!
  \***************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common */ "./src/js/common.js");

jQuery(function () {
  var lazyLoad = new LazyLoad();
  (0,_common__WEBPACK_IMPORTED_MODULE_0__["default"])();
});

/***/ }),

/***/ "./src/js/common.js":
/*!**************************!*\
  !*** ./src/js/common.js ***!
  \**************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ init; }
/* harmony export */ });
/* harmony import */ var tippy_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tippy.js */ "./node_modules/.pnpm/tippy.js@6.3.7/node_modules/tippy.js/dist/tippy.esm.js");
/* harmony import */ var scrollreveal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! scrollreveal */ "./node_modules/.pnpm/scrollreveal@4.0.9/node_modules/scrollreveal/dist/scrollreveal.es.js");

// scrollreveal

function init() {
  (0,tippy_js__WEBPACK_IMPORTED_MODULE_1__["default"])("[data-tippy]", {
    placement: "bottom",
    onShow: function onShow(instance) {
      instance.popper.hidden = instance.reference.dataset.tippy ? false : true;
      instance.setContent(instance.reference.dataset.tippy);
    }
  });
  jQuery("#js-menu-open, #js-menu-close, #js-menu-overlay").on("click", function () {
    jQuery("#js-menu-overlay").toggleClass("invisible");
    jQuery("#js-menu-overlay").toggleClass("bg-opacity-70");
    jQuery("#js-menu-overlay").toggleClass("opacity-0");
    jQuery("#js-menu").toggleClass("-left-full");
    jQuery("#js-menu").toggleClass("left-0");
  });
  jQuery(".js-submenu").on("click", function () {
    console.log(jQuery(this));
    jQuery(this).parent().siblings("ul").slideToggle();
    jQuery(this).toggleClass("rotate-90");
  });

  // when scroll from top add class .active to #header
  window.addEventListener("scroll", function () {
    if (window.scrollY > 100) {
      document.getElementById("header").classList.add("active");
    } else {
      document.getElementById("header").classList.remove("active");
    }
  });

  // smooth scroll to all anchor links
  jQuery('a[href^="#"]').on("click", function (e) {
    e.preventDefault();
    var element = jQuery(jQuery(this).attr("href"));
    console.log(element);
    var elementPosition = element.offset().top;
    jQuery("html, body").animate({
      scrollTop: elementPosition - 150 // 100px offset
    }, 800);
  });

  // Initialize ScrollReveal
  var sr = (0,scrollreveal__WEBPACK_IMPORTED_MODULE_0__["default"])({
    origin: "bottom",
    distance: "60px",
    duration: 1000,
    delay: 200,
    easing: "cubic-bezier(0.5, 0, 0, 1)",
    reset: false
  });

  // Apply to sections
  sr.reveal(".reveal-section", {
    interval: 200
  });

  // Apply to section headers
  sr.reveal(".reveal-header", {
    origin: "top",
    distance: "40px",
    delay: 100
  });

  // Apply to images
  sr.reveal(".reveal-image", {
    origin: "left",
    distance: "80px",
    delay: 300
  });

  // Apply to content blocks
  sr.reveal(".reveal-content", {
    origin: "right",
    distance: "80px",
    delay: 300
  });

  // Apply to cards with staggered delay
  sr.reveal(".reveal-card", {
    interval: 150
  });

  // Apply to contact form
  sr.reveal(".reveal-form", {
    origin: "bottom",
    distance: "50px",
    delay: 200
  });

  // Apply to contact info
  sr.reveal(".reveal-contact-info", {
    origin: "right",
    distance: "50px",
    delay: 300
  });
}

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["/build/js/vendor"], function() { return __webpack_exec__("./src/js/archive.js"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=archive.js.map