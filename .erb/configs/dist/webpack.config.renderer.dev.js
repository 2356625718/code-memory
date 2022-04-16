"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var path_1 = require("path");
var fs_1 = require("fs");
var webpack_1 = require("webpack");
var html_webpack_plugin_1 = require("html-webpack-plugin");
var chalk_1 = require("chalk");
var webpack_merge_1 = require("webpack-merge");
var child_process_1 = require("child_process");
var webpack_config_base_1 = require("./webpack.config.base");
var webpack_paths_1 = require("./webpack.paths");
var check_node_env_1 = require("../scripts/check-node-env");
var react_refresh_webpack_plugin_1 = require("@pmmmwh/react-refresh-webpack-plugin");
console.log('path:', webpack_paths_1["default"].srcRendererPath + '/static/style/common.less');
// When an ESLint server is running, we can't set the NODE_ENV so we'll check if it's
// at the dev webpack config is not accidentally run in a production environment
if (process.env.NODE_ENV === 'production') {
    check_node_env_1["default"]('development');
}
var port = process.env.PORT || 1212;
var manifest = path_1["default"].resolve(webpack_paths_1["default"].dllPath, 'renderer.json');
var requiredByDLLConfig = module.parent.filename.includes('webpack.config.renderer.dev.dll');
/**
 * Warn if the DLL is not built
 */
if (!requiredByDLLConfig &&
    !(fs_1["default"].existsSync(webpack_paths_1["default"].dllPath) && fs_1["default"].existsSync(manifest))) {
    console.log(chalk_1["default"].black.bgYellow.bold('The DLL files are missing. Sit back while we build them for you with "npm run build-dll"'));
    child_process_1.execSync('npm run postinstall');
}
var configuration = {
    devtool: 'inline-source-map',
    mode: 'development',
    target: ['web', 'electron-renderer'],
    entry: [
        "webpack-dev-server/client?http://localhost:" + port + "/dist",
        'webpack/hot/only-dev-server',
        'core-js',
        'regenerator-runtime/runtime',
        path_1["default"].join(webpack_paths_1["default"].srcRendererPath, 'index.tsx'),
    ],
    output: {
        path: webpack_paths_1["default"].distRendererPath,
        publicPath: '/',
        filename: 'renderer.dev.js',
        library: {
            type: 'umd'
        }
    },
    module: {
        rules: [
            {
                test: /\.s?css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            sourceMap: true,
                            importLoaders: 1
                        }
                    },
                    'sass-loader',
                ],
                include: /\.module\.s?(c|a)ss$/
            },
            {
                test: /\.s?css$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
                exclude: /\.module\.s?(c|a)ss$/
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            sourceMap: true,
                            importLoaders: 1
                        }
                    },
                    'less-loader',
                    {
                        loader: 'style-resources-loader',
                        options: {
                            patterns: webpack_paths_1["default"].srcRendererPath + '/static/style/common.less'
                        }
                    }
                ],
                include: /\.module\.less$/
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader', {
                        loader: 'style-resources-loader',
                        options: {
                            patterns: webpack_paths_1["default"].srcRendererPath + '/static/style/common.less'
                        }
                    }],
                exclude: /\.module\.less$/
            },
            // Fonts
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource'
            },
            // Images
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource'
            },
        ]
    },
    plugins: __spreadArrays((requiredByDLLConfig
        ? []
        : [
            new webpack_1["default"].DllReferencePlugin({
                context: webpack_paths_1["default"].dllPath,
                manifest: require(manifest),
                sourceType: 'var'
            }),
        ]), [
        new webpack_1["default"].NoEmitOnErrorsPlugin(),
        /**
         * Create global constants which can be configured at compile time.
         *
         * Useful for allowing different behaviour between development builds and
         * release builds
         *
         * NODE_ENV should be production so that modules do not perform certain
         * development checks
         *
         * By default, use 'development' as NODE_ENV. This can be overriden with
         * 'staging', for example, by changing the ENV variables in the npm scripts
         */
        new webpack_1["default"].EnvironmentPlugin({
            NODE_ENV: 'development'
        }),
        new webpack_1["default"].LoaderOptionsPlugin({
            debug: true
        }),
        new react_refresh_webpack_plugin_1["default"](),
        new html_webpack_plugin_1["default"]({
            filename: path_1["default"].join('index.html'),
            template: path_1["default"].join(webpack_paths_1["default"].srcRendererPath, 'index.ejs'),
            minify: {
                collapseWhitespace: true,
                removeAttributeQuotes: true,
                removeComments: true
            },
            isBrowser: false,
            env: process.env.NODE_ENV,
            isDevelopment: process.env.NODE_ENV !== 'production',
            nodeModules: webpack_paths_1["default"].appNodeModulesPath
        }),
    ]),
    node: {
        __dirname: false,
        __filename: false
    },
    // @ts-ignore
    devServer: {
        port: port,
        compress: true,
        hot: true,
        headers: { 'Access-Control-Allow-Origin': '*' },
        static: {
            publicPath: '/'
        },
        historyApiFallback: {
            verbose: true
        },
        onBeforeSetupMiddleware: function () {
            console.log('Starting Main Process...');
            child_process_1.spawn('npm', ['run', 'start:main'], {
                shell: true,
                env: process.env,
                stdio: 'inherit'
            })
                .on('close', function (code) { return process.exit(code); })
                .on('error', function (spawnError) { return console.error(spawnError); });
        }
    }
};
exports["default"] = webpack_merge_1.merge(webpack_config_base_1["default"], configuration);
