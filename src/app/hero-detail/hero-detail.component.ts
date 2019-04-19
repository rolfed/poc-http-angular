import { Component, OnInit } from '@angular/core';
import { HeroService } from '../hero.service';
import { Hero } from '../hero.model';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit {
  public hero: Hero;

  constructor(
    private heroService: HeroService
  ) { }

  ngOnInit() {
  }

  save(): void {
    this.heroService.updateHero(this.hero)
      .subscribe(() => this.goBack());
  }

  goBack() {}
}
