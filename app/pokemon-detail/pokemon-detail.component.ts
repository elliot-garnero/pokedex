import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.css']
})
export class PokemonDetailComponent implements OnInit {

  pokemon: any;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService) { }

  ngOnInit(): void {
    const pokemonName = this.route.snapshot.url[1].path;
    this.getPokemon(pokemonName);
  }

  getPokemon(name: any) {
    this.dataService.getOne(name)
    .subscribe((res: any) => {
      console.log(res);
      this.pokemon = res;
    })
  }
}
