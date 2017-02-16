# Modal

# Usage

* install library: `npm install @gst/component`
* add module import declaration

```typescript
  import { BrowserModule } from '@angular/platform-browser';
  import { NgModule } from '@angular/core';
  import { FormsModule } from '@angular/forms';
  import { HttpModule } from '@angular/http';

  import { AppComponent } from './app.component';
  import { ModalModule } from '@gst/components';

  @NgModule({
    declarations: [
      AppComponent
    ],
    imports: [
      BrowserModule,
      FormsModule,
      HttpModule,
      ModalModule
    ],
    providers: [],
    bootstrap: [AppComponent]
  })
```

* Define jQuery for Webpack:

```js
module.exports = function (options) {
    // ...
    module: {
      rules: [
          { test: /bootstrap\/dist\/js\/umd\//, loader: 'imports?jQuery=jquery' }
      ]
    plugins: [
      new ProvidePlugin({
        jQuery: 'jquery',
        $: 'jquery',
        jquery: 'jquery'
      }),
    ]
    }
 // ...
```



