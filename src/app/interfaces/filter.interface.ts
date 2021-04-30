export interface FilterCheckboxInterface {
  title: string;
  completed: boolean;
  formControlName: string;
  subFilters?: FilterCheckboxInterface[];
}
