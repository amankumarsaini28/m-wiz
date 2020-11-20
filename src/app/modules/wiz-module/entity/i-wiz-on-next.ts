import { IWizStepTemplate } from './i-wiz-step-template';

export interface IWizOnNext extends IWizStepTemplate {
  onNext(): Promise<void>;
}
