import Tabs from '@/components/Tabs';
import { fireEvent, render, screen } from '@testing-library/react';
import { Tab, TABS } from '@/interfaces/task.type';
import { COMPLETED, DONE, AVAILABLE, UNASSINGED } from '@/constants/constants';

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

    it('should render all the buttons', () => {
        render(
            <Tabs
                tabs={TABS}
                activeTab={Tab.ASSIGNED}
                onSelect={onSelectMock}
                tasksCount={mockTasksCount}
            />
        );
        const presentTabs = screen.queryAllByRole('button');
        expect(presentTabs.length).toBe(TABS.length);
    });

    it('check if selectTab() is called with right key', () => {
        render(
            <Tabs
                tabs={TABS}
                activeTab={Tab.ASSIGNED}
                onSelect={onSelectMock}
                tasksCount={mockTasksCount}
            />
        );
        const assignedBtn = screen.getByRole('button', { name: /ASSIGNED/i });
        fireEvent.click(assignedBtn);
        expect(onSelectMock).toHaveBeenCalledWith(Tab.ASSIGNED);
    });

    it('Check if correct button is selected', () => {
        render(
            <Tabs
                tabs={TABS}
                activeTab={Tab.COMPLETED}
                onSelect={onSelectMock}
                tasksCount={mockTasksCount}
            />
        );

        const completedBtn = screen.getByRole('button', { name: /COMPLETED/i });
        expect(completedBtn).toHaveClass('active');
    });

    it('should render all tabs passed with correct text and count values', () => {
        render(
            <Tabs
                tabs={TABS}
                activeTab={Tab.ASSIGNED}
                onSelect={onSelectMock}
                tasksCount={mockTasksCount}
            />
        );
        const presentTabs = screen.getAllByRole('button');
        for (let i = 0; i < presentTabs.length; i++) {
            expect(presentTabs[i].textContent).toBe(changeName(TABS[i]));
        }
    });
});
