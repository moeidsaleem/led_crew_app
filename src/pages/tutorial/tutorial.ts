import { Component } from '@angular/core';
import { IonicPage, MenuController, NavController, Platform } from 'ionic-angular';

import { TranslateService } from '@ngx-translate/core';

export interface Slide {
  title: string;
  description: string;
  image: string;
}

@IonicPage()
@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html'
})
export class TutorialPage {
  slides: Slide[];
  showSkip = true;
  dir: string = 'ltr';

  constructor(public navCtrl: NavController, public menu: MenuController,
   public platform: Platform) {
    this.dir = platform.dir();

        this.slides = [
          {
            title: 'LED CREW Evaluation',
            description: `This app enables crew member to evaluate facility`,
            image: 'assets/img/light-bulb.svg',
          },
          // {
          //   title: values.TUTORIAL_SLIDE2_TITLE,
          //   description: values.TUTORIAL_SLIDE2_DESCRIPTION,
          //   image: 'assets/img/ica-slidebox-img-2.png',
          // },
          // {
          //   title: values.TUTORIAL_SLIDE3_TITLE,
          //   description: values.TUTORIAL_SLIDE3_DESCRIPTION,
          //   image: 'assets/img/ica-slidebox-img-3.png',
          // }
        ];
   
  }

  startApp() {
    this.navCtrl.setRoot('WelcomePage', {}, {
      animate: true,
      direction: 'forward'
    });
  }

  onSlideChangeStart(slider) {
    this.showSkip = !slider.isEnd();
  }

  ionViewDidEnter() {
    // the root left menu should be disabled on the tutorial page
    this.menu.enable(false);
  }

  ionViewWillLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menu.enable(true);
  }

}
