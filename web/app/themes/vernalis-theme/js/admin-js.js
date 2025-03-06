jQuery(document).ready(function ($) {
  if (typeof acf == "undefined") {
    return;
  }

  acf.add_filter("select2_args", function (args) {
    console.log(args);
    if (args.ajax && typeof args.ajax.data == "function") {
      var old_data_func = args.ajax.data;
      args.ajax.data = function (term, page) {
        var default_response = old_data_func(term, page);
        default_response.salle = function () {
          return jQuery("#acf-field_6470a5bc04dc5").val();
        };
        return default_response;
      };
    }
    return args;
  });

  jQuery("#print_button").on("click", function () {
    url = window.location.href + "&print_resas=1";
    window.open(url, "_blank").focus();
  });
});
