import { IWizInfo } from './i-wiz-info';

export interface IWizStore {
  wizInfo: IWizInfo;
  wizData: WizData;
}

export interface WizData {
  [key: string]: StepData;
}

export interface StepData {
  [key: string]: any;
}
