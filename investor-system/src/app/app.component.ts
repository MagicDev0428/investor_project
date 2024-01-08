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
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      if(event.url === '/front-page') {
        localStorage.removeItem('routes');
    }
      this.visited_routes = JSON.parse(localStorage.getItem('routes')) ?? [];
      let length = this.visited_routes.length;
      if(length === 0) {
        this.visited_routes.push(event.url);
      } else if(this.visited_routes[length-1] !== event.url) {
        this.visited_routes.push(event.url);
      }
      localStorage.setItem('routes', JSON.stringify(this.visited_routes));
      this.visited_routes = this.visited_routes.filter(() => false);
    });
  }
}
