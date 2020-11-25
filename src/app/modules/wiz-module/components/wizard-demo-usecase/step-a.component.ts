import { Component, } from '@angular/core';
import { IWizOnNext, IWizOnPrevious, IWizOnSave } from '../../entity';


@Component({
  template: `<p>Step A content</p><br/><input type="checkbox" [(ngModel)]="isChecked"/> check me before going to next`,
  selector: 'step-a'
})
export class StepAComponent implements IWizOnNext {

  isChecked: boolean;

  constructor() { }

  onStepLoad() {
    console.log('on Step load called for A');
  }

  async onNext() {
    console.warn(this.isChecked);
    if (!this.isChecked) {
      throw new Error('checkbox not selected');
    }
  }

}
