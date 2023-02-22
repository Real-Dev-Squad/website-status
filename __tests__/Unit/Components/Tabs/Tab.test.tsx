import Tabs from '@/components/Tabs/Tabs';
import { getAllByRole, getByText, queryByText, render, screen } from '@testing-library/react';
import { TABS } from '@/components/tasks/constants';
describe('Tabs Component', () => {
  const onSelect = jest.fn();
  it('should render all the buttons', () => {
    render(<Tabs tabs={TABS} activeTab='ASSIGNED' onSelect={onSelect} />);
    const tabLength = screen.queryAllByRole('button');
    expect(tabLength.length).toBe(TABS.length);
  })
});