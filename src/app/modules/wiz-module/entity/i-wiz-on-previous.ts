import { IWizStepTemplate } from './i-wiz-step-template';

export interface IWizOnPrevious extends IWizStepTemplate {
  onPrevious(): Promise<void>;
}
