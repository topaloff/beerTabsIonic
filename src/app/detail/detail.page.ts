import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BeerService } from '../beer.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  key: string;
  beer: Object;

  constructor(private route: ActivatedRoute, private http: HttpClient, private beerService: BeerService) {
    this.route.params
    .subscribe( params => {
      this.key = params.key;
      console.log(this.key);
    })
   }

   ngOnInit() {
    this.getBeerByKey(this.key);
  }

  getBeerByKey(key){
    this.beerService.getBeerByKey(key)
    .subscribe(data => {
     this.beer = data;
    });
  }

}
