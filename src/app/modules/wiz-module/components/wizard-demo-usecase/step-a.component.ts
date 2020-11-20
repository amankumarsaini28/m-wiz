import { Component, } from '@angular/core';
import { IWizOnNext } from '../../entity';


@Component({
  template: `<h1>Step A</h1>`,
  selector: 'step-a'
})
export class StepAComponent implements IWizOnNext {
  constructor() { }

  onStepLoad() { }

  async onNext() { }
}
