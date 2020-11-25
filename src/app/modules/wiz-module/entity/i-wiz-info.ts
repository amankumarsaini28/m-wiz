import { IWizStepTemplate } from './i-wiz-step-template';

export interface IWizInfo {
  stepSequence: string[];
  stepFactory: { [key: string]: IStepInfo };
  currentStep: string;
  currentStepIndex?: number;
}

export interface IStepInfo {
  label: string;
  subLabel?: string;
  component: any;
}
