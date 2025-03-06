(self["webpackChunkseizedixneuf_theme"] = self["webpackChunkseizedixneuf_theme"] || []).push([["/build/js/calendar"],{

/***/ "./src/js/calendar/calendar.js":
/*!*************************************!*\
  !*** ./src/js/calendar/calendar.js ***!
  \*************************************/
/***/ (function() {

var wrap = function wrap(toWrap, wrapper) {
  wrapper = wrapper || document.createElement("div");
  toWrap.parentNode.appendChild(wrapper);
  return wrapper.appendChild(toWrap);
};
var salle_id = jQuery("#calendar").data("id");
var calendar = jsCalendar["new"]("#calendar", "now", {
  monthFormat: "month YYYY",
  dayFormat: "DDD",
  firstDayOfTheWeek: "2",
  language: "fr"
});
jQuery(".jsCalendar-nav-left").html('<i class="fa-solid fa-chevron-left"></i>');
jQuery(".jsCalendar-nav-right").html('<i class="fa-solid fa-chevron-right"></i>');

// ajax call

var ajaxGenerateCalendarSeances = function ajaxGenerateCalendarSeances(calendar) {
  // get start dans end of the active month in calendar._active, first and last item of the array
  var startDate = calendar._active[0];
  var endDate = calendar._active[calendar._active.length - 1];

  // transform to timestamp
  startDate = new Date(startDate).getTime() / 1000;
  endDate = new Date(endDate).getTime() / 1000;
  jQuery.ajax({
    url: "/wp/wp-admin/admin-ajax.php",
    type: "post",
    data: {
      action: "generate_calendar_seances",
      salle_id: salle_id,
      start: startDate,
      end: endDate
    },
    success: function success(response) {
      //transform response.data to array
      var data = Object.values(response.data);
      renderCalendar(data, calendar);
    }
  });
};
var renderCalendar = function renderCalendar(data, calendar) {
  //keep only the date
  var dates = data.map(function (date) {
    return date.split(" ")[0];
  });
  calendar.onDateRender(function (index, element, info) {
    // to DD/MM/YYYY
    var date = index.toLocaleDateString("fr-FR");
    // if date is in dates, add class
    if (dates.includes(date)) {
      wrap(element.firstChild);
    }
  });
  calendar.select(dates);
};
var ajaxRequest;
calendar.onMonthChange(function (event, date) {
  // cancel ajax call if already running
  if (ajaxRequest && ajaxRequest.readyState !== 4) {
    ajaxRequest.abort();
  }
  ajaxRequest = ajaxGenerateCalendarSeances(calendar);
});
ajaxGenerateCalendarSeances(calendar);

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ var __webpack_exports__ = (__webpack_exec__("./src/js/calendar/calendar.js"));
/******/ }
]);
//# sourceMappingURL=calendar.js.map