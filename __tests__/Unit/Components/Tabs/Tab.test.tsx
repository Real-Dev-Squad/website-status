import Tabs from '@/components/Tabs/Tabs';
import { getByText, queryByText, render, screen } from '@testing-library/react';

const tabs = ['ASSIGNED', 'COMPLETED', 'AVAILABLE','IN_PROGRESS', 'NEEDS_REVIEW', 'IN_REVIEW', 'VERIFIED',  'MERGED']

describe('Tabs Component', () => {
  const onSelect = jest.fn();
  it('should render 3 tabs', () => {
    render(<Tabs tabs={tabs} activeTab='ASSIGNED' onSelect={onSelect} />);
    // const assigned = screen.getByText(arr.);
    // const available = screen.getByText(tabs.AVAILABLE);
    // const completed = screen.getByText(tabs.COMPLETED);
  })

});