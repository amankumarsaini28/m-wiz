import { IWizStepTemplate } from './i-wiz-step-template';

export interface IWizOnSkip extends IWizStepTemplate {
  onSkip(): Promise<void>;
}
