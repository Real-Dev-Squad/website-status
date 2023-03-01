import Tabs from '@/components/Tabs';
import { fireEvent, render, screen } from '@testing-library/react';
import { TABS } from '@/components/tasks/constants';
describe('Tabs Component', () => {
  const onSelectMock = jest.fn();
  it('should render all the buttons', () => {
    render(<Tabs tabs={TABS} activeTab='ASSIGNED' onSelect={onSelectMock} />);
    const presentTabs = screen.queryAllByRole('button');
    expect(presentTabs.length).toBe(TABS.length);
  });

  it('check if selectTab() is called with right key', () => {
    render(<Tabs tabs={TABS} activeTab='ASSIGNED' onSelect={onSelectMock} />);
    const assignedBtn = screen.getByRole("button", { name: /ASSIGNED/i });
    fireEvent.click(assignedBtn);
    expect(onSelectMock).not.toHaveBeenCalledWith('COMPLETED');
    expect(onSelectMock).toHaveBeenCalledWith('ASSIGNED');
  });

  it('Check if correct button is selected', () => {
    render(<Tabs tabs={TABS} activeTab='COMPLETED' onSelect={onSelectMock} />);
    const completedBtn = screen.getByRole("button", { name: /COMPLETED/i });
    expect(completedBtn).toHaveClass('active')
  });

  it('should render all tabs passed with correct text', () => {
    render(<Tabs tabs={TABS} activeTab='ASSIGNED' onSelect={onSelectMock} />);
    const presentTabs = screen.getAllByRole('button');
    for (let i = 0; i < presentTabs.length; i++) {
      expect(presentTabs[i].textContent).toBe(TABS[i]);
    }
  });
});