import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { getTranslationProviders } from './i18n-providers';

import { AppModule } from './app.module';

const platform = platformBrowserDynamic();

enableProdMode();

// platform.bootstrapModule( AppModule );

getTranslationProviders().then(providers => {
	const options = { providers };
	platform.bootstrapModule( AppModule, options);
});


