export interface FilterInterface {
  title: string;
  completed: boolean;
  formControlName: string;
  subfilters?: FilterInterface[];
}
