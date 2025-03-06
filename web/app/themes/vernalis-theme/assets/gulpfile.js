const { src, dest, series } = require("gulp");

const svgSprite = require("gulp-svg-sprites");
const svgmin = require("gulp-svgmin");
const del = require("del");

const paths = {
  svg: {
    src: "./src/svg/**/*.svg",
    dist: "./build",
    optimized: "./src/svg-min/",
  },
};

//------------------------------------------------------------
//    Conversion des SVG (pictos et/ou autres) en symbol
//------------------------------------------------------------

// Clean le dossier 'optimized' avant d'effectuer la tâche svgOptimize
function cleanOptimize() {
  return del(paths.svg.optimized, {
    force: true,
  });
}

// Optimise les SVG (nettoyage)
function svgOptimize() {
  return src(paths.svg.src)
    .pipe(
      svgmin({
        plugins: [
          { removeViewBox: false },
          { convertPathData: { noSpaceAfterFlags: false } },
          { mergePaths: { noSpaceAfterFlags: false } },
          { removeAttrs: false },
          { removeStyleElement: false },
        ],
      })
    )
    .pipe(dest(paths.svg.optimized));
}

// Création des sprites SVG en mode symbols
function svgSymbols() {
  return src(paths.svg.optimized + "**/*.svg")
    .pipe(
      svgSprite({
        mode: "symbols",
        selector: "%f",
        svg: {
          symbols: "icons.svg",
        },
        preview: true,
      })
    )
    .pipe(dest(paths.svg.dist));
}

//------------------------------------------------------------
//    TASKS
//------------------------------------------------------------
const svg = series(cleanOptimize, svgOptimize, svgSymbols);
// exports.svg = series(cleanOptimize, svgOptimize, svgSymbols, transformSpriteFile, listIcons, rebuildSvgOptimized);;
exports.svg = svg;
exports.default = svg; //parallel(css, js, svg, exportColors, rebuildTheme, rebuildFonts, rebuildSvgOptimized);
