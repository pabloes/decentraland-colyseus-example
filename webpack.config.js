var path = require('path');
var webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const exec = require('child_process').exec;
const fs = require('fs');

module.exports = function(env = {}, argv){
  console.log("env", env);
  return {
    mode: 'production',
    entry: './src/game.ts',
    output: {
      path: path.resolve(__dirname, 'src'),
      filename: "_game.ts"
    },
    resolve: {
      // Add `.ts` and `.tsx` as a resolvable extension.
      extensions: [".ts", ".js"],      
    },
    module: {
      rules: [
        {
          test: /\.(t|j)sx?$/, 
          use: [
           
            {
              loader: "ts-loader", 
              options: {
                transpileOnly: true,   
                configFile:'webpack.tsconfig.json'
              } 
            }   
          ]
        }
      ]
    },
    optimization: {
      minimize: true,//env.production?true:false
      minimizer:[
        new TerserPlugin({
          test: /\.(t|j)s$/i,
          terserOptions: {
            ecma: 2016,
            target: 'commonjs',
            warnings: false,
            parse: {
              ecma:2016
            },
            compress: {
              ecma:2016,
              defaults:false,
              arrows:true,
              arguments:true,
              booleans:true,
              booleans_as_integers:true,
              collapse_vars:true,
              comparisons:true,
              computed_props:true,
              conditionals:true,
              dead_code:true,
              directives:true,
              evaluate:true,
              expression:false,
              global_defs:{},
              hoist_funs:false,
              hoist_props:true,
              hoist_vars:false,
              if_return:true,
              inline:false,
              join_vars:true,
              keep_classnames:false,
              keep_fargs:false,
              keep_fnames:false,
              keep_infinity:false,
              loops:true,
              module:true,
              negate_iife:false,
              passes:1,
              drop_console:env.production?true:false,
              /* properties:true,
              pure_funcs:null, //[ Math.floor ] //TODO REVIEW MORE
              pure_getters:true,
              reduce_vars:true,
              sequences:true,
              side_effects:true,
              switches:true,
              toplevel:false */
            },
            mangle: {
              keep_classnames: false,
              //keep_quoted: false,
            }, // Note `mangle.properties` is `false` by default.
            module: true,
            output: {
              beautify:false,
              braces:false,
              comments:false,
              ecma:2016
            },
            toplevel: true,
            nameCache: null,
            ie8: false,
            keep_classnames: true,
            keep_fnames: false,
            keep_fargs: false,
            safari10: false,
          }
        }),
      ]
    },
    plugins:[
      new webpack.BannerPlugin({banner:`import { getUserData } from "@decentraland/Identity";import { getCurrentRealm } from "@decentraland/EnvironmentAPI";`, raw:true, entryOnly:true})
    ]
  };
}