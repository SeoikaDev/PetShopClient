// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  apiEndpoint : "http://localhost:5000/api/v1/",
  production: false,
  firebaseConfig : {
    apiKey: "AIzaSyDefHwxzMy9Amj74OlGC9WEKgb8e0JJRAU",
    authDomain: "petbest.firebaseapp.com",
    projectId: "petbest",
    storageBucket: "petbest.appspot.com",
    messagingSenderId: "972762747889",
    appId: "1:972762747889:web:312b19d4358a8737902a50"
  },

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
