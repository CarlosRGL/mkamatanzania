module.exports = {
  content: ["../views/**/*.twig"],
  theme: {
    fontFamily: {
      titles: ["Inter"],
      headings: ["Inter"],
      body: ["Inter"],
    },

    screens: {
      phone: "640px",
      tablet: "768px",
      lg: "1024px",
      laptop: "1280px",
      "mid-desktop": "1440px",
      desktop: "1720px",
      "lg-desktop": "1920px",
    },
    container: {
      center: true,
    },
    plugins: [require("tailwindcss-debug-screens")],
  },
};
