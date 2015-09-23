import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'
import config from './webpack.config'

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
  contentBase: "./src",
  noInfo: true, //  --no-info option
  inline: true,
}).listen(3000, 'localhost',  (err, result)=>{
    if (err) {
      console.log(err)
    }
    console.log('Klarna is listening at localhost:3000 to develop best Klarna Shapes')
  })