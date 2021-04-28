export interface FilterInterface {
  name: string;
  title: string;
  completed: boolean;
  subfilters?: FilterInterface[];
}
