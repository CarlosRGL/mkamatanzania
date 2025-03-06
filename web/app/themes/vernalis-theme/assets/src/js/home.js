import LazyLoad from "vanilla-lazyload";
import init from "./common";

init();
// Init Lazy load instance
var lazyLoad = new LazyLoad();
function sliderLazy() {
  lazyLoad.update();
}

console.log("home_js");
