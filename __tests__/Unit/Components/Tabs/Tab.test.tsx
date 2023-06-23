import Tabs from '@/components/Tabs';
import { fireEvent } from '@testing-library/react';
import { Tab, TABS } from '@/interfaces/task.type';
import { COMPLETED, DONE, AVAILABLE, UNASSINGED } from '@/constants/constants';
import { renderWithRouter } from '@/test_utils/createMockRouter';
import { store } from '@/app/store';
import { Provider } from 'react-redux';

function changeName(name: string) {
    if (name === COMPLETED) {
        return DONE;
    } else if (name === AVAILABLE) {
        return UNASSINGED;
    } else {
        return name.split('_').join(' ');
    }
}

describe('Tabs Component', () => {
    const onSelectMock = jest.fn();
    const mockTasksCount = {
        ASSIGNED: 2,
        COMPLETED: 4,
        AVAILABLE: 10,
        IN_PROGRESS: 0,
        NEEDS_REVIEW: 0,
        IN_REVIEW: 0,
        VERIFIED: 0,
        MERGED: 0,
    };

    test('should render all the buttons', () => {
        const { queryAllByRole } = renderWithRouter(
            <Provider store={store()}>
                <Tabs
                    tabs={TABS}
                    activeTab={Tab.ASSIGNED}
                    onSelect={onSelectMock}
                    tasksCount={mockTasksCount}
                />
            </Provider>
        );
        const presentTabs = queryAllByRole('button');
        expect(presentTabs.length).toBe(TABS.length);
    });

    test('check if selectTab() is called with right key', () => {
        const { getByRole } = renderWithRouter(
            <Provider store={store()}>
                <Tabs
                    tabs={TABS}
                    activeTab={Tab.ASSIGNED}
                    onSelect={onSelectMock}
                    tasksCount={mockTasksCount}
                />
            </Provider>
        );
        const assignedBtn = getByRole('button', { name: /ASSIGNED/i });
        fireEvent.click(assignedBtn);
        expect(onSelectMock).toHaveBeenCalledWith(Tab.ASSIGNED);
    });

    test('Check if correct button is selected', () => {
        const { getByRole } = renderWithRouter(
            <Provider store={store()}>
                <Tabs
                    tabs={TABS}
                    activeTab={Tab.COMPLETED}
                    onSelect={onSelectMock}
                    tasksCount={mockTasksCount}
                />
            </Provider>
        );
        const completedBtn = getByRole('button', { name: /DONE/i });
        expect(completedBtn).toHaveClass('active');
    });

    test('should render all tabs passed with correct text', () => {
        const { getAllByRole } = renderWithRouter(
            <Provider store={store()}>
                <Tabs
                    tabs={TABS}
                    activeTab={Tab.ASSIGNED}
                    onSelect={onSelectMock}
                    tasksCount={mockTasksCount}
                />
            </Provider>
        );
        const presentTabs = getAllByRole('button');
        for (let i = 0; i < presentTabs.length; i++) {
            expect(presentTabs[i].textContent).toBe(changeName(TABS[i]));
        }
    });

    test('should change Tabs design and show tasks count if feature flag is on', () => {
        const { getByRole, getAllByRole } = renderWithRouter(
            <Provider store={store()}>
                <Tabs
                    tabs={TABS}
                    activeTab={Tab.ASSIGNED}
                    onSelect={onSelectMock}
                    tasksCount={mockTasksCount}
                />
            </Provider>,
            {
                query: { dev: 'true' },
            }
        );

        const presentTabs = getAllByRole('button');

        // tasks count is rendered correctly on screen
        for (let i = 0; i < presentTabs.length; i++) {
            expect(presentTabs[i].textContent).toBe(
                `${TABS[i]} (${mockTasksCount[TABS[i]]})`
            );
        }

        // feature flag's css is applied correctly
        for (let i = 0; i < presentTabs.length; i++) {
            expect(presentTabs[i]).toHaveClass('featureFlagTabButton');
        }

        // active tab's feature flag css is applied correctly
        const assignedBtn = getByRole('button', {
            name: /assigned/i,
        });
        expect(assignedBtn).toHaveClass('featureFlagActiveTab');
    });
});
