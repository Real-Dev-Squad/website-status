import Tabs from '@/components/Tabs';
import { fireEvent, screen } from '@testing-library/react';
import {
    Tab,
    TABS,
    depreciatedTaskStatus,
    newTaskStatus,
} from '@/interfaces/task.type';
import { AVAILABLE, UNASSIGNED } from '@/constants/constants';
import { renderWithRouter } from '@/test_utils/createMockRouter';

function changeName(name: string) {
    if (name === AVAILABLE) {
        return UNASSIGNED;
    } else {
        return name.split('_').join(' ');
    }
}

describe('Tabs Component', () => {
    const onSelectMock = jest.fn();

    it('should render all the buttons', () => {
        renderWithRouter(
            <Tabs
                tabs={TABS}
                activeTab={Tab.ASSIGNED}
                onSelect={onSelectMock}
            />
        );
        const presentTabs = screen.queryAllByRole('button');
        expect(presentTabs.length).toBe(
            TABS.filter(
                (tab) => tab != 'BACKLOG' && !newTaskStatus.includes(tab)
            ).length
        );
    });

    it('should render all the buttons when dev is true', () => {
        renderWithRouter(
            <Tabs
                dev={true}
                tabs={TABS}
                activeTab={Tab.ASSIGNED}
                onSelect={onSelectMock}
            />
        );
        const presentTabs = screen.queryAllByRole('button');
        expect(presentTabs.length).toBe(
            TABS.filter((tab) => !depreciatedTaskStatus.includes(tab)).length
        );
    });

    it('check if selectTab() is called with right key', () => {
        renderWithRouter(
            <Tabs
                tabs={TABS}
                activeTab={Tab.ASSIGNED}
                onSelect={onSelectMock}
            />
        );
        const assignedBtn = screen.getByRole('button', { name: 'ASSIGNED' });
        fireEvent.click(assignedBtn);
        expect(onSelectMock).toHaveBeenCalledWith(Tab.ASSIGNED);
    });

    it('check if selectTab() is called with right key when dev is true', () => {
        renderWithRouter(
            <Tabs
                dev={true}
                tabs={TABS}
                activeTab={Tab.UNASSIGNED}
                onSelect={onSelectMock}
            />
        );
        const unassignedBtn = screen.getByRole('button', {
            name: 'UNASSIGNED',
        });
        fireEvent.click(unassignedBtn);
        expect(onSelectMock).toHaveBeenCalledWith(Tab.UNASSIGNED);
    });

    it('Check if correct button is selected', () => {
        renderWithRouter(
            <Tabs
                tabs={TABS}
                activeTab={Tab.COMPLETED}
                onSelect={onSelectMock}
            />
        );
        const completedBtn = screen.getByRole('button', { name: /COMPLETED/i });
        expect(completedBtn).toHaveClass('active');
    });

    it('Check if correct button is selected when dev is true', () => {
        renderWithRouter(
            <Tabs
                dev={true}
                tabs={TABS}
                activeTab={Tab.UNASSIGNED}
                onSelect={onSelectMock}
            />
        );
        const unassignedBtn = screen.getByRole('button', {
            name: /UNASSIGNED/i,
        });
        expect(unassignedBtn).toHaveClass('active');
    });

    it('should render all tabs passed with correct text', () => {
        renderWithRouter(
            <Tabs
                tabs={TABS}
                activeTab={Tab.ASSIGNED}
                onSelect={onSelectMock}
            />
        );
        const presentTabs = screen.getAllByRole('button');
        const OLDTABS = TABS.filter(
            (tab) => tab != 'BACKLOG' && !newTaskStatus.includes(tab)
        );
        for (let i = 0; i < presentTabs.length; i++) {
            expect(presentTabs[i].textContent).toBe(changeName(OLDTABS[i]));
        }
    });

    it('should render all tabs passed with correct text when dev is true', () => {
        renderWithRouter(
            <Tabs
                dev={true}
                tabs={TABS}
                activeTab={Tab.ASSIGNED}
                onSelect={onSelectMock}
            />
        );
        const presentTabs = screen.getAllByRole('button');
        const NEWTABS = TABS.filter(
            (tab) => !depreciatedTaskStatus.includes(tab)
        );
        for (let i = 0; i < presentTabs.length; i++) {
            expect(presentTabs[i].textContent).toBe(changeName(NEWTABS[i]));
        }
    });
});
