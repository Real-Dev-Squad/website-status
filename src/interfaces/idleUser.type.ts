export type IdleUserArray = {
  heading: string;
  content: IdleUser[];
  error: boolean;
  isLoading: boolean;
};

export type IdleUser = {
  username: string
  id: string;
  picture: {
    url: string;
  };
  currentStatus: {
    state: string;
    updatedAt: string;
    from: string;
    until: string;
    message: string;
  };
  full_name: string;
};