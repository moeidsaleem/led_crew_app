import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController } from 'ionic-angular';
import { LocationInfoPage } from '../location-info/location-info';
import { EvaluationPage } from '../evaluation/evaluation';
import { RoomsPage } from '../rooms/rooms';



@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root: any = LocationInfoPage;
  tab2Root: any = EvaluationPage;
  tab3Root: any = RoomsPage;

  tab1Title = " Location";
  tab2Title = "Evaluation ";
  tab3Title = "Rooms ";

  constructor(public navCtrl: NavController, public translateService: TranslateService) {

  }
}
