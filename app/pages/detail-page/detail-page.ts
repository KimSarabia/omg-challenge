import {Component} from "@angular/core";
import {NavController, NavParams} from 'ionic-angular';
import {LevelService} from '../../providers/level-service/level-service';
import {HomePage} from '../home/home';
import {Level} from '../../level.ts';

@Component({
  templateUrl: 'build/pages/detail-page/detail-page.html',
  providers: [LevelService]
})
export class DetailPage {
  public level: Level;    // The level itself
  public levels: Level[]; // The list of levels from the main page
  public index: number; // The index of the level we're looking at

  constructor(public levelService: LevelService, public nav: NavController, public navParams: NavParams ) {
    this.level = navParams.get('level');
    this.levels = navParams.get('levels');
    this.index = navParams.get('index');
  }

  navToHome(level: Level, index: number) {
    this.nav.push(HomePage, {
      level: level,
      levels: this.levels,
      index: index
    });
  }


}
