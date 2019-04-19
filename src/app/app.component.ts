import { Component, OnInit } from '@angular/core';
import { HeroService } from './hero.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public heros;
  constructor(private heroService: HeroService) {}


  ngOnInit(): void {
    this.heroService.getHeroes().subscribe(
      heros => {
        this.heros = heros;
      }
    );
  }


}
