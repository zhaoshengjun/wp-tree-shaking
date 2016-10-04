const webpack = require('webpack');
const fs = require('fs');
const path = require('path');

module.exports = {
  entry: {
    app: path.join(__dirname, 'src/main.js')
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[hash].js'
  },

  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin()   
  ]
}


// const webpack = require('webpack');
// const path = require('path');
// const fs = require('fs');
// const merge = require('webpack-merge');
// // const autoprefixer = require('autoprefixer');
// // const postcssImport = require('postcss-sassy-import');
// // const ExtractTextPlugin = require('extract-text-webpack-plugin');
// // const CopyWebpackPlugin = require('copy-webpack-plugin');

// // Load the paths that matter to our app
// // const PATHS = require('./paths');
// const PATHS = {
//   app:path.join(__dirname, 'src'),
//   public: path.join(__dirname,'dist' ),
//   distPublic: path.join(__dirname, 'dist')
// }

// // Determine whether we're targeting a dev or production build, by looking
// // at the NPM lifecycle event that evoked webpack in the first place
// const TARGET = process.env.npm_lifecycle_event;

// // Bind the webpack-dev-server to 0.0.0.0, which will open it up to
// // every network interface on the server

// const HOST = '0.0.0.0';
// const LOCAL = `http://${HOST}:8080`;

// const resolve = {
//   modules: [
//     PATHS.app,
//     'node_modules',
//   ],
// };

// // const styleLoaders = [
// //   'style',
// //   'css?sourceMap',
// //   'postcss',
// //   'resolve-url',
// //   'sass?sourceMap',
// // ];

// /**
//  * Common Webpack configuration
//  *
//  * This contains items that are common to both the
//  * development and production webpack environments.
//  *
//  * Development specific configuration is merged further down.
//  *
//  * @type {Object}
//  */
// const common = {
//   // module: {
//   //   loaders: [
//   //     // With the file loader, imported 'static' assets will wind up
//   //     // being served from the public folder
//   //     {
//   //       test: /\.(png|woff|woff2|svg|ttf|eot|jpg)$/,
//   //       loader: 'file',
//   //       query: {
//   //         name: 'assets/[hash].[ext]',
//   //       },
//   //     },
//   //   ],
//   // },

//   // we want to dump everything in the 'dist' folder to be served
//   // from the Koa server
//   output: {
//     path: PATHS.distPublic,
//     publicPath: '/',
//     filename: 'bundle.js',
//   },

//   plugins: [

//     // We'll use process.env.NODE_ENV to figure out whether we're
//     // in development or production mode, so we can tweak our
//     // bundle accordingly

//     new webpack.DefinePlugin({
//       'process.env.NODE_ENV': `"${process.env.NODE_ENV || 'development'}"`,
//     }),

//     // This is a simple plug-in that copies everything inside of
//     // our <app>/public folder into the right place under our 'dist'
//     // folder, making it available to our Koa server

//     // new CopyWebpackPlugin([
//     //   {
//     //     from: PATHS.public,
//     //     force: true, // This flag forces overwrites
//     //   },
//     // ], {
//     //   ignore: [
//     //     '*.html', // Ignore static HTML (which we'll use to bootstrap webpack)
//     //   ],
//     // }),

//     new webpack.LoaderOptionsPlugin({
//       minimize: true,
//       debug: false,
//       options: {
//         // we're using SASS for stylesheets. By default, let's grab
//         // a sourcemap so we can use that inside the browser's Developer
//         // Console and see the raw SASS
//         context: PATHS.app,

//         output: {
//           path: PATHS.distPublic,
//           publicPath: '/',
//           filename: 'bundle.js',
//         },

//         // sassLoader: {
//         //   includePaths: [
//         //     PATHS.app,
//         //     'node_modules',
//         //   ],
//         //   sourceMap: true,
//         // },

//         // we might have SASS scattered about in different places -
//         // inside custom folders, or in 'node_modules' and installed via
//         // third-party libs.  The resolve-url-loader plugin helps our
//         // style/SASS loaders find assets referenced relative to those
//         // locations

//         resolveUrlLoader: {
//           root: PATHS.app,
//         },

//         // postcss gives our CSS a final pass to perform optimisations,
//         // add vendor-specific suffixes (via 'autoprefixer') and
//         // minify the code
//         // postcss(wp) {
//         //   return [
//         //     postcssImport({
//         //       path: PATHS.app,
//         //       addDependencyTo: wp,
//         //     }),
//         //     autoprefixer({
//         //       browsers: [
//         //         'last 2 versions',
//         //         '> 10%',
//         //         'ie >= 10',
//         //         'iOS >= 7',
//         //       ],
//         //     }),
//         //   ];
//         // },
//       },
//     }),
//   ],
//   resolve,
// };

// /**
//  * Development specific webpack configuration.
//  *
//  * This is used when running `npm run dev`
//  */
// if (TARGET === 'dev') {
//   // `merge.smart` takes our common config, and intelligently augments
//   // it with settings that are specified our new config object
//   module.exports = merge.smart(common, {
//     // generate source maps, so we can delve under the hood in
//     // Chrome/Safari and get some real stack traces
//     devtool: 'eval-source-map',
//     devServer: {

//       // bind our dev server to 0.0.0.0
//       host: HOST,

//       // link HTTP -> app/public, so static assets are being pulled from
//       // our source directory and not the not-yet-existent 'dist' folder
//       contentBase: PATHS.public,

//       // Assume app/public is the root of our dev server
//       publicPath: '/',

//       // Inline our code, so we wind up with one, giant bundle
//       inline: true,

//       // Hot reload FTW! Every change is pushed down to the browser
//       // with no refreshes
//       hot: true,

//       // Statistics on the build
//       stats: {
//         colors: true,
//       },

//       // We're using React Router for all routes, so redirect 404s
//       // back to the webpack-dev-server bootstrap HTML
//       historyApiFallback: {
//         index: '/webpack.html',
//       },

//       // Push everything out to ./dist
//       outputPath: PATHS.dist,
//     },
//     entry: {
//       javascript: [
//         'react-hot-loader/patch',
//         // Spawn webpack-dev-server
//         `webpack-dev-server/client?${LOCAL}`,
//         // Stop webpack from reloading the page when it encounters errors
//         'webpack/hot/only-dev-server',
//         // Polyfill missing ES6 functionality so it works in the browser
//         'babel-polyfill',
//         // This is where we want webpack to start building from
//         path.join(PATHS.app, 'client.js'),
//       ],
//     },
//     module: {
//       loaders: [
//         // JS hot loader.  Recognises .js and .jsx (in case
//         // there are any third-party packages that use that extension,
//         // like Meteor does)... and add the react-hot-loader bootstrap
//         // code to the bundle.  Compiles React and makes it compatible
//         // with the hot loader -- so changes to React can be pushed
//         // down to the browser, just the same.
//         {
//           test: /\.jsx?$/,
//           exclude: /node_modules/,
//           loaders: [{
//             loader: 'babel',
//             query: {
//               presets: [
//                 'react',
//                 ['es2015', {
//                   modules: false,
//                 }],
//                 'stage-1',
//               ],
//               plugins: [
//                 'transform-decorators-legacy',
//                 path.join(PATHS.app, '../plugins/relay'),
//                 'react-hot-loader/babel',
//               ],
//             },
//           }],
//         },

//         // SASS loader.  Basically the same as the CSS loader, except
//         // we add the postcss step.  TODO -- should we add postcss to
//         // regular CSS, too?
//         {
//           test: /\.(c|sa|sc)ss$/,
//           loaders: styleLoaders,
//         },
//       ],
//     },

//     // where we want the generated assets to go
//     output: {
//       sourceMapFilename: '[file].map',
//       publicPath: `${LOCAL}/`,
//     },
//     plugins: [

//       // Enable hot reloading
//       new webpack.HotModuleReplacementPlugin(),
//     ],
//   });
// }

// /**
//  * Distribution webpack configuration.
//  *
//  * This is used when running `npm run build`
//  *
//  * Generates two bundles:
//  *
//  * 1)  The front-end web server (i.e server entry point.)  Spawns
//  * a Koa web server, bootstraps initial page request, and compiles the
//  * React code down to plain HTML for fast first page loading.  This is
//  * the code that responds to all requests
//  *
//  * 2)  Client bundle (i.e. browser entry point.)  This takes the
//  * initial HTML that the server sends back, and binds React to the DOM
//  * to take care of subsequent client-side requests + logic.
//  *
//  * Isomorphism FTW!
//  */
// if (TARGET === 'build') {
//   // Since we're creating a server-side Webpack bundle, we need to
//   // treat node_modules a little differently.  We DON'T want them to be
//   // bundled into one giant file -- instead, we can pull them from the
//   // filesystem just like we would in our regular Node code.  This
//   // function ignores any require statements that are pulling anything
//   // from node_modules.
//   const nodeModules = Object.assign({}, ...fs.readdirSync('node_modules')
//     .filter(x => ['.bin'].indexOf(x) === -1)
//     .map(mod => ({ [mod]: `commonjs ${mod}` })
//   ));

//   // Extract text from imported scripts
//   const extractCSS = new ExtractTextPlugin({
//     filename: 'assets/css/style.css',
//     allChunks: true,
//   });

//   module.exports = [
//     merge.smart(common, {

//       // don't debug - this is production!
//       // debug: false,
//       entry: {
//         javascript: [

//           // no hot reloading, this time.  Just some babel polyfilling
//           // needs adding to the top of the bundle, so we can get our async/await
//           // goodness
//           'babel-polyfill',

//           // same entry point as the webpack-dev-server -- it's the
//           // same code, after all (just a production version of it)
//           path.join(PATHS.app, 'client.js'),
//         ],
//       },
//       module: {
//         loaders: [

//           // In the production version, we want to separate CSS out into
//           // a new file, and not stuff it inline into the JS bundle.
//           // Otherwise, our JS bundle will be huge and we'll need to load
//           // the whole thing in one go.  ExtractTextPlugin does this for us.
//           // {
//           //   test: /\.(c|sa|sc)ss$/,
//           //   loader: extractCSS.extract({
//           //     loader: [
//           //       'css?sourceMap',
//           //       'postcss',
//           //       'resolve-url',
//           //       'sass?sourceMap',
//           //     ],
//           //     fallbackLoader: 'style-loader',
//           //   }),
//           // },

//           // Use the stage-0 / es2015 babel polyfill to give the browser
//           // what it needs to understand our code
//           {
//             test: /\.jsx?$/,
//             loader: 'babel',
//             query: {
//               presets: [
//                 ['es2015', {
//                   modules: false,
//                 }],
//                 'react',
//                 'stage-1',
//               ],
//               plugins: [
//                 'transform-decorators-legacy',
//                 path.join(PATHS.app, '../plugins/relay'),
//               ],
//             },
//           },
//         ],
//       },
//       plugins: [
//         new webpack.optimize.OccurrenceOrderPlugin(true),
//         new webpack.optimize.DedupePlugin(),
//         new webpack.optimize.AggressiveMergingPlugin(),
//         new webpack.optimize.UglifyJsPlugin(),
//         // extractCSS,
//       ],
//     }),

//     {
//       target: 'node',
//       entry: {
//         javascript: [
//           'babel-polyfill',
//           path.join(PATHS.app, 'server.js'),
//         ],
//       },
//       node: {
//         __dirname: true,
//       },
//       module: {
//         loaders: [
//           // {
//           //   test: /\.s(c|a)ss$/,
//           //   loader: 'css-loader/locals!sass',
//           // },
//           // {
//           //   test: /\.(png|woff|woff2|svg|ttf|eot|jpg)$/,
//           //   loader: 'file',
//           //   query: {
//           //     emitFile: false,
//           //     name: '/assets/[hash].[ext]',
//           //   },
//           // },
//           {
//             test: /\.jsx?$/,
//             exclude: /node_modules/,
//             loader: 'babel',
//           },
//         ],
//       },
//       plugins: [
//         new webpack.DefinePlugin({
//           SERVER: true,
//         }),
//       ],
//       output: {
//         path: PATHS.dist,
//         filename: 'server.js',
//       },
//       externals: nodeModules,
//       resolve,
//     },
//   ];
// }