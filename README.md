# MFTest

This project is a test of WebPack 5 Module Federation with Angular 11

## Build

Run `npm run build` to build both shell and mfe1 remote

## Start

Run `npm start` to start both shell (port 5000) and mfe1 (port 3000)

## Problems

This project originally have been created to explore a bug with Angular injector. If TestComponent, inside mfe1 remote, is loaded with constructor signature with HttpClient reference, the module loading fail with this error:

ERROR Error: Uncaught (in promise): NullInjectorError: R3InjectorError(AppModule)[HttpClient -> HttpClient -> HttpClient]: 
  NullInjectorError: No provider for HttpClient!
NullInjectorError: R3InjectorError(AppModule)[HttpClient -> HttpClient -> HttpClient]: 
  NullInjectorError: No provider for HttpClient!
  ...
  at NodeInjectorFactory.TestComponent_Factory [as factory] (test.component.ts:8)
  ...

To see the error, comment empty constructor and uncomment contructor with HttpClient in file test.component.ts

import {  Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  //constructor(http:HttpClient) { }
  
  constructor() { }   //comment this line and uncomment the line above to see the error

  ngOnInit(): void {
  }

}

## Solution

The solution was simple.  I did not understand that the "shared" part of webpack.config.js means "sharing namespaces" and not "packages".
The problem is solved adding a row to both webpack.config.js, as it follows:

shared: {
"@angular/core": { singleton: true, strictVersion: true },
"@angular/common": { singleton: true, strictVersion: true },
"@angular/common/http": { singleton: true, strictVersion: true }, <====this was the missing line!
"@angular/router": { singleton: true, strictVersion: true },
}

Now it works perfectly!

## Credits

This project is based on Webpack 5 module federation and AngularArchitect.
Many Thanks to Manfred Steyer (https://www.angulararchitects.io) for his brilliant blog post on Angular and module federation

## References

https://www.angulararchitects.io/aktuelles/the-microfrontend-revolution-module-federation-in-webpack-5/
https://www.npmjs.com/package/@angular-architects/module-federation/v/1.2.3
