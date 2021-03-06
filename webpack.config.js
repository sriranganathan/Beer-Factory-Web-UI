var webpack = require('webpack');

module.exports = {
  entry: [
    './app/app.jsx'
  ],
  plugins: [
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
      Actions: 'app/actions/Actions.jsx',
      advanceTurn: 'app/api/advanceTurn.jsx',
      Advertise: 'app/components/GameActions/Advertise.jsx',
      Advertisement: 'app/components/MenuComponents/Advertisement.jsx',
      API: 'app/api/API.js',
      applicationStyles: 'app/styles/app.scss',
      Assistant: 'app/components/Assistant.jsx',
      BeerFactory: 'app/components/BeerFactory.jsx',
      BuildWarehouse: 'app/components/GameActions/BuildWarehouse.jsx',
      configureStore: 'app/store/ConfigureStore.jsx',
      Demand: 'app/components/MenuComponents/Demand.jsx',
      EmptySpace: 'app/components/MenuComponents/EmptySpace.jsx',
      FinalizeSupply: 'app/components/GameActions/FinalizeSupply.jsx',
      Game: 'app/components/Game.jsx',
      helpers: 'app/helpers/helpers.js',
      Inactive: 'app/components/MenuComponents/Inactive.jsx',
      Instruction: 'app/components/Instruction.jsx',
      LayoutElement: 'app/components/LayoutElement.jsx',
      LayoutList: 'app/components/LayoutList.jsx',
      Leaderboard: 'app/components/Leaderboard.jsx',
      Loader: 'app/components/Loader.jsx',
      Login: 'app/components/Login.jsx',
      Main: 'app/components/Main.jsx',
      MenuElement: 'app/components/MenuElement.jsx',
      MenuStyles: 'app/styles/menu.js',
      Navbar: 'app/components/Navbar.jsx',
      Notifications: 'app/components/MenuComponents/Notifications.jsx',
      Order: 'app/components/GameActions/Order.jsx',
      PendingActions: 'app/components/MenuComponents/PendingActions.jsx',
      PendingOrderElement: 'app/components/MenuComponents/PendingOrderElement.jsx',
      PendingSupplyElement: 'app/components/MenuComponents/PendingSupplyElement.jsx',
      Popularity: 'app/components/MenuComponents/Popularity.jsx',
      Reducers: 'app/reducers/Reducers.jsx',
      Reset: 'app/components/Reset.jsx',
      Retailer: 'app/components/MenuComponents/Retailer.jsx',
      Router: 'app/Router.jsx',
      SideBar: 'app/components/SideBar.jsx',
      Supply: 'app/components/GameActions/Supply.jsx',
      Stock: 'app/components/MenuComponents/Stock.jsx',
      Toastr: 'app/components/Toastr.jsx',
      TotalDemands: 'app/components/MenuComponents/TotalDemands.jsx',
      Upgrade: 'app/components/GameActions/Upgrade.jsx',
      UserFactory: 'app/components/MenuComponents/UserFactory.jsx',
      Warehouse: 'app/components/MenuComponents/Warehouse.jsx'
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
      }, {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: "file-loader?name=./images/[name].[ext]"
      }
    ]
  },
  devtool: 'source-map'
};
