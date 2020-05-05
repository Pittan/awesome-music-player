# NgxMusicKit

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.4.

# How to use
1. Create an entry point to `index.html`
   ```html
   <html>
     <head></head>
     <body>
       <app-root></app-root>
       <!-- Add this entry point -->
       <div id="music-kit-js-entry" style="display: none;"></div>
     </body>
   </html>
   ```
1. Import `NgxMusicKitModule` to your AppModule
   ```ts
   import { NgxMusicKitModule } from 'ngx-music-kit'
   
   @NgModule({
     imports: [
       // ...
       NgxMusicKitModule
     ]
   })
   export class AppModule { }
   ```
1. Inject to component
   ```ts
   @Component({ /* ... */ })
   export class AwesomeComponent {
     constructor(
       private musicKit: NgxMusicKitService     
     ) {}
   }
   ```
   
1. Activate it!

   ```ts
   export class AppComponent {
     constructor(/* ... */) {}
      
     ngOnInit (){
       this.musicKit.initClient({
         developerToken: '...',
         app: { name: '...', build: '...' }
       }).then(() => {
         // If user is not authorized, open login window
         if (!this.musicKit.musicKitInstance.isAuthorized) {
           this.musicKit.authorize()
           return
         }
       })
     }
   }
   ```
   
1. Once you initialized the client, you can use it from anywhere!

## Code scaffolding

Run `ng generate component component-name --project ngx-music-kit` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module --project ngx-music-kit`.
> Note: Don't forget to add `--project ngx-music-kit` or else it will be added to the default project in your `angular.json` file. 

## Build

Run `ng build ngx-music-kit` to build the project. The build artifacts will be stored in the `dist/` directory.

## Publishing

After building your library with `ng build ngx-music-kit`, go to the dist folder `cd dist/ngx-music-kit` and run `npm publish`.

## Running unit tests

Run `ng test ngx-music-kit` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
