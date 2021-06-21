const { series, parallel, src, dest, watch } = require("gulp");//parallel sirve para hacer las tareas al mismo tiempo y series hace una y luego la que sigue

const sass = require("gulp-sass");
const imagemin = require("gulp-imagemin");
const notify = require("gulp-notify");
const webp = require("gulp-webp");
const concat = require("gulp-concat");

//utilidades CSS
const autoprefixer = require("autoprefixer");
const postcss = require("gulp-postcss");
const cssnano = require("cssnano");
const sourcemaps = require("gulp-sourcemaps");

//utilidades JS
const terser = require("gulp-terser-js");
const rename = require("gulp-rename");

const paths = {
    imagenes: "src/img/**/*",
    js: "src/javascript/**/*.js"
}
/*

function hola (done) {
    console.log("Compilando con gulp");

    done();
}

function hola1 (done) {
    console.log("Compilando con gulp de nuevo");

    done();
}
exports.tareas = series(hola, hola1);
//o la segunda para que se ejecute con puro gulp
exports.default = series(hola, hola1);

exports.hola = hola;
exports.hola = hola1;*/

//aqui lo que hacemos es retornar un pipe y ese pipe hace que se compile con sass luego de eso
//en un segundo pipe usamos dest para que el resultado se guarde en el path elegido 
function css (  ){
    return src("src/img/SCSS/app.scss")
        .pipe( sourcemaps.init() )
        .pipe( sass() )
        .pipe( postcss( [autoprefixer(), cssnano()] ) )
        .pipe( sourcemaps.write(".") )
        .pipe( dest("build/css"))
}

//en esta lo que hacemos es lo mismo pero en version minificada
function minificarcss (){
    return src("src/img/SCSS/app.scss")
        .pipe( sass({
            outputStyle: "compressed"
        }) )
        .pipe( dest("build/css")) 
}

//para usar JavaScript
function javascript(){
    return (src(paths.js))
    .pipe( sourcemaps.init() )
    .pipe( concat("bundle.js") )
    .pipe( terser())
    .pipe( sourcemaps.write(".") )
    .pipe( rename( {suffix: ".min"}) )
    .pipe(dest("./build/js"))
}

function imagenes () {
    return src( paths.imagenes )
    .pipe(imagemin())
    .pipe( dest("build/img") ) 
    //.pipe( notify( { message: "Imagen minificada" } ) );
}

function versionwebp(){
    return src( paths.imagenes)
    .pipe( webp() )
    .pipe( dest( "build/img" ))
}

function watchArchivo( ){
    watch("src/img/SCSS/**/*.scss", css)
    watch(paths.js, javascript);
    //con un * es solo para los archivos dentro de una carpeta
    //pero con /**/* es para que busque dentro de esa carpeta 
    //y dentro de lads carpetas de esa carpeta la extension .scss
}

exports.css = css;
exports.minificarcss = minificarcss;
exports.imagenes = imagenes;
exports.javascript = javascript;
exports.versionwebp = versionwebp;
exports.watchArchivo = watchArchivo;
exports.default = series(css, javascript,imagenes, watchArchivo)