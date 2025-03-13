import LazyLoad from "vanilla-lazyload";
import init from "./common";
// import Swiper JS
import Swiper from "swiper/bundle";
import "swiper/css/bundle";

init();
// Init Lazy load instance
var lazyLoad = new LazyLoad();
function sliderLazy() {
  lazyLoad.update();
}
var swiper = new Swiper(".header-slider", {
  spaceBetween: 30,
  slidesPerView: 1,
  // effect: "fade",
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  loop: true,
});
console.log(swiper);
