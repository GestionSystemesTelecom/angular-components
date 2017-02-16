# Dependencies

* [ng-bootstrap](https://github.com/ng-bootstrap/ng-bootstrap)
* [jquery](https://github.com/jquery/jquery)

# Demo App

Nothing really heavy, just some components that we can't found yet

> The demo app si based on [AngularClass](https://github.com/AngularClass/angular2-webpack-starter) (big thanks !)

## Component

 * [Modal](Components/modal/README.md): extend the [ng-bootstrap](https://github.com/ng-bootstrap/ng-bootstrap) modal for integrating Angular component inside.

## Usage

Like usual `npm install gst-components --save-dev`

If by pure hazard this error is thrown :

```bash
[at-loader] Checking finished with 1 errors
[at-loader] node_modules\gst-components\components\shared\drag.ts:1:16
    TS2304: Cannot find name 'JQueryStatic'.
```

just run this command `npm install @types/jquery --save-dev` and everything would be fine.
