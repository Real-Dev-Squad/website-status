import { HeaderCategory } from '@/types/header';

export const headerCategories: HeaderCategory[] = [
    {
        title: 'Tasks',
        link: '/tasks',
        pathName: '/tasks',
    },
    {
        title: 'Issues',
        link: '/issues',
        pathName: '/issues',
    },
    {
        title: 'Mine',
        link: '/mine',
        pathName: '/mine',
    },
    {
        title: 'Open PRs',
        link: '/pull-requests?state=open',
        pathName: '/pull-requests',
        state: 'open',
    },
    {
        title: 'Stale PRs',
        link: '/pull-requests?state=stale',
        pathName: '/pull-requests',
        state: 'stale',
    },
    {
        title: 'Idle Users',
        link: '/idle-users',
        pathName: '/idle-users',
    },
];

export const devHeaderCategories: HeaderCategory[] = [
    {
        title: 'Standup',
        link: '/standup?dev=true',
        pathName: '/standup',
    },
    {
        title: 'Availability Panel',
        link: '/availability-panel?dev=true',
        pathName: '/availability-panel',
    },
    {
        title: 'Status Calendar',
        link: '/calendar?dev=true',
        pathName: '/calendar',
    },
];
