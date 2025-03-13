"use strict";
(self["webpackChunkseizedixneuf_theme"] = self["webpackChunkseizedixneuf_theme"] || []).push([["/build/js/home"],{

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

  // Only initialize ScrollReveal for non-mobile devices (screen width > 768px)
  if (window.innerWidth > 768) {
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
}

/***/ }),

/***/ "./src/js/home.js":
/*!************************!*\
  !*** ./src/js/home.js ***!
  \************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vanilla_lazyload__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! vanilla-lazyload */ "./node_modules/.pnpm/vanilla-lazyload@19.1.3/node_modules/vanilla-lazyload/dist/lazyload.min.js");
/* harmony import */ var vanilla_lazyload__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(vanilla_lazyload__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common */ "./src/js/common.js");
/* harmony import */ var swiper_bundle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! swiper/bundle */ "./node_modules/.pnpm/swiper@11.2.4/node_modules/swiper/swiper-bundle.mjs");
/* harmony import */ var swiper_css_bundle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! swiper/css/bundle */ "./node_modules/.pnpm/swiper@11.2.4/node_modules/swiper/swiper-bundle.css");


// import Swiper JS


(0,_common__WEBPACK_IMPORTED_MODULE_0__["default"])();
// Init Lazy load instance
var lazyLoad = new (vanilla_lazyload__WEBPACK_IMPORTED_MODULE_3___default())();
function sliderLazy() {
  lazyLoad.update();
}
var swiper = new swiper_bundle__WEBPACK_IMPORTED_MODULE_1__["default"](".header-slider", {
  spaceBetween: 30,
  slidesPerView: 1,
  // effect: "fade",
  autoplay: {
    delay: 10000,
    disableOnInteraction: false
  },
  loop: true
});
console.log(swiper);

/***/ }),

/***/ "./src/sass/home.scss":
/*!****************************!*\
  !*** ./src/sass/home.scss ***!
  \****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/sass/main.scss":
/*!****************************!*\
  !*** ./src/sass/main.scss ***!
  \****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/sass/product.scss":
/*!*******************************!*\
  !*** ./src/sass/product.scss ***!
  \*******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["build/css/home","build/css/main","build/css/product","/build/js/vendor"], function() { return __webpack_exec__("./src/js/home.js"), __webpack_exec__("./src/sass/main.scss"), __webpack_exec__("./src/sass/product.scss"), __webpack_exec__("./src/sass/home.scss"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=home.js.map