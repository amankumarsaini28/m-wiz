import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[stepHost]',
})
export class StepHostDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
