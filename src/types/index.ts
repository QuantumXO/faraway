export type ResourceUrlType = string;
export interface IResource {
  url: string;
  id: string;
  created: string;
  edited: string;
}
export interface IPerson extends IResource {
  birth_year: string;
  eye_color: string;
  films: ResourceUrlType[];
  gender: string;
  hair_color: string;
  height: string;
  homeworld: string;
  mass: string;
  name: string;
  skin_color: string;
  species: ResourceUrlType[];
  starships: ResourceUrlType[];
  vehicles: ResourceUrlType[];
}
export interface IPeopleRequest {
  count: number;
  next: string;
  previous: null | string;
  results?: IPerson[];
}