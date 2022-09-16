import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {

  pokemons: any[] = [];
  page = 1;
  totalPokemons = 0;
  pokemonType = 'all';

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.pokemonType = this.route.snapshot.url[1].path;
    this.getPokemons(this.pokemonType);
  }

  getPokemons(pokemonType: string) {
    this.pokemonType = this.route.snapshot.url[1].path;
    if (this.pokemonType === 'all') {
      this.dataService.getAll(10, this.page + 0)
      .subscribe((res: any) => {
        this.totalPokemons = res.count;
        this.pokemons = [];
        res.results.forEach((element: any) => {
          this.dataService.getOne(element.name)
          .subscribe((res2: any) => {
            this.pokemons.push(res2);
          })
        });
      })
    } else {
      this.dataService.getType(this.pokemonType, this.page + 0)
      .subscribe((data: any) => {
        this.totalPokemons = data.count;
        this.pokemons = [];
        data.pokemon.forEach((element: any) => {
          this.dataService.getOne(element.pokemon.name)
          .subscribe((res2: any) => {
            this.pokemons.push(res2);
          })
        });
      })
    }
  }
}
