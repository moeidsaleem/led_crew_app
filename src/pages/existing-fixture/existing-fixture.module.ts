import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExistingFixturePage } from './existing-fixture';

@NgModule({
  declarations: [
    ExistingFixturePage
  ],
  imports: [
    IonicPageModule.forChild(ExistingFixturePage),
  ],
})
export class ExistingFixturePageModule {}
