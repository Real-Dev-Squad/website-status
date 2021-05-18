export type award = {
  dinero: number,
  neelam: number
}

export type task = {
  id: string,
  title: string,
  purpose: string,
  featureUrl: string,
  type: string,
  links: string[],
  endsOn: string,
  startedOn: string,
  status: string,
  assignee: string,
  percentCompleted: number,
  dependsOn: string[],
  participants: string,
  completionAward: award,
  lossRate: award,
  isNoteworthy: boolean
}

export type challenge = {
  content: {
    id: number;
    title: string;
    level: string;
    start_date: string;
    end_date: string;
    participants: {
      user_id: string;
      first_name: string;
      last_name: string;
      yoe: number;
      company: string;
      designation: string;
      img: string;
      github_id: string;
      linkedin_id: string;
      twitter_id: string;
      instagram_id: string;
      is_member: number;
      rds_member_id: string;
    }[];
    is_active: boolean;
    is_user_subscribed: number;
  }[];
  screen: string;
}
