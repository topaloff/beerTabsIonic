import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BeerService } from '../beer.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  constructor(private router:Router, private beerService: BeerService) { }

  ngOnInit() {
  }


  onSubmit(form){
      this.beerService.addBeer(form.form.value)
        .subscribe(beer => {
          this.router.navigateByUrl('');
        });
    }


}
