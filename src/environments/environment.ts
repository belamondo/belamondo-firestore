// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

import { initializeApp } from 'firebase';

export const environment = {
    apiKey: "AIzaSyAeiSz030JxWL7EwHv5nfzO7GmH_AHJI1E",
    authDomain: "bela-mondo.firebaseapp.com",
    databaseURL: "https://bela-mondo.firebaseio.com",
    projectId: "bela-mondo",
    storageBucket: "bela-mondo.appspot.com",
    messagingSenderId: "505721506022"
};

export const fbAuth = initializeApp(environment, 'auth').auth();
