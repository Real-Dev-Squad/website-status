export type challenge = {
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
    screen: string;
};

export type ChallengeMap = {
    Active: challenge[];
    Completed: challenge[];
};
export type ChallengesQueryResponse = {
    message: string;
    challenges: challenge[];
};
