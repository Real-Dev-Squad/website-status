export const headerCategories = [
    {
        title: 'Tasks',
        refURL: '/tasks',
        pathName: '/tasks',
    },
    {
        title: 'Issues',
        refURL: '/issues',
        pathName: '/issues',
    },
    {
        title: 'Mine',
        refURL: '/mine',
        pathName: '/mine',
    },
    {
        title: 'Open PRs',
        refURL: '/openPRs',
        pathName: '/openPRs',
    },
    {
        title: 'Stale PRs',
        refURL: '/stale-pr',
        pathName: '/stale-pr',
    },
    {
        title: 'Idle Users',
        refURL: '/idle-users',
        pathName: '/idle-users',
    },
];

export const devHeaderCategories = [
    {
        title: 'Standup',
        refURL: '/standup/?dev=true',
        pathName: '/standup',
    },
    {
        title: 'Availability Panel',
        refURL: '/availability-panel',
        pathName: '/availability-panel',
    },
    {
        title: 'Open PRs(dev)',
        refURL: '/pull-requests?state=open&dev=true',
        pathName: '/pull-requests',
        state: 'open',
    },
    {
        title: 'Stale PRs(dev)',
        refURL: '/pull-requests?state=stale&dev=true',
        pathName: '/pull-requests',
        state: 'stale',
    },
    {
        title: 'Tasks Assigned to Archived users',
        refURL: '/tasks?q=assignee-role%3Aarchived&dev=true',
        pathName: '/tasks',
    },
];
