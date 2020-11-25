import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WizRootComponent } from './components/wiz-root.component';
import { StepAComponent } from './components/wizard-demo-usecase/step-a.component';
import { StepBComponent } from './components/wizard-demo-usecase/step-b.component';
import { StepHostDirective } from './directives/step-host.directive';


@NgModule({
  declarations: [StepHostDirective, WizRootComponent, StepAComponent, StepBComponent],
  imports: [CommonModule, FormsModule],
  providers: [],
  bootstrap: [],
  exports: [WizRootComponent]
})
export class WizModule { }
