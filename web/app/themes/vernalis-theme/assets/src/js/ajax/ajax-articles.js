import datepicker from "js-datepicker";
// import { tns } from "tiny-slider/src/tiny-slider";
import LazyLoad from "vanilla-lazyload";
function ajax(params) {
  params.search = jQuery("#archive_input").val();
  const archive_container = jQuery(".archive_posts");
  jQuery.ajax({
    url: window.origin + "/wp/wp-admin/admin-ajax.php",
    data: params,
    type: "POST",
    beforeSend: function () {
      archive_container.html("");
      jQuery(".loader").show();
    },
    success: function (data) {
      jQuery(".loader").hide();
      archive_container.html(data);
      if (jQuery(".ended").length) {
        jQuery(".load-posts").hide();
      } else {
        jQuery(".load-posts").show();
      }
      const lazyLoad = new LazyLoad();
    },
  });
  return false;
}

function ajax_load(params) {
  params.search = jQuery("#archive_input").val();
  const archive_container = jQuery(".archive_posts");
  jQuery.ajax({
    url: window.origin + "/wp/wp-admin/admin-ajax.php",
    data: params,
    type: "POST",
    beforeSend: function () {
      jQuery(".loader-2").show();
    },
    success: function (data) {
      jQuery(".loader-2").hide();
      archive_container.append(data);
      if (jQuery(".ended").length) {
        jQuery(".load-posts").hide();
      } else {
        jQuery(".load-posts").show();
      }
      const lazyLoad = new LazyLoad();
    },
  });
  return false;
}

export function ajaxArticles() {
  let page = 1;
  const params = {
    action: "ajax_articles",
    categories: [],
    search: "",
    post_type: jQuery(".post_type").val(),
    page: page,
    date_debut: "",
    date_fin: "",
    type: [],
  };
  const months = [
    "janvier",
    "février",
    "mars",
    "avril",
    "mai",
    "juin",
    "juillet",
    "août",
    "septembre",
    "octobre",
    "novembre",
    "décembre",
  ];
  const days = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Vend", "Sam"];
  if (jQuery(".post_type").val() == "agenda") {
    const start = datepicker(".start", {
      id: 1,
      startDay: 1,
      customMonths: months,
      customDays: days,
      formatter: (input, date, instance) => {
        const value = date.toLocaleDateString("fr-FR");
        input.value = value; // => '1/1/2099'
      },
      onSelect: (instance, date) => {
        jQuery(".date_agenda").removeClass("active");
        params["date_debut"] = date.toLocaleDateString("fr-FR");

        ajax(params);
      },
    });
    const end = datepicker(".end", {
      id: 1,
      startDay: 1,
      customMonths: months,
      customDays: days,
      formatter: (input, date, instance) => {
        const value = date.toLocaleDateString("fr-FR");
        input.value = value; // => '1/1/2099'
      },
      onSelect: (instance, date) => {
        jQuery(".date_agenda").removeClass("active");
        params["date_fin"] = date.toLocaleDateString("fr-FR");

        ajax(params);
      },
    });
  }

  jQuery(".form-checkbox").on("click", function () {
    const self = jQuery(this);
    const idCheckbox = parseInt(self.val());
    var name = self.attr("name");

    if (self.is(":checked") && !params[name].includes(idCheckbox)) {
      params[name].push(idCheckbox);
    } else if (!self.is(":checked") && params[name].includes(idCheckbox)) {
      const index = params[name].indexOf(idCheckbox);
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

  let timer = null;
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
