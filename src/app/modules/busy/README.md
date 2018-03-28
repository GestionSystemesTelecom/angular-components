# Busy loader

Loading indicator base on [Angular 4+ Spin.js Demo App )](https://github.com/seanlmcgill/ng2spin/).

Features:

* Can be called from anywhere.
* The loader `show` method can be called multiple times, only one instance will be displayed.
* If the loader `show` method has been called several times by various actions, the loader will stop only once the last call of the `stop` method called.
* The loader display has a minimum lifespan, which avoids strobe effect.

# Installation

* install library: `npm install gst-components`
* add module import declaration

```typescript
import { BusyModule } from 'gst-components';
  @NgModule({
    imports: [
      BusyModule
    ]
  })
```

Add this chunk of html in your top app component:

```html
<gst-busy>Put here the loader you want or some text</gst-busy>
```

# Usage

When you need to fireup loading indicator, call the service `BusyService`.

```typescript
import { Component } from '@angular/core';
import { BusyService } from 'gst-components';

@Component({
// ...
})
export class HomeComponent {
    constructor(
        private busyService: BusyService
    ) {}

    public loadingBusy() {
        // launch the loader
        this.busyService.show();
        // stop the loader
        this.busyService.hide();
    }
}
```