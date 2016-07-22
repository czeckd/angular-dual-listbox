import {bootstrap}    from '@angular/platform-browser-dynamic';
import {disableDeprecatedForms, provideForms} from '@angular/forms';

import {DemoAppComponent} from './demo-app.component';

bootstrap(DemoAppComponent, [ disableDeprecatedForms(), provideForms() ]);
