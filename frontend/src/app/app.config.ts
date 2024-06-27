import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';

import { SignalRService } from './services/signal-r.service';
import { SIGNALR_SERVICE_TOKEN } from './Interfaces/isignal-rservice';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    {
      provide: SIGNALR_SERVICE_TOKEN, useClass: SignalRService
    }
  ]
};
