import { AfterViewInit, Component, ComponentFactoryResolver, Input, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StepHostDirective } from '../directives/step-host.directive';
import { IWizInfo, IWizOnNext, IWizOnPrevious, IWizOnSave, IWizOnSkip, IWizStore } from '../entity';
import { StepAComponent } from './wizard-demo-usecase/step-a.component';


@Component({
  template: `
  <ul>
    <li *ngFor="let stepKey of wizStore?.value?.wizInfo?.stepSequence">
      <a>{{wizStore?.value?.wizInfo?.stepFactory[stepKey]?.label}}</a>
    </li>
  </ul>
  <ng-template stepHost></ng-template>
  <button *ngIf="enableBack">Back</button>
  <button *ngIf="enableSave">Save</button>
  <button *ngIf="enableNext">Next</button>
  <button *ngIf="enableSkip">Skip</button>
  `,
  selector: 'wiz-root'
})
export class WizRootComponent implements OnInit {

  @ViewChild(StepHostDirective, { static: true }) wizRootContainer: StepHostDirective;
  @Input() wizInfo: IWizInfo;
  wizStore: BehaviorSubject<IWizStore>;

  enableBack: boolean = false;
  enableSave: boolean = false;
  enableNext: boolean = false;
  enableSkip: boolean = false;

  stepInstance: any;

  constructor(
    private cfResolver: ComponentFactoryResolver
  ) { }

  ngOnInit() {
    this.buildStore();
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
    this.stepInstance = this.wizRootContainer.viewContainerRef.createComponent(stepInstanceFactory);

    this.enableNext = !!(this.stepInstance.instance as IWizOnNext).onNext;
    this.enableBack = !!(this.stepInstance.instance as IWizOnPrevious).onPrevious;
    this.enableSave = !!(this.stepInstance.instance as IWizOnSave).onSave;
    this.enableSkip = !!(this.stepInstance.instance as IWizOnSkip).onSkip;
  }

}
