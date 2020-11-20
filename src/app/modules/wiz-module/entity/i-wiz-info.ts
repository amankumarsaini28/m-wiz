export interface IWizInfo {
  stepSequence: string[];
  stepFactory: { [key: string]: IStepInfo };
  initalStep: string;
}

export interface IStepInfo {
  label: string;
  subLabel?: string;
  component: any;
}
