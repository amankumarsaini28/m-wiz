import { Component } from '@angular/core';
import { IWizInfo } from './modules/wiz-module/entity';

import { StepAComponent } from './modules/wiz-module/components/wizard-demo-usecase/step-a.component';
import { StepBComponent } from './modules/wiz-module/components/wizard-demo-usecase/step-b.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  wizInfo: IWizInfo = {
    stepSequence: ['step-a', 'step-b'],
    stepFactory: {
      'step-a': {
        component: StepAComponent,
        label: 'Step A',
        subLabel: 'help text'
      },
      'step-b': {
        component: StepBComponent,
        label: 'Step B',
        subLabel: 'help text'
      }
    },
    currentStep: 'step-a'
  };
  title = 'm-wiz';
}
