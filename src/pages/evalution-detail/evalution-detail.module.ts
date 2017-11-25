import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EvalutionDetailPage } from './evalution-detail';

@NgModule({
  declarations: [
    EvalutionDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(EvalutionDetailPage),
  ],
})
export class EvalutionDetailPageModule {}
