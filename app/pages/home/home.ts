import {Component} from "@angular/core";
import {NavController, ItemSliding, Item} from 'ionic-angular';
import {DetailPage} from '../detail-page/detail-page';

import {LevelService} from '../../providers/level-service/level-service';
import {Level} from '../../level.ts';

@Component({
  templateUrl: 'build/pages/home/home.html',
  providers: [LevelService]
})
export class HomePage {
  public levels: Level[];

  constructor(public levelService: LevelService,
              public nav: NavController) {
    this.loadLevels();
  }

  loadLevels() {
    this.levelService.load()
      .subscribe(levelList => {
        this.levels = levelList;
      })
  }

  deleteLevel(level: Level, index:number) {
    this.levelService.delete(level)
        .subscribe(res => {
          this.levels.splice(index, 1);
        });
  }

  navToDetail(level: Level, index: number) {
    this.nav.push(DetailPage, {
      level: level,
      levels: this.levels,
      index: index
    });
  }

  navToAdd(level: Level, index: number) {
    this.nav.push(DetailPage, {
      level: level,
      levels: this.levels,
      index: index
    });
  }
}
