import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { environment } from 'src/environments/environment.development';

@Component({

  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'investor-system';
  visited_routes: any = [];
  constructor(private router: Router) {
    console.log(environment.production);
  }

  ngOnInit(): void {
    console.log('app-started');
    // localStorage.removeItem('routes');
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.visited_routes = JSON.parse(localStorage.getItem('routes')) ?? [];
      let length = this.visited_routes.length;
      if(length === 0) {
        console.log('1');
        this.visited_routes.push(event.url);
      } else if(this.visited_routes[length-1] !== event.url) {
        console.log('2');
        this.visited_routes.push(event.url);
      }
      localStorage.setItem('routes', JSON.stringify(this.visited_routes));
      this.visited_routes = this.visited_routes.filter(() => false);
    });
  }
}
