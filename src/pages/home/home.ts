import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  bgcolor : string = 'white';

  constructor(public navCtrl: NavController, private speechRecognition: SplashScreen) {

  }

  ngOnInit(){
    this.speechRecognition.hasPermission()
    .then((hasPermission: boolean) =>{

      if(!hasPermission){
        this.speechRecognition.requestPermission()
        .then(
          () => console.log('Granted'),
          () => console.log('Denied')
        )
      }
    });
  }

  start(){
    this.speechRecognition.startListening()
    .subscribe(
      (matches: Array<string>)=>{
        console.log(matches);
        this.bgcolor = matches[0]
      }
    )
  }

}
