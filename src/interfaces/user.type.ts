type userType = {
  id: string;
  company?: string;
  twitter_id?: string;
  website?: string;
  yoe?: number;
  picture: {
    url: string;
    publicId: string;
  };
  github_display_name: string;
  first_name?: string;
  username?: string;
  instagram_id?: string;
  roles: {
    archived: boolean;
    member: boolean;
  };
  designation?: string;
  profileURL?: string;
  profileStatus?: string;
  status?: string;
  incompleteUserDetails: boolean;
  github_id: string;
  linkedin_id?: string;
  last_name?: string;
};

export default userType;
