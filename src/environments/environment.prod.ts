import { FUNCTIONS_ORIGIN } from '@angular/fire/functions/functions';

export const environment = {
  production: true,
  FirebaseFunctionsOriginProvider: {
    provide: FUNCTIONS_ORIGIN, useValue: null
  }
};
