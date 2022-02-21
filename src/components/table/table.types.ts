export interface User {
  dob: { age: number; date: string };
  email: string;
  gender: string;
  location: any;
  name: { first: string; last: string };
  picture: { thumbnail: string; large: string };
}
