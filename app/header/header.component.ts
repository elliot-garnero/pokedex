import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  error = false;
  errorType = false;
  page = 1;

  constructor(private router: Router,private dataService: DataService) { }

  ngOnInit(): void {
  }

  searchPokemon(e: any) {
    this.error = false;
    this.dataService.getOne(e.target.value)
    .subscribe(
      (data) => {
        this.router.navigateByUrl(`/pokemonDetailComponent/${e.target.value}`);
      },
      (err) => {
        this.error = true;
        this.router.navigateByUrl('/pokemonListComponent/all');
      },
    );
  }

  searchType(e: any) {
    this.errorType = false;
    this.dataService.getType(e.target.value, this.page + 0)
    .subscribe(
      (data) => {
        this.router.navigateByUrl(`/pokemonListComponent/${e.target.value}`);
      },
      (err) => {
        this.errorType = true;
        this.router.navigateByUrl('/pokemonListComponent/all');
      },
    );
  }
}
