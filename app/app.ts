import {Component} from "@angular/core";
import {ionicBootstrap, Platform} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {DetailPage} from './pages/detail-page/detail-page';
import {HomePage} from './pages/home/home';



@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
})
export class MyApp {

  rootPage: any = HomePage;

  constructor(platform: Platform) {
    this.rootPage = HomePage;

    platform.ready().then(() => {
      StatusBar.styleDefault();
    });
  }
}

ionicBootstrap(MyApp);
