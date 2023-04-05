export type UserStatusArray = {
    heading: string;
    content: UserStatus[];
    error: boolean;
    isLoading: boolean;
};

export type UserStatus = {
    username: string;
    id: string;
    picture: {
        url: string;
        publicId?: string;
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

export enum UserStatusType {
    IDLE = "IDLE",
    ACTIVE = "ACTIVE",
    OOO = "OOO",
}
