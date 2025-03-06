import init from "./common";
import { Tabs } from "./utils/tabs";
import { Fancybox } from "@fancyapps/ui";
import LazyLoad from "vanilla-lazyload";
import { ajaxArticles } from "./ajax/ajax-articles";
import MicroModal from "micromodal";

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
  init();

  // Init Lazy load instance
  var lazyLoad = new LazyLoad();

  var tabs_container = document.getElementById("tabs");
  if (tabs_container !== null) {
    const tabs = new Tabs({
      elem: "tabs",
      open: 0,
    });
  }

  if (jQuery(".archive__form")) {
    ajaxArticles();
  }
  // Init Galerie
  Fancybox.bind("[data-fancybox='galerie']", {
    // Your options go here
    thumbs: {
      autoStart: true,
    },
  });
});
