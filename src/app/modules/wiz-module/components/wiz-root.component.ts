import { AfterViewInit, Component, ComponentFactoryResolver, Input, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StepHostDirective } from '../directives/step-host.directive';
import { IWizInfo, IWizStore } from '../entity';
import { StepAComponent } from './wizard-demo-usecase/step-a.component';


@Component({
  template: `<ng-template stepHost></ng-template>`,
  selector: 'wiz-root'
})
export class WizRootComponent implements AfterViewInit, OnInit {

  @ViewChild(StepHostDirective, { static: true }) wizRootContainer: StepHostDirective;
  @Input() wizInfo: IWizInfo;
  wizStore: BehaviorSubject<IWizStore>;

  constructor(
    private cfResolver: ComponentFactoryResolver
  ) { }

  ngOnInit() {
    this.buildStore();
  }

  ngAfterViewInit() {
    const { initalStep } = this.wizStore.value.wizInfo;
    this.loadStep(initalStep);
  }

  buildStore() {
    /**
     * create wizard data from steps
     * for example steps are ['a', 'b', 'c'], wizard data will be {a: {}, b: {}, c: {}} for direct lookup
     */
    const wizData = this.wizInfo?.stepSequence?.reduce((agg, curr) => ({ ...agg, [curr]: {} }), {});

    this.wizStore = new BehaviorSubject({
      wizInfo: this.wizInfo,
      wizData
    });
  }

  loadStep(stepKey: string) {
    const { component: StepComponent } = this.wizStore.value.wizInfo.stepFactory[stepKey];
    const stepInstanceFactory = this.cfResolver.resolveComponentFactory(StepComponent);
    this.wizRootContainer.viewContainerRef.clear();
    this.wizRootContainer.viewContainerRef.createComponent(stepInstanceFactory);
  }

}
