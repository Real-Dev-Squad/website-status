import Tabs from '@/components/Tabs/Tabs';
import { fireEvent, render, screen } from '@testing-library/react';
import { TABS } from '@/components/tasks/constants';
describe('Tabs Component', () => {
  const onSelect = jest.fn();
  it('should render all the buttons', () => {
    render(<Tabs tabs={TABS} activeTab='ASSIGNED' onSelect={onSelect} />);
    const presentTabs = screen.queryAllByRole('button');
    expect(presentTabs.length).toBe(TABS.length);
  });

  it('check if selectTab() is called with right key', () => {
    render(<Tabs tabs={TABS} activeTab='ASSIGNED' onSelect={onSelect} />);
    const assignedBtn = screen.getByText(/ASSIGNED/);
    fireEvent.click(assignedBtn);
    expect(onSelect).not.toHaveBeenCalledWith('COMPLETED');
    expect(onSelect).toHaveBeenCalledWith('ASSIGNED');
  });

  it('Check if correct button is selected', () => {
    render(<Tabs tabs={TABS} activeTab='COMPLETED' onSelect={onSelect} />);
    const completedBtn = screen.getByText(/COMPLETED/);
    expect(completedBtn).toHaveClass('active')
  });

  it('should render all tabs passed with correct text', () => {
    render(<Tabs tabs={TABS} activeTab='ASSIGNED' onSelect={onSelect} />);
    const presentTabs = screen.getAllByRole('button');
    for (let i = 0; i < presentTabs.length; i++) {
      expect(presentTabs[i].textContent).toBe(TABS[i]);
    }
  });
});