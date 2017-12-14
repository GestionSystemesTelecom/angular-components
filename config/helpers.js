const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const ts = require('typescript');
const fs = require('fs');

const EVENT = process.env.npm_lifecycle_event || '';

const DEFAULT_METADATA = {
    title: 'GST Components Demo',
    baseUrl: '/',
    isDevServer: isWebpackDevServer(),
    HMR: hasProcessFlag('hot'),
    AOT: process.env.BUILD_AOT || hasNpmFlag('aot'),
    E2E: !!process.env.BUILD_E2E,
    WATCH: hasProcessFlag('watch'),
    tsConfigPath: 'tsconfig.webpack.json',

    /**
     * This suffix is added to the environment.ts file, if not set the default environment file is loaded (development)
     * To disable environment files set this to null
     */
    envFileSuffix: ''
};


function supportES2015(tsConfigPath) {
    if (!supportES2015.hasOwnProperty('supportES2015')) {
        const tsTarget = readTsConfig(tsConfigPath).options.target;
        supportES2015['supportES2015'] = tsTarget !== ts.ScriptTarget.ES3 && tsTarget !== ts.ScriptTarget.ES5;
    }
    return supportES2015['supportES2015'];
}

function readTsConfig(tsConfigPath) {
    const configResult = ts.readConfigFile(tsConfigPath, ts.sys.readFile);
    return ts.parseJsonConfigFileContent(configResult.config, ts.sys,
        path.dirname(tsConfigPath), undefined, tsConfigPath);
}

function getEnvFile(suffix) {
    if (suffix && suffix[0] !== '.') {
        suffix = '.' + suffix;
    }

    if (suffix === null) {
        return;
    }

    let fileName = root(`demo-app/src/app/environment.ts`);
    if (fs.existsSync(fileName)) {
        return fileName;
    } else {
        throw new Error('Environment file not found.')
    }
}

/**
 * Read the tsconfig to determine if we should prefer ES2015 modules.
 * Load rxjs path aliases.
 * https://github.com/ReactiveX/rxjs/blob/master/doc/lettable-operators.md#build-and-treeshaking
 * @param supportES2015 Set to true when the output of typescript is >= ES6
 */
function rxjsAlias(supportES2015) {
    try {
        const rxjsPathMappingImport = supportES2015 ? 'rxjs/_esm2015/path-mapping' : 'rxjs/_esm5/path-mapping';
        const rxPaths = require(rxjsPathMappingImport);
        return rxPaths(root('node_modules'));
    } catch (e) {
        return {};
    }
}

function ngcWebpackSetup(prod, metadata) {
    if (!metadata) {
        metadata = DEFAULT_METADATA;
    }

    const buildOptimizer = prod;
    const sourceMap = true;
    const ngcWebpackPluginOptions = {
        skipCodeGeneration: !metadata.AOT,
        sourceMap
    };

    const environment = getEnvFile(metadata.envFileSuffix);
    if (environment) {
        ngcWebpackPluginOptions.hostReplacementPaths = {
            [root('src/environments/environment.ts')]: environment
        }
    }

    if (!prod && metadata.WATCH) {
        // Force commonjs module format for TS on dev watch builds.
        ngcWebpackPluginOptions.compilerOptions = {
            module: 'commonjs'
        };
    }

    const buildOptimizerLoader = {
        loader: '@angular-devkit/build-optimizer/webpack-loader',
        options: {
            sourceMap: false
        }
    };

    const loaders = [
        {
            test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
            use: metadata.AOT && buildOptimizer ? [buildOptimizerLoader, '@ngtools/webpack'] : ['@ngtools/webpack']
        },
        // TODO Bug : lorsque buildOptimizer===true cela génére une exception lors de l'exécution du script
        // Error: Unexpected value 't' imported by the module 't'. Please add a @NgModule annotation.
        /*...buildOptimizer
          ? [ { test: /\.js$/, use: [ buildOptimizerLoader ] } ]
          : []*/
    ];

    return {
        loaders,
        plugin: ngcWebpackPluginOptions
    };
}


exports.DEFAULT_METADATA = DEFAULT_METADATA;
exports.supportES2015 = supportES2015;
exports.readTsConfig = readTsConfig;
exports.getEnvFile = getEnvFile;
exports.rxjsAlias = rxjsAlias;
exports.ngcWebpackSetup = ngcWebpackSetup;

/**
 * Helper functions.
 */
var ROOT = path.resolve(__dirname, '..');

function hasProcessFlag(flag) {
    return process.argv.join('').indexOf(flag) > -1;
}

function hasNpmFlag(flag) {
    return EVENT.includes(flag);
}

function isWebpackDevServer() {
    return process.argv[1] && !!(/webpack-dev-server/.exec(process.argv[1]));
}


var root = path.join.bind(path, ROOT);

exports.hasProcessFlag = hasProcessFlag;
exports.hasNpmFlag = hasNpmFlag;
exports.isWebpackDevServer = isWebpackDevServer;
exports.root = root;

// Fonctions d’assistance internes
// -------------------------------

function buildCSSLoaders({ include, isProd = false, ext, name = null, useStyle = false }) {
    const result = {
        test: new RegExp(`\\.${ext}$`),
        use: [
            { loader: 'css-loader', options: { sourceMap: !isProd, importLoaders: 1 } },
            {
                loader: 'postcss-loader',
                options: {
                    plugins: loader => [
                        /*require('cssnano')({
                            autoprefixer: false,
                            discardComments: { removeAll: true },
                        }),*/
                        require('autoprefixer')({
                            remove: false,
                        }),
                    ],
                    sourceMap: !isProd,
                },
            },
        ],
        include
    }

    if (name && name !== 'css') {
        result.use.push({
            loader: `${name}-loader`,
            options: { sourceMap: !isProd },
        })
    }

    if (useStyle) {
        result.use.unshift('style-loader')
    }

    return result
}

let cssPlugin

function extractStyling({ include, isProd = false, ext, name }) {
    cssPlugin =
        cssPlugin ||
        new ExtractTextPlugin({
            filename: '[name].[contenthash:8].css',
            allChunks: true,
        })

    const { test, use } = buildCSSLoaders({ include, isProd, ext, name })

    return {
        plugins: [cssPlugin],
        module: {
            rules: [
                {
                    test,
                    use: cssPlugin.extract({
                        fallback: 'style-loader',
                        use,
                    }),
                    include,
                },
            ],
        },
    }
}

function loadStyling({ include, ext, name }) {
    return {
        module: {
            rules: [buildCSSLoaders({ include, ext, name, useStyle: true })],
        },
    }
}

var root = path.join.bind(path, ROOT);

// CSS, SASS & Stylus
// ------------------

exports.extractCSS = ({ include }) => extractStyling({ include, ext: 'css' })
exports.extractSASS = ({ include }) => extractStyling({ include, ext: 'scss', name: 'sass' })

exports.loadCSS = ({ include }) => loadStyling({ include, ext: 'css' })
exports.loadSASS = ({ include }) => loadStyling({ include, ext: 'scss', name: 'sass' })

// Minification
// ------------

exports.enableAutoMinifiers = () => ({
    plugins: [
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false,
        }),
    ],
});
