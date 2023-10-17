export interface UserResponseData {
    id: string;
    incompleteUserDetails: boolean;
    website: string;
    discordJoinedAt: string;
    discordId: string;
    roles: {
        archived: boolean;
        in_discord: boolean;
        member: boolean;
    };
    last_name: string;
    linkedin_id: string;
    yoe: number;
    picture: {
        publicId: string;
        url: string;
    };
    github_created_at: number;
    github_display_name: string;
    github_id: string;
    company: string;
    designation: string;
    twitter_id: string;
    first_name: string;
    status: string;
    username: string;
    updated_at: number;
    created_at: number;
}
