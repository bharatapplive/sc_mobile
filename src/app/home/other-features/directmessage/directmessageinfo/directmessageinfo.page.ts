import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { slideLeftToRightAnimation } from 'src/app/animation/leftToright.animation';
import { DirectMessage, DMAuthor } from 'src/app/core/authcontroller/authInterface';

@Component({
  selector: 'app-directmessageinfo',
  templateUrl: './directmessageinfo.page.html',
  styleUrls: ['./directmessageinfo.page.scss'],
  standalone: false
})
export class DirectmessageinfoPage implements OnInit {

  messages: DirectMessage[] = [];
  activeUserFName: any | null = null;
  activeUserUName: any | null = null;
  activeUserProfilePic: string | null = null;

  constructor(
    private readonly navCtrl: NavController
  ) { }

  ngOnInit() {

    const state = history.state;
    if(state){
      this.messages = state.msg;
      this.activeUserUName = state.username;
      this.activeUserFName = state.fullname;
      this.activeUserProfilePic = state.avatar
    }

    console.log(this.messages);
  }

  goBack(){
    this.navCtrl.navigateBack('/home/directmessage',{
      animation: slideLeftToRightAnimation
    });
  }
}
