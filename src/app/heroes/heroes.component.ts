import { Component, OnInit } from '@angular/core';

// 匯入hero類
import { Hero } from '../hero';

import { HeroService } from '../hero.service';

declare let gtag: any;

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {

  heroes: Hero[];
  time: Date;

  constructor(
    private heroService: HeroService
  ) { }

  ngOnInit(): void {
    this.getHeroes();
    this.time = new Date();
  }

  getHeroes(): void {
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
        gtag('event', 'add', {
          event_category: 'test',
          test: 500
        });
        gtag('event', 'screen_view', {
          app_name: 'myAppName',
          screen_name: 'Home'
        });
        gtag('event', 'exception', {
          description: 'error_description',
          fatal: false   // set to true if the error is fatal
        });
        gtag('set', {
          currency: 'USD',
        });
      });
  }

  delete(hero: Hero): void {
    const tm = new Date();
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe(() => {

      gtag('set', {time: tm.getTime() - this.time.getTime()});
      gtag('event', 'delete_click', {
        event_category: 'test',
        event_label: hero.name,
        ddd: 80,
        ccc: 1
      });
    });
  }

}
