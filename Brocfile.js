var mergeTrees = require('broccoli-merge-trees');
var pickFiles = require('broccoli-static-compiler');
var compileSass = require('broccoli-sass');
var autoprefixer = require('broccoli-autoprefixer'); 
var es6transpiler = require('broccoli-es6-transpiler');
var imagemin = require('broccoli-imagemin');
var browserify = require('broccoli-fast-browserify');
var svgstore = require('broccoli-svgstore');
var jshint = require('broccoli-jshint');
var zetzer = require('broccoli-zetzer');

// Specify directories 
var svgsDir = 'assets/svg';
var sassDir = 'assets/sass';
var scriptDir = 'assets/app';

/*
	HTML
*/
var pages = 'assets/html/pages';
var include = 'assets/html/components';
var templates = 'assets/html/templates';

var appHTML = zetzer({
  pages: pages,
  partials: include,
  templates: templates,
  dot_template_settings: {
    strip: false
  } 
});


/*
	IMAGES
*/
var images = pickFiles('assets', {
	srcDir: 'images',
	destDir: 'assets/images'
});

var appIMG = imagemin(images); 

/*
	SVGs
*/
var appSVG = svgstore(svgsDir, {
  outputFile: '/assets/icons.svg'
});

/*
	CSS
*/
var sass = compileSass([sassDir], 'style.scss', 'style/style.css');
var appCSS = autoprefixer(sass, {
  sourcemap: true,
  browsers: ['> 1%', 'last 2 versions', 'Chrome 5', 'Firefox 6']
});

/*
	JS
*/
var hintTree = jshint(scriptDir);
var jsTree = browserify(scriptDir, {
  bundles: {
    'scripts/bundle.js': {
      entryPoints: ['app.js']
    }
  },
  browserify: {
    fullPaths: false
  }
});

var appJS = mergeTrees([jsTree], {overwrite: true});

module.exports = mergeTrees([appHTML, appIMG, appSVG, appCSS, appJS]);

