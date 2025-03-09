"use strict";
(self["webpackChunkseizedixneuf_theme"] = self["webpackChunkseizedixneuf_theme"] || []).push([["/build/js/main"],{

/***/ "./src/js/ajax/ajax-articles.js":
/*!**************************************!*\
  !*** ./src/js/ajax/ajax-articles.js ***!
  \**************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ajaxArticles: function() { return /* binding */ ajaxArticles; }
/* harmony export */ });
/* harmony import */ var js_datepicker__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! js-datepicker */ "./node_modules/.pnpm/js-datepicker@5.18.3/node_modules/js-datepicker/dist/datepicker.min.js");
/* harmony import */ var js_datepicker__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(js_datepicker__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var vanilla_lazyload__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vanilla-lazyload */ "./node_modules/.pnpm/vanilla-lazyload@19.1.3/node_modules/vanilla-lazyload/dist/lazyload.min.js");
/* harmony import */ var vanilla_lazyload__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(vanilla_lazyload__WEBPACK_IMPORTED_MODULE_1__);

// import { tns } from "tiny-slider/src/tiny-slider";

function ajax(params) {
  params.search = jQuery("#archive_input").val();
  var archive_container = jQuery(".archive_posts");
  jQuery.ajax({
    url: window.origin + "/wp/wp-admin/admin-ajax.php",
    data: params,
    type: "POST",
    beforeSend: function beforeSend() {
      archive_container.html("");
      jQuery(".loader").show();
    },
    success: function success(data) {
      jQuery(".loader").hide();
      archive_container.html(data);
      if (jQuery(".ended").length) {
        jQuery(".load-posts").hide();
      } else {
        jQuery(".load-posts").show();
      }
      var lazyLoad = new (vanilla_lazyload__WEBPACK_IMPORTED_MODULE_1___default())();
    }
  });
  return false;
}
function ajax_load(params) {
  params.search = jQuery("#archive_input").val();
  var archive_container = jQuery(".archive_posts");
  jQuery.ajax({
    url: window.origin + "/wp/wp-admin/admin-ajax.php",
    data: params,
    type: "POST",
    beforeSend: function beforeSend() {
      jQuery(".loader-2").show();
    },
    success: function success(data) {
      jQuery(".loader-2").hide();
      archive_container.append(data);
      if (jQuery(".ended").length) {
        jQuery(".load-posts").hide();
      } else {
        jQuery(".load-posts").show();
      }
      var lazyLoad = new (vanilla_lazyload__WEBPACK_IMPORTED_MODULE_1___default())();
    }
  });
  return false;
}
function ajaxArticles() {
  var page = 1;
  var params = {
    action: "ajax_articles",
    categories: [],
    search: "",
    post_type: jQuery(".post_type").val(),
    page: page,
    date_debut: "",
    date_fin: "",
    type: []
  };
  var months = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
  var days = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Vend", "Sam"];
  if (jQuery(".post_type").val() == "agenda") {
    var start = js_datepicker__WEBPACK_IMPORTED_MODULE_0___default()(".start", {
      id: 1,
      startDay: 1,
      customMonths: months,
      customDays: days,
      formatter: function formatter(input, date, instance) {
        var value = date.toLocaleDateString("fr-FR");
        input.value = value; // => '1/1/2099'
      },
      onSelect: function onSelect(instance, date) {
        jQuery(".date_agenda").removeClass("active");
        params["date_debut"] = date.toLocaleDateString("fr-FR");
        ajax(params);
      }
    });
    var end = js_datepicker__WEBPACK_IMPORTED_MODULE_0___default()(".end", {
      id: 1,
      startDay: 1,
      customMonths: months,
      customDays: days,
      formatter: function formatter(input, date, instance) {
        var value = date.toLocaleDateString("fr-FR");
        input.value = value; // => '1/1/2099'
      },
      onSelect: function onSelect(instance, date) {
        jQuery(".date_agenda").removeClass("active");
        params["date_fin"] = date.toLocaleDateString("fr-FR");
        ajax(params);
      }
    });
  }
  jQuery(".form-checkbox").on("click", function () {
    var self = jQuery(this);
    var idCheckbox = parseInt(self.val());
    var name = self.attr("name");
    if (self.is(":checked") && !params[name].includes(idCheckbox)) {
      params[name].push(idCheckbox);
    } else if (!self.is(":checked") && params[name].includes(idCheckbox)) {
      var index = params[name].indexOf(idCheckbox);
      if (index > -1) {
        params[name].splice(index, 1);
      }
    }
    console.log(params);
    params["page"] = 1;
    ajax(params);
  });
  jQuery(".select_cat").on("change", function () {
    var name = jQuery(this).attr("name");
    params[name] = jQuery(this).val();
    console.log(params);
    params["page"] = 1;
    ajax(params);
  });
  var timer = null;
  jQuery("#archive_input").on("keyup", function (e) {
    clearTimeout(timer);
    timer = setTimeout(ajax, 500, params);
  });
  jQuery(document).on("click", ".load-posts", function (e) {
    page++;
    params["page"] = page;
    ajax_load(params);
  });
}

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

/***/ }),

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common */ "./src/js/common.js");
/* harmony import */ var _utils_tabs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/tabs */ "./src/js/utils/tabs.js");
/* harmony import */ var _fancyapps_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @fancyapps/ui */ "./node_modules/.pnpm/@fancyapps+ui@5.0.36/node_modules/@fancyapps/ui/dist/index.esm.js");
/* harmony import */ var vanilla_lazyload__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! vanilla-lazyload */ "./node_modules/.pnpm/vanilla-lazyload@19.1.3/node_modules/vanilla-lazyload/dist/lazyload.min.js");
/* harmony import */ var vanilla_lazyload__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(vanilla_lazyload__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _ajax_ajax_articles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ajax/ajax-articles */ "./src/js/ajax/ajax-articles.js");
/* harmony import */ var micromodal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! micromodal */ "./node_modules/.pnpm/micromodal@0.4.10/node_modules/micromodal/dist/micromodal.es.js");






function readCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}
jQuery(function () {
  (0,_common__WEBPACK_IMPORTED_MODULE_0__["default"])();

  // Init Lazy load instance
  var lazyLoad = new (vanilla_lazyload__WEBPACK_IMPORTED_MODULE_5___default())();
  var tabs_container = document.getElementById("tabs");
  if (tabs_container !== null) {
    var tabs = new _utils_tabs__WEBPACK_IMPORTED_MODULE_1__.Tabs({
      elem: "tabs",
      open: 0
    });
  }
  if (jQuery(".archive__form")) {
    (0,_ajax_ajax_articles__WEBPACK_IMPORTED_MODULE_3__.ajaxArticles)();
  }
  // Init Galerie
  _fancyapps_ui__WEBPACK_IMPORTED_MODULE_2__.Fancybox.bind("[data-fancybox='galerie']", {
    // Your options go here
    thumbs: {
      autoStart: true
    }
  });
});

/***/ }),

/***/ "./src/js/utils/tabs.js":
/*!******************************!*\
  !*** ./src/js/utils/tabs.js ***!
  \******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Tabs: function() { return /* binding */ Tabs; }
/* harmony export */ });
/**
 * @fileOverview
 * @author Zoltan Toth
 * @version 1.0.0
 */

/**
 * @description
 * Vanilla Javascript Tabs
 *
 * @class
 * @param {string} options.elem - HTML id of the tabs container
 * @param {number} [options.open = 0] - Render the tabs with this item open
 */
var Tabs = function Tabs(options) {
  var elem = document.getElementById(options.elem),
    open = options.open || 0,
    titleClass = "js-tabs__title",
    activeClass = "js-tabs__title-active",
    contentClass = "js-tabs__content",
    tabsNum = elem.querySelectorAll("." + titleClass).length;
  render();

  /**
   * Initial rendering of the tabs.
   */
  function render(n) {
    elem.addEventListener("click", onClick);
    var init = n == null ? checkTab(open) : checkTab(n);
    for (var i = 0; i < tabsNum; i++) {
      elem.querySelectorAll("." + titleClass)[i].setAttribute("data-index", i);
      if (i === init) openTab(i);
    }
  }

  /**
   * Handle clicks on the tabs.
   *
   * @param {object} e - Element the click occured on.
   */
  function onClick(e) {
    if (e.target.className.indexOf(titleClass) === -1) return;
    e.preventDefault();
    openTab(e.target.getAttribute("data-index"));
  }

  /**
   * Hide all tabs and re-set tab titles.
   */
  function reset() {
    [].forEach.call(elem.querySelectorAll("." + contentClass), function (item) {
      item.style.display = "none";
    });
    [].forEach.call(elem.querySelectorAll("." + titleClass), function (item) {
      item.className = removeClass(item.className, activeClass);
    });
  }

  /**
   * Utility function to remove the open class from tab titles.
   *
   * @param {string} str - Current class.
   * @param {string} cls - The class to remove.
   */
  function removeClass(str, cls) {
    var reg = new RegExp("( )" + cls + "()", "g");
    return str.replace(reg, "");
  }

  /**
   * Utility function to remove the open class from tab titles.
   *
   * @param n - Tab to open.
   */
  function checkTab(n) {
    return n < 0 || isNaN(n) || n > tabsNum ? 0 : n;
  }

  /**
   * Opens a tab by index.
   *
   * @param {number} n - Index of tab to open. Starts at 0.
   *
   * @public
   */
  function openTab(n) {
    reset();
    var i = checkTab(n);
    elem.querySelectorAll("." + titleClass)[i].className += " " + activeClass;
    elem.querySelectorAll("." + contentClass)[i].style.display = "";
  }

  /**
   * Updates the tabs.
   *
   * @param {number} n - Index of tab to open. Starts at 0.
   *
   * @public
   */
  function update(n) {
    destroy();
    reset();
    render(n);
  }

  /**
   * Removes the listeners from the tabs.
   *
   * @public
   */
  function destroy() {
    elem.removeEventListener("click", onClick);
  }
  return {
    open: openTab,
    update: update,
    destroy: destroy
  };
};

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["/build/js/vendor"], function() { return __webpack_exec__("./src/js/main.js"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=main.js.map