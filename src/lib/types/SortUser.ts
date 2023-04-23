export type SortUser = {
  name: boolean | null;
  gender: boolean | null;
  email: boolean | null;
  sort: 'name'|'gender' | 'email' | null
}