import { Component, } from '@angular/core';
import { IWizOnNext, IWizOnPrevious, IWizOnSave } from '../../entity';


@Component({
  template: `<p>Step B content</p>`,
  selector: 'step-b'
})
export class StepBComponent implements IWizOnPrevious {
  constructor() { }

  onStepLoad() {
    console.log('on Step load called for B');
  }

  async onPrevious() {
    console.log('on Previous B');
  }

}
