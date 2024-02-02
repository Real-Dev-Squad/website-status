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
        refURL: '/pull-requests?state=open',
        pathName: '/pull-requests',
        state: 'open',
    },
    {
        title: 'Stale PRs',
        refURL: '/pull-requests?state=stale',
        pathName: '/pull-requests',
        state: 'stale',
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
        refURL: '/standup?dev=true',
        pathName: '/standup',
    },
    {
        title: 'Availability Panel',
        refURL: '/availability-panel?dev=true',
        pathName: '/availability-panel',
    },
    {
        title: 'Status Calendar',
        refURL: '/calendar?dev=true',
        pathName: '/calendar',
    },
];
