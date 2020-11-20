import { NgModule } from '@angular/core';
import { WizRootComponent } from './components/wiz-root.component';
import { StepAComponent } from './components/wizard-demo-usecase/step-a.component';
import { StepHostDirective } from './directives/step-host.directive';


@NgModule({
  declarations: [StepHostDirective, WizRootComponent, StepAComponent],
  imports: [],
  providers: [],
  bootstrap: [],
  exports: [WizRootComponent]
})
export class WizModule { }
