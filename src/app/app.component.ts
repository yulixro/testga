import { Component, OnInit } from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {distinctUntilChanged} from 'rxjs/operators';

declare let gtag: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Tour of Heroes';

  constructor(private router: Router) {}

  ngOnInit(): void {
    gtag('set', {
      user: '菜鳥'
    });
    this.router.events
      // distinctUntilChanged 和 distinct一樣會把相同的元素過濾掉，但只會跟最後一次送出的元素比較
      .pipe(distinctUntilChanged((previous: any, current: any) => {
        if (current instanceof NavigationEnd) {
          return previous.url === current.url;
        }
        return true;
      }))
      .subscribe(
        (x: any) => {
          gtag('event', 'page_view', {page_path: x.url});
      });

    if (window.performance) {
      // Gets the number of milliseconds since page load
      // (and rounds the result since the value must be an integer).
      const timeSincePageLoad = Math.round(performance.now());
      // Sends the timing event to Google Analytics.
      gtag('event', 'timing_complete', {
        name: 'load',
        value: timeSincePageLoad,
        event_category: 'JS Dependencies'
      });
    }
  }
}
