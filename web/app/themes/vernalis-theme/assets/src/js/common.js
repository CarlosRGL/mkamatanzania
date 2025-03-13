import tippy from "tippy.js";
// scrollreveal
import ScrollReveal from "scrollreveal";

export default function init() {
  tippy("[data-tippy]", {
    placement: "bottom",
    onShow(instance) {
      instance.popper.hidden = instance.reference.dataset.tippy ? false : true;
      instance.setContent(instance.reference.dataset.tippy);
    },
  });

  jQuery("#js-menu-open, #js-menu-close, #js-menu-overlay").on(
    "click",
    function () {
      jQuery("#js-menu-overlay").toggleClass("invisible");
      jQuery("#js-menu-overlay").toggleClass("bg-opacity-70");
      jQuery("#js-menu-overlay").toggleClass("opacity-0");
      jQuery("#js-menu").toggleClass("-left-full");
      jQuery("#js-menu").toggleClass("left-0");
    }
  );

  jQuery(".js-submenu").on("click", function () {
    console.log(jQuery(this));
    jQuery(this).parent().siblings("ul").slideToggle();
    jQuery(this).toggleClass("rotate-90");
  });

  // when scroll from top add class .active to #header
  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      document.getElementById("header").classList.add("active");
    } else {
      document.getElementById("header").classList.remove("active");
    }
  });

  // smooth scroll to all anchor links
  jQuery('a[href^="#"]').on("click", function (e) {
    e.preventDefault();
    const element = jQuery(jQuery(this).attr("href"));
    console.log(element);

    const elementPosition = element.offset().top;

    jQuery("html, body").animate(
      {
        scrollTop: elementPosition - 150, // 100px offset
      },
      800
    );
  });

  // Initialize ScrollReveal
  const sr = ScrollReveal({
    origin: "bottom",
    distance: "60px",
    duration: 1000,
    delay: 200,
    easing: "cubic-bezier(0.5, 0, 0, 1)",
    reset: false,
  });

  // Apply to sections
  sr.reveal(".reveal-section", {
    interval: 200,
  });

  // Apply to section headers
  sr.reveal(".reveal-header", {
    origin: "top",
    distance: "40px",
    delay: 100,
  });

  // Apply to images
  sr.reveal(".reveal-image", {
    origin: "left",
    distance: "80px",
    delay: 300,
  });

  // Apply to content blocks
  sr.reveal(".reveal-content", {
    origin: "right",
    distance: "80px",
    delay: 300,
  });

  // Apply to cards with staggered delay
  sr.reveal(".reveal-card", {
    interval: 150,
  });

  // Apply to contact form
  sr.reveal(".reveal-form", {
    origin: "bottom",
    distance: "50px",
    delay: 200,
  });

  // Apply to contact info
  sr.reveal(".reveal-contact-info", {
    origin: "right",
    distance: "50px",
    delay: 300,
  });
}
