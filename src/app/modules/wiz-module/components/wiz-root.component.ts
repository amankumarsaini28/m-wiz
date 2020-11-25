import { AfterViewInit, Component, ComponentFactoryResolver, ComponentRef, Input, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StepHostDirective } from '../directives/step-host.directive';
import { IWizInfo, IWizOnNext, IWizOnPrevious, IWizOnSave, IWizOnSkip, IWizStore, IWizStepTemplate } from '../entity';


@Component({
  template: `
  <ul>
    <li *ngFor="let stepKey of wizStore?.value?.wizInfo?.stepSequence" [ngClass]="{active: stepKey === wizStore.value.wizInfo.currentStep}">
      <a>{{wizStore?.value?.wizInfo?.stepFactory[stepKey]?.label}}</a>
    </li>
  </ul>
  <section>
    <ng-template stepHost></ng-template>
  </section>
  <button *ngIf="enableBack" (click)="handleOnPrevious()">Back</button>
  <button *ngIf="enableSave" (click)="handleOnSave()">Save</button>
  <button *ngIf="enableNext" (click)="handleOnNext()">Next</button>
  <button *ngIf="enableSkip" (click)="handleOnSkip()">Skip</button>
  `,
  selector: 'wiz-root',
  styles: [`.active { color: red }`]
})
export class WizRootComponent implements OnInit {

  @ViewChild(StepHostDirective, { static: true }) wizRootContainer: StepHostDirective;
  @Input() wizInfo: IWizInfo;
  wizStore: BehaviorSubject<IWizStore>;

  enableBack: boolean = false;
  enableSave: boolean = false;
  enableNext: boolean = false;
  enableSkip: boolean = false;

  stepInstance: ComponentRef<IWizStepTemplate>;

  constructor(
    private cfResolver: ComponentFactoryResolver
  ) { }

  ngOnInit() {
    this.buildStore();
    const { currentStep } = this.wizStore.value.wizInfo;
    this.loadStep(currentStep);
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
    // find current step index
    const currentStepIndex = this.wizStore.value.wizInfo.stepSequence.findIndex(step => step === stepKey);

    const stepInstanceFactory = this.cfResolver.resolveComponentFactory(StepComponent);
    this.wizRootContainer.viewContainerRef.clear();
    this.stepInstance = this.wizRootContainer.viewContainerRef.createComponent(stepInstanceFactory) as ComponentRef<IWizStepTemplate>;

    // update current step index in store
    this.setCurrentStepIndex(currentStepIndex);
    this.setCurrentStep(stepKey);
    this.enableNext = !!(this.stepInstance.instance as IWizOnNext).onNext;
    this.enableBack = !!(this.stepInstance.instance as IWizOnPrevious).onPrevious;
    this.enableSave = !!(this.stepInstance.instance as IWizOnSave).onSave;
    this.enableSkip = !!(this.stepInstance.instance as IWizOnSkip).onSkip;

    setTimeout(() => this.stepInstance.instance.onStepLoad());
  }

  async handleOnNext() {
    const { stepSequence, currentStepIndex = 0 } = this.wizStore.value.wizInfo;
    const nextStepIndex = currentStepIndex + 1;

    if (stepSequence.length >= nextStepIndex) {
      try {
        await (this.stepInstance.instance as IWizOnNext).onNext.call(this.stepInstance.instance);
        this.loadStep(stepSequence[nextStepIndex]);
      } catch (error) {
        console.warn(error);
      }
    }
  }


  async handleOnPrevious() {
    const { stepSequence, currentStepIndex = 0 } = this.wizStore.value.wizInfo;
    const previosStepIndex = currentStepIndex - 1;

    if (previosStepIndex >= 0) {
      try {
        await (this.stepInstance.instance as IWizOnPrevious).onPrevious.call(this.stepInstance.instance);
        this.loadStep(stepSequence[previosStepIndex]);
      } catch (error) { }
    }
  }

  async handleOnSave() {

  }

  async handleOnSkip() {

  }

  // store methods

  /**
   * update current step index in store
   * @param currentStepIndex {number}
   */
  setCurrentStepIndex(currentStepIndex: number) {
    // update current step index in store
    this.wizStore.next({
      ...this.wizStore.value,
      wizInfo: {
        ...this.wizStore.value.wizInfo,
        currentStepIndex
      }
    });
  }

  /**
   * update current step in store
   *
   * @param currentStep {number}
   */
  setCurrentStep(currentStep: string) {
    this.wizStore.next({
      ...this.wizStore.value,
      wizInfo: {
        ...this.wizStore.value.wizInfo,
        currentStep
      }
    });
  }
}
