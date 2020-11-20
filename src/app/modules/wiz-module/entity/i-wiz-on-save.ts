import { IWizStepTemplate } from './i-wiz-step-template';

export interface IWizOnSave extends IWizStepTemplate {
  onSave(): Promise<void>;
}
