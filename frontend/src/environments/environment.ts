// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// const server = 0
// get myEnvironment(){

// }

export const environment = {
  
  production: false,
  // recipes_url: 'http://192.168.1.103:3000/recipes/',
  // users_url: 'http://192.168.1.103:3000/users/',
  // auth_url: 'http://192.168.1.103:3000/auth/',
  // images_url: 'http://192.168.1.103:3000/images/'
  // recipes_url: 'http://25.68.31.39:3000/recipes/',
  // users_url: 'http://25.68.31.39:3000/users/',
  // auth_url: 'http://25.68.31.39:3000/auth/',
  // images_url: 'http://25.68.31.39:3000/images/'
  recipes_url: 'http://127.0.0.1:3000/recipes/',
  users_url: 'http://127.0.0.1:3000/users/',
  auth_url: 'http://127.0.0.1:3000/auth/',
  images_url: 'http://127.0.0.1:3000/images/'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
