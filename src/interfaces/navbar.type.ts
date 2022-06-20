import { Key } from "react";

export type SignInButton = {
  btnText: string;
  userData: UserData;
  loggedIn: boolean;
};

export type UserData = {
  firstName: string;
  profilePicture: string;
};

export type Data = { data: DataItem[] };

export type DataItem = {
  id: Key;
  link: string;
  name: string;
  tabStyle?: string;
  linkStyle?: string;
};
