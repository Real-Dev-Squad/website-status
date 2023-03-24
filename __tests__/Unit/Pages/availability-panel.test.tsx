import AvailabilityPanel from '@/pages/availability-panel';
import { useGetIdleStatusQuery, useGetAllTasksQuery } from '@/slices/apiSlice';
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { render, screen } from '@testing-library/react';

jest.mock('../../../slices/apiSlice');
jest.mock('next/router', () => require('next-router-mock'));
jest.mock('@reduxjs/toolkit/query/react', () => ({
  ...jest.requireActual('@reduxjs/toolkit/query/react'),
  fetchBaseQuery: jest.fn(),
}));

describe('AvailabilityPanel', () => {
  const mockUseGetIdleStatusQuery =
    useGetIdleStatusQuery as jest.MockedFunction<typeof useGetIdleStatusQuery>;
  const mockUseGetAllTasksQuery = useGetAllTasksQuery as jest.MockedFunction<
    typeof useGetAllTasksQuery
  >;

  beforeEach(() => {
    (fetchBaseQuery as jest.MockedFunction<typeof fetchBaseQuery>).mockReset();
  });

  it('renders loading message while fetching data', () => {
    mockUseGetIdleStatusQuery.mockReturnValue({
      data: undefined,
      isLoading: true,
      refetch: jest.fn(),
    });
    mockUseGetAllTasksQuery.mockReturnValue({
      data: undefined,
      isLoading: true,
      refetch: jest.fn(),
    });

    render(<AvailabilityPanel />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});
