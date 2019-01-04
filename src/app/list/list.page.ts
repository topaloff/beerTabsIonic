import { Component, OnInit } from '@angular/core';
import { BeerService } from '../beer.service';
import { Beer } from '../beer';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {


  liste: any[] = [];
  beers$: Observable<Beer[]>;

  constructor(private beerService: BeerService) { }

  ngOnInit() {
    this.getBeers();
  }

  //Add beer to show
  beerSubmit = function(beer){
    this.liste.push(beer)
  }

  //Get beers from service and transform into an array
  getBeers() {
    this.beerService.getBeers()
     .subscribe(data => {
      let cle = Object.keys(data);
      let donnees = Object.values(data);
      for(let i = 0; i < cle.length; i++){
        this.liste.push({key: cle[i], values:donnees[i]});
      }
      console.log(this.liste);
     });
   }

   deleteBeer(key){
     this.beerService.deleteBeer(key).subscribe();
     this.liste = this.liste.filter(liste => liste.key !== key);
   }
  }
