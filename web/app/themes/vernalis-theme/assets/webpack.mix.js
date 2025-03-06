require("dotenv").config({ path: "../../../../../.env" });
const LOCAL_URL = process.env.WP_HOME;
let mix = require("laravel-mix");
require("laravel-mix-simple-image-processing");
const tailwindcss = require("tailwindcss");

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for your application, as well as bundling up your JS files.
 |
 */

mix
  .js("src/js/home.js", "build/js/")
  .js("src/js/main.js", "build/js/")
  .js("src/js/common.js", "build/js/")
  .js("src/js/search.js", "build/js/")
  .js("src/js/archive.js", "build/js/")
  .js("src/js/single.js", "build/js/")
  .js("src/js/product.js", "build/js/")
  .js("src/js/calendar/calendar.js", "build/js/")
  .sass("src/sass/main.scss", "build/css")
  .sass("src/sass/product.scss", "build/css")
  .sass("src/sass/home.scss", "build/css")
  .options({
    processCssUrls: false,
    postCss: [tailwindcss("./tailwind.config.js")],
    legacyNodePolyfills: false,
  });
mix.extract();
mix.imgs({
  source: "./src/images",
  destination: "./build/images",
});
mix.copyDirectory("src/fonts", "build/fonts");
mix.sourceMaps(true, "source-map");
mix.webpackConfig({
  externals: {
    jquery: "jQuery",
  },
});
mix.browserSync({
  proxy: LOCAL_URL,
  files: ["../**/*.php", "../**/*.scss", "../**/*.twig"],
  port: 3001,
  notify: true,
});
mix.disableNotifications();
