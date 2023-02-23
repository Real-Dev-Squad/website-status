export type IdleUserArray = {
  heading: string;
  content: IdleUser[];
  error: boolean;
  isLoading: boolean;
};

export type IdleUser = {
  id: string;
  picture: {
    url: string;
  };
  currentStatus: CurrentStatus;
  full_name: string;
  username: string;
};

export type CurrentStatus = {
  state: string;
  updatedAt: string;
  from: string;
  until: string;
  message: string;
}