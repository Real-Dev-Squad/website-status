type userType = {
  id: string,
  username?: string,
  github_id: string,
  github_display_name: String | null,
  incompleteUserDetails: boolean,
  roles: {
    archived: boolean,
    admin?: boolean,
    super_user?: boolean,
  }
  isMember: boolean,
  status?: string,
  picture?: {
    publicId: string,
    url: URL,
  }
  first_name?: string,
  last_name?: string,
  company?: string,
  yoe?: number,
  designation?: string,
  instagram_id?: string | URL,
  twitter_id?: string | URL,
  linkedin_id?: string | URL
};

export default userType;
