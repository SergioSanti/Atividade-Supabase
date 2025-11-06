import 'zone.js';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

console.log('main.ts carregado');

platformBrowserDynamic().bootstrapModule(AppModule)
  .then(() => {
    console.log('Angular inicializado com sucesso!');
  })
  .catch(err => {
    console.error('Erro ao inicializar Angular:', err);
  });

