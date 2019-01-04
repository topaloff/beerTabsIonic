import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BeerService } from '../beer.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

  key: string;
  beer:Object;

  constructor(private route: ActivatedRoute, private http: HttpClient, private beerService: BeerService, private router: Router) {
    //Get the key
    this.route.params
    .subscribe( params => {
                  this.key = params.key;
                  console.log(params.key);
                })
   }

  ngOnInit() {
    this.getBeerByKey(this.key);
  }

  //Get the beer
  getBeerByKey(key){
    this.beerService.getBeerByKey(key)
    .subscribe(data => {
     this.beer = data;
     console.log(typeof(this.beer));
    });
  }

  //Edit beer
  onSubmit(form){
    this.beerService.editBeer(form.form.value, this.key)
      .subscribe(beer => {
        this.router.navigateByUrl('');
      });
  }

}
