export type IssueItem = {
    id: number;
    url: string;
    title: string;
    user: {
        login: string | null | undefined;
        html_url: string | null | undefined;
    };
    assignee:
        | {
              login?: string | null | undefined;
              html_url?: string | null | undefined;
          }
        | null
        | undefined;
    body: string | null | undefined;
    html_url: string;
    labels: {
        id: null | undefined | number;
        name: string | null | undefined;
    }[];
    state: string;
    assignees?: any[] | null | undefined;
    created_at: string | number | Date;
    updated_at?: string | number | Date;
    taskExists?: boolean;
    taskId?: string;
};
