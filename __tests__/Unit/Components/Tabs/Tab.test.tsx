import Tabs from '@/components/Tabs';
import { fireEvent, render, screen } from '@testing-library/react';
import { Tab, TABS } from '@/interfaces/task.type';

describe('Tabs Component', () => {
    const onSelectMock = jest.fn();

    it('should render all the buttons', () => {
        render(
            <Tabs
                tabs={TABS}
                activeTab={Tab.ASSIGNED}
                onSelect={onSelectMock}
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
            />
        );
        const completedBtn = screen.getByRole('button', { name: /COMPLETED/i });
        expect(completedBtn).toHaveClass('active');
    });

    it('should render all tabs passed with correct text', () => {
        render(
            <Tabs
                tabs={TABS}
                activeTab={Tab.ASSIGNED}
                onSelect={onSelectMock}
            />
        );
        const presentTabs = screen.getAllByRole('button');
        for (let i = 0; i < presentTabs.length; i++) {
            expect(presentTabs[i].textContent).toBe(
                TABS[i].split('_').join(' ')
            );
        }
    });
});
