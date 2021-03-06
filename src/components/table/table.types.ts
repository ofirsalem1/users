export interface User {
  dob: { age: number; date: string };
  email: string;
  gender: string;
  location: { coordinates: { latitude: string; longitude: string } };
  name: { first: string; last: string };
  picture: { thumbnail: string; large: string };
}

export interface TableProps {
  users: User[];
  paginate: (pageNumber: number) => void;
  currentPage: number;
}
