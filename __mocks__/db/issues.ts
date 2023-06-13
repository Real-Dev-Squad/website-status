export const issuesResponseSearchedWithoutQuery = [
    {
        url: 'https://api.github.com/repos/Dummy-Org/todo-action-items/issues/11',
        repository_url:
            'https://api.github.com/repos/Dummy-Org/todo-action-items',
        labels_url:
            'https://api.github.com/repos/Dummy-Org/todo-action-items/issues/11/labels{/name}',
        comments_url:
            'https://api.github.com/repos/Dummy-Org/todo-action-items/issues/11/comments',
        events_url:
            'https://api.github.com/repos/Dummy-Org/todo-action-items/issues/11/events',
        html_url:
            'https://github.com/Dummy-Org/todo-action-items/issues/11',
        id: 732825067,
        node_id: 'MDU6SXNzdWU3MzI4MjUwNjc=',
        number: 11,
        title: 'Status view to all features being built for our app',
        user: {
            login: 'dummyuser',
        },
        labels: [],
        state: 'open',
        locked: false,
        assignee: {
            login: 'dummyuser',
        },
        assignees: [
            {
                login: 'dummyuser',
            },
        ],
        created_at: '2020-10-30T02:08:48Z',
        updated_at: '2020-10-30T02:08:48Z',
        closed_at: null,
        repository: {
            id: 291388556,
            node_id: 'MDEwOlJlcG9zaXRvcnkyOTEzODg1NTY=',
            name: 'todo-action-items',
            full_name: 'Dummy-Org/todo-action-items',
            private: false,
            owner: {
                login: 'Dummy-Org',
                id: 62176136,
                node_id: 'MDEyOk9yZ2FuaXphdGlvbjYyMTc2MTM2',
                avatar_url:
                    'https://avatars.githubusercontent.com/u/62176136?v=4',
                gravatar_id: '',
                url: 'https://api.github.com/users/Dummy-Org',
                html_url: 'https://github.com/Dummy-Org',
                followers_url:
                    'https://api.github.com/users/Dummy-Org/followers',
                following_url:
                    'https://api.github.com/users/Dummy-Org/following{/other_user}',
                gists_url:
                    'https://api.github.com/users/Dummy-Org/gists{/gist_id}',
                starred_url:
                    'https://api.github.com/users/Dummy-Org/starred{/owner}{/repo}',
                subscriptions_url:
                    'https://api.github.com/users/Dummy-Org/subscriptions',
                organizations_url:
                    'https://api.github.com/users/Dummy-Org/orgs',
                repos_url: 'https://api.github.com/users/Dummy-Org/repos',
                events_url:
                    'https://api.github.com/users/Dummy-Org/events{/privacy}',
                received_events_url:
                    'https://api.github.com/users/Dummy-Org/received_events',
                type: 'Organization',
                site_admin: false,
            },
            html_url: 'https://github.com/Dummy-Org/todo-action-items',
            description: 'A running list of todo items for Real Dev Squad site',
            url: 'https://api.github.com/repos/Dummy-Org/todo-action-items',
            created_at: '2020-08-30T02:52:37Z',
            updated_at: '2023-01-21T05:28:18Z',
            pushed_at: '2020-08-30T02:54:37Z',
            clone_url:
                'https://github.com/Dummy-Org/todo-action-items.git',
            svn_url: 'https://github.com/Dummy-Org/todo-action-items',
        },
        body: 'We want to have a status page where we can view (and in future sort, filter) all the major tasks happening under development.\r\n\r\nThis will give us some visibility into what everyone is currently building and make it easier to collaborate.\r\n\r\nFirst view would look like this:\r\n![Roadmap](https://user-images.githubusercontent.com/1935403/97651644-ebf2e200-1a19-11eb-8a92-026d10ed8eee.png)\r\n',
    },
];

export const issuesResponseSearchedWithQuery = [
    {
        url: 'https://api.github.com/repos/Dummy-Org/todo-action-items/issues/148',
        repository_url: 'https://api.github.com/repos/Dummy-Org/todo-action-items',
        labels_url: 'https://api.github.com/repos/Dummy-Org/todo-action-items/issues/148/labels{/name}',
        comments_url: 'https://api.github.com/repos/Dummy-Org/todo-action-items/issues/148/comments',
        events_url: 'https://api.github.com/repos/Dummy-Org/todo-action-items/issues/148/events',
        html_url: 'https://github.com/Dummy-Org/todo-action-items/issues/148',
        id: 1686179699,
        node_id: 'I_kwDOEV48jM5kgQ9z',
        number: 148,
        title: 'One-Click Issue to Task Conversion v1 Release',
        user: {
            login: 'dunnyuser',
            html_url: 'https://github.com/dummyuser',
        },
        labels: [],
        state: 'open',
        assignee: {
            login: 'dummyuser',
            html_url: 'https://github.com/dummyuser',
        },
        assignees: [
            {
                login: 'dummyuser',
            },
        ],
        comments: 0,
        created_at: '2023-04-27T06:10:50Z',
        updated_at: '2023-04-27T23:21:52Z',
        closed_at: null,
        body:
            '# One-Click Issue To Task Conversion- v1 Release\r\n### Closes #92 \r\n\r\nThe following sub-tasks are to be completed to release one-click issue to task conversion feature to main branch\r\n- [x] https://github.com/Dummy-Org/website-status/pull/474\r\n- [ ] #137 \r\n- [ ] #136 \r\n- [ ] [Merge website-backend changes from develop to main](https://github.com/Dummy-Org/website-backend/pull/1047)\r\n- [x] [Merge website-status changes to develop](https://github.com/Dummy-Org/website-status/pull/474)\r\n- [ ] Merge website-status changes from develop to main\r\n- [ ] Alert\r\n- [ ] Verify changes',
        taskExists: true,
    },
];

export const issueResponseNullBody =
{
    url: 'https://api.github.com/repos/Dummy-Org/todo-action-items/issues/149',
    repository_url: 'https://api.github.com/repos/Dummy-Org/todo-action-items',
    labels_url: 'https://api.github.com/repos/Dummy-Org/todo-action-items/issues/149/labels{/name}',
    comments_url: 'https://api.github.com/repos/Dummy-Org/todo-action-items/issues/149/comments',
    events_url: 'https://api.github.com/repos/Dummy-Org/todo-action-items/issues/149/events',
    html_url: 'https://github.com/Dummy-Org/todo-action-items/issues/149',
    id: 1686179700,
    node_id: 'I_kwDOEV48jM5kgQ9z',
    number: 149,
    title: 'Dummy Issue with Null Body',
    user: {
        login: 'dummyuser',
    },
    labels: [],
    state: 'open',
    assignee: {
        login: 'dummyassignee',
    },
    assignees: [
        {
            login: 'dummyassignee',
        },
    ],
    comments: 0,
    created_at: '2023-04-27T06:10:50Z',
    updated_at: '2023-04-27T23:21:52Z',
    closed_at: null,
    body: null,
    taskExists: false,
};