import { render, fireEvent } from '@testing-library/react';
import { act } from '@testing-library/react-hooks';
import Card from '@/components/tasks/card/index';
import { store } from '@/app/store';
import { Provider } from 'react-redux';
import { RouterContext } from 'next/dist/shared/lib/router-context';
import {
    createMockRouter,
    renderWithRouter,
} from '@/test_utils/createMockRouter';
import { NextRouter } from 'next/router';
import { TASK_STATUS } from '@/interfaces/task-status';
import useUserData from '@/hooks/useUserData';

const DEFAULT_PROPS = {
    content: {
        id: 'firestoreDocumentId123',
        lossRate: {
            dinero: 10,
            neelam: 5,
        },
        links: ['https://realdevsquad.com/learn-site'],
        completionAward: {
            dinero: 110,
            neelam: 10,
        },
        dependsOn: [],
        assignee: 'ankur',
        startedOn: '1618790400',
        isNoteworthy: true,
        title: 'test 1 for drag and drop',
        purpose: 'string',
        percentCompleted: 0,
        endsOn: '1618790400',
        status: TASK_STATUS.COMPLETED,
        featureUrl: 'string',
        type: 'feature',
        createdBy: 'ankush',
    },
    shouldEdit: false,
    onContentChange: jest.fn(),
};

jest.mock('@/hooks/useUserData', () => {
    return () => ({
        data: {
            roles: {
                admin: true,
                super_user: false,
            },
        },
        isUserAuthorized: true,
        isSuccess: true,
    });
});

const getFirestoreDateNDaysBefore = (n = 1) => {
    const d = new Date();
    d.setDate(d.getDate() - n);
    return new Date(d).getTime() / 1000;
};

jest.useFakeTimers();
describe('Task card', () => {
    test('Should render card', () => {
        const { getByText } = renderWithRouter(
            <Provider store={store()}>
                <Card {...DEFAULT_PROPS} />
            </Provider>,
            {
                query: { dev: 'true' },
            }
        );

        expect(getByText('test 1 for drag and drop')).toBeInTheDocument();
    });

    test('Should show n days ago for due tasks', () => {
        let props = {
            ...DEFAULT_PROPS,
            content: {
                ...DEFAULT_PROPS.content,
                endsOn: `${getFirestoreDateNDaysBefore(1)}`,
            },
        };
        const { rerender, getByText } = renderWithRouter(
            <Provider store={store()}>
                <Card {...props} />
            </Provider>
        );

        expect(getByText('a day ago')).toBeInTheDocument();

        // With updated props
        props = {
            ...props,
            content: {
                ...props.content,
                endsOn: `${getFirestoreDateNDaysBefore(2)}`,
            },
        };

        rerender(
            <Provider store={store()}>
                <RouterContext.Provider
                    value={createMockRouter({}) as NextRouter}
                >
                    <Card {...props} />
                </RouterContext.Provider>
            </Provider>
        );

        expect(getByText('2 days ago')).toBeInTheDocument();
    });

    test('should show the redesign only with feature flag on', () => {
        const { getByTestId, queryByTestId } = renderWithRouter(
            <Provider store={store()}>
                <Card {...DEFAULT_PROPS} />
            </Provider>,
            {}
        );

        expect(queryByTestId('task-card')).toBeInTheDocument();
    });

    test('should show edit button when ALT key is long pressed', () => {
        const { getByTestId, queryByTestId } = renderWithRouter(
            <Provider store={store()}>
                <Card {...DEFAULT_PROPS} />
            </Provider>,
            {}
        );

        const component = getByTestId('task-card');

        act(() => {
            fireEvent.keyDown(component, { key: 'Alt', code: 'AltLeft' });
            jest.advanceTimersByTime(300);
        });

        expect(queryByTestId('edit-button')).toBeInTheDocument();
    });

    it('Should render "Close task" button when parent issue is closed', function () {
        const PROPS = {
            ...DEFAULT_PROPS,
            content: {
                ...DEFAULT_PROPS.content,
                status: TASK_STATUS.ASSIGNED,
                github: {
                    issue: {
                        closedAt: '2023-04-02T17:31:50',
                        status: 'closed',
                        id: 12278,
                    },
                },
            },
        };

        const screen = renderWithRouter(
            <Provider store={store()}>
                <Card {...PROPS} />
            </Provider>
        );

        const closeTaskBtn = screen.getByRole('button', {
            name: /Close the task/i,
        });
        expect(closeTaskBtn).toBeInTheDocument();
    });

    it('Should not render "Close task" button when parent issue is closed but the task was already completed', function () {
        const PROPS = {
            ...DEFAULT_PROPS,
            content: {
                ...DEFAULT_PROPS.content,
                github: {
                    issue: {
                        closedAt: '2023-04-02T17:31:50',
                        status: 'closed',
                        id: 12278,
                    },
                },
            },
        };

        const screen = renderWithRouter(
            <Provider store={store()}>
                <Card {...PROPS} />
            </Provider>
        );

        const closeTaskBtn = screen.queryByRole('button', {
            name: /Close the task/i,
        });
        expect(closeTaskBtn).not.toBeInTheDocument();
    });

    it('Should render "Assign to username" button when parent issue has an assignee and is open, the task is available and has not been assigned', function () {
        const PROPS = {
            ...DEFAULT_PROPS,
            content: {
                ...DEFAULT_PROPS.content,
                status: 'Available',
                assignee: undefined,
                github: {
                    issue: {
                        assignee: 'ankushdharkar',
                        status: 'open',
                        id: 12278,
                        assigneeRdsInfo: {
                            username: 'ankush',
                            firstName: 'Ankush',
                            lastName: 'Dharkar',
                        },
                    },
                },
            },
        };

        const screen = renderWithRouter(
            <Provider store={store()}>
                <Card {...PROPS} />
            </Provider>
        );

        const closeTaskBtn = screen.queryByRole('button', {
            name: /Assign to ankush/i,
        });
        expect(closeTaskBtn).toBeInTheDocument();
    });

    it('Should not render "Assign to username" button when parent issue has an assignee and is open, the task status is "Completed" and has not been assigned', function () {
        const PROPS = {
            ...DEFAULT_PROPS,
            content: {
                ...DEFAULT_PROPS.content,
                assignee: undefined,
                github: {
                    issue: {
                        assignee: 'ankushdharkar',
                        status: 'open',
                        id: 12278,
                        assigneeRdsInfo: {
                            username: 'ankush',
                            firstName: 'Ankush',
                            lastName: 'Dharkar',
                        },
                    },
                },
            },
        };

        const screen = renderWithRouter(
            <Provider store={store()}>
                <Card {...PROPS} />
            </Provider>
        );

        const closeTaskBtn = screen.queryByRole('button', {
            name: /Assign to ankush/i,
        });
        expect(closeTaskBtn).not.toBeInTheDocument();
    });
});
