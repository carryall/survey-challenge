const webpack = require('webpack')
require('dotenv').config();

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        API_BASE_URL: JSON.stringify(process.env.API_BASE_URL),
        API_VERSION: JSON.stringify(process.env.API_VERSION),
        API_CLIENT_ID: JSON.stringify(process.env.API_CLIENT_ID),
        API_CLIENT_SECRET: JSON.stringify(process.env.API_CLIENT_SECRET)
      }
    })
  ]
}
