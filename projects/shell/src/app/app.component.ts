import { Component, ComponentFactoryResolver, Injector, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { loadRemoteModule } from '@angular-architects/module-federation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'shell';

  @ViewChild('placeHolder', { read: ViewContainerRef, static: true })
  viewContainer: ViewContainerRef;

  constructor(
    private injector: Injector,
    private cfr: ComponentFactoryResolver) { }

  async ngOnInit() {

    //Loading component from remote
    /*
    It's necessary:
      the remote name (mfe1) 
      exposedModule name (./Component) 
      the name of the component to create (AppComponent)
      remote entry url

      In the remote there must be these settings in webpack.config.js      
    */

    /*
      Loading and creating first remote component
    */
    const component = await loadRemoteModule({
      remoteEntry: 'http://localhost:3000/remoteEntry.js',
      remoteName: 'mfe1',
      exposedModule: './Component'
    }).then(m => m["AppComponent"]);


    //Create component factory
    const factory = this.cfr.resolveComponentFactory(component);
    //Crete component dynamically and host it in the placeholder
    this.viewContainer.createComponent(factory, null, this.injector);

    /*
      Loading and creating second remote component
      WARNING! If TestComponent expose in constructor signature a reference to HttpClient, the creation of component fail
    */
    const component2 = await loadRemoteModule({
      remoteEntry: 'http://localhost:3000/remoteEntry.js',
      remoteName: 'mfe1',
      exposedModule: './Test'
    }).then(m => m["TestComponent"]);

    //Create component factory
    const factory2 = this.cfr.resolveComponentFactory(component2);
    //Crete component dynamically and host it in the placeholder
    this.viewContainer.createComponent(factory2, null, this.injector);
  }

}

