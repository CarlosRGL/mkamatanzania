const wrap = function (toWrap, wrapper) {
  wrapper = wrapper || document.createElement("div");
  toWrap.parentNode.appendChild(wrapper);
  return wrapper.appendChild(toWrap);
};

const salle_id = jQuery("#calendar").data("id");
const calendar = jsCalendar.new("#calendar", "now", {
  monthFormat: "month YYYY",
  dayFormat: "DDD",
  firstDayOfTheWeek: "2",
  language: "fr",
});

jQuery(".jsCalendar-nav-left").html('<i class="fa-solid fa-chevron-left"></i>');
jQuery(".jsCalendar-nav-right").html(
  '<i class="fa-solid fa-chevron-right"></i>'
);

// ajax call

var ajaxGenerateCalendarSeances = function (calendar) {
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
      end: endDate,
    },
    success: function (response) {
      //transform response.data to array
      const data = Object.values(response.data);
      renderCalendar(data, calendar);
    },
  });
};

const renderCalendar = function (data, calendar) {
  //keep only the date
  const dates = data.map((date) => date.split(" ")[0]);
  calendar.onDateRender(function (index, element, info) {
    // to DD/MM/YYYY
    const date = index.toLocaleDateString("fr-FR");
    // if date is in dates, add class
    if (dates.includes(date)) {
      wrap(element.firstChild);
    }
  });
  calendar.select(dates);
};

let ajaxRequest;

calendar.onMonthChange(function (event, date) {
  // cancel ajax call if already running
  if (ajaxRequest && ajaxRequest.readyState !== 4) {
    ajaxRequest.abort();
  }
  ajaxRequest = ajaxGenerateCalendarSeances(calendar);
});

ajaxGenerateCalendarSeances(calendar);
