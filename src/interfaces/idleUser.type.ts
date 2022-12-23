export type idleUserData = {
  heading: string;
  content: idleUser[];
  error: string | null;
  isLoading: boolean;
};

export type idleUser = {
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
