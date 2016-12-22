var webpack = require('webpack');

module.exports = {
  entry: [
    // 'script!jquery/dist/jquery.min.js',
    // 'script!foundation-sites/dist/js/foundation.min.js',
    './app/app.jsx'
  ],
  // externals: {
  //   jquery: 'jQuery'
  // },
  plugins: [
    // new webpack.ProvidePlugin({
    //   '$': 'jquery',
    //   'jQuery': 'jquery'
    // })
    // Uncomment in production
    // new webpack.optimize.UglifyJsPlugin({
    //   beautify: false,
    //   comments: false,
    //   compress: {
    //     warnings: false,
    //     drop_console: false //change to True in Production
    //   },
    //   mangle: {
    //     excrpt : ['$'],
    //     screw_ie8 : true,
    //     keep_fnames: true
    //   }
    // }),
    // new webpack.optimize.DedupePlugin(),
    // new webpack.DefinePlugin({
    //     'process.env': {
    //         'NODE_ENV': JSON.stringify('production')
    //     }
    // })
  ],
  output: {
    path: __dirname,
    filename: './public/bundle.js'
  },
  resolve: {
    root: __dirname,
    alias: {
      Router: 'app/Router.jsx',
      Reducers: 'app/reducers/Reducers.jsx',
      Actions: 'app/actions/Actions.jsx',
      configureStore: 'app/store/ConfigureStore.jsx',
      Main: 'app/components/Main.jsx',
      BeerFactory: 'app/components/BeerFactory.jsx',
      Game: 'app/components/Game.jsx',
      Login: 'app/components/Login.jsx',
      API: 'app/api/API.js',
      Instruction: 'app/components/Instruction.jsx',
      applicationStyles: 'app/styles/app.scss'
    },
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0']
        },
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/
      }
    ]
  },
  devtool: 'source-map'
};
