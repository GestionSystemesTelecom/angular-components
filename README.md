# GST Component for angular [![npm][npm-image]][npm-url] [![Dependency Status][david-image]][david-url] [![Build Status][travis-image]][travis-url]


Graphical components for Angular >= 2.x.

## Component

 * [Modal](components/modal/README.md): extend the [ng-bootstrap](https://github.com/ng-bootstrap/ng-bootstrap) modal for integrating Angular component inside.
 * [Busy looader](components/busy/README.md): Loading indicator

## Usage

Like usual `npm install gst-components --save-dev`

If by pure hazard this error is thrown :

```bash
[at-loader] Checking finished with 1 errors
[at-loader] node_modules\gst-components\components\shared\drag.ts:1:16
    TS2304: Cannot find name 'JQueryStatic'.
```

just run this command `npm install @types/jquery --save-dev` and everything would be fine.

## Demo App

Nothing really heavy, just some components that we can't found yet

> The demo app si based on [AngularClass](https://github.com/AngularClass/angular2-webpack-starter) (big thanks !)

> The loading indicator is based on [Angular 4+ Spin.js Demo App ](https://github.com/seanlmcgill/ng2spin/)

## Dependencies

* [ng-bootstrap](https://github.com/ng-bootstrap/ng-bootstrap)
* [jquery](https://github.com/jquery/jquery)

## Build package for NPM

```bash
npm run build:component
npm publish dist
```


[npm-url]: https://www.npmjs.com/package/gst-components
[npm-image]: https://img.shields.io/npm/v/gst-components.svg
[david-url]: https://david-dm.org/GestionSystemesTelecom/angular-components.svg
[david-image]: https://img.shields.io/david/GestionSystemesTelecom/angular-components.svg
[travis-url]: https://travis-ci.org/GestionSystemesTelecom/angular-components
[travis-image]: https://travis-ci.org/GestionSystemesTelecom/angular-components.svg?branch=master
