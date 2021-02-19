import { Component, OnDestroy, OnInit } from '@angular/core';
import {  Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private firstSubscription: Subscription;

  constructor() { }

  ngOnInit() {
    // this.firstSubscription = interval(1000).subscribe(count=>{
    //   console.log(count);
    // })

    const customObervable = new Observable(observer=>{
      var count=0;
      setInterval(()=>{
        observer.next(count)
        if(count > 3){
          observer.error(new Error("count is greater than 3"));
        }
        count++;
      },1000);
    });

    this.firstSubscription = customObervable.pipe(map((data: number)=> "Round " +(data+1)))
    .subscribe(
      (data)=>{console.log(data)},
      (err)=>{console.log(err)},
      ()=>{console.log("Complete")}
    );

  }

  ngOnDestroy(){
    this.firstSubscription.unsubscribe();
  }
}
