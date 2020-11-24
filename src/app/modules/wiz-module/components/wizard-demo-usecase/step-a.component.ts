import { Component, } from '@angular/core';
import { IWizOnNext, IWizOnPrevious, IWizOnSave } from '../../entity';


@Component({
  template: `<h1>Step A</h1>`,
  selector: 'step-a'
})
export class StepAComponent implements IWizOnNext, IWizOnPrevious {
  constructor() { }

  onStepLoad() { }

  async onNext() { }

  async onPrevious() {

  }

}
