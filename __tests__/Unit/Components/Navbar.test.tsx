import React from 'react';
import { screen } from '@testing-library/react';
import NavBar from '../../../src/components/navBar';
import * as authHooks from '@/hooks/useAuthenticated';
import { renderWithProviders } from '@/test-utils/renderWithProvider';
import { setupServer } from 'msw/node';
import handlers from '../../../__mocks__/handlers';

const server = setupServer(...handlers);

beforeAll(() => {
    server.listen();
});
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Navbar', () => {
    test('check for loading state', () => {
        const { getByTestId } = renderWithProviders(<NavBar />);
        const loader = getByTestId('loader');
        expect(loader).toBeInTheDocument();
    });

    test('user whether loggedIn or not', async () => {
        renderWithProviders(<NavBar />);
        const navbar = await screen.findAllByTestId('navbar');
        expect(screen.getByText('Hello, Mahima'));
    });

    test('renders Navbar Links', async () => {
        renderWithProviders(<NavBar />);
        await screen.findAllByTestId('navbar');
        const homeLink = screen.getByRole('link', { name: 'Welcome' });
        const eventLink = screen.getByRole('link', { name: 'Events' });
        const memberLink = screen.getByRole('link', { name: 'Members' });
        const cryptoLink = screen.getByRole('link', { name: 'Crypto' });
        const statusLink = screen.getByRole('link', { name: 'Status' });

        expect(homeLink).toBeInTheDocument();
        expect(eventLink).toBeInTheDocument();
        expect(memberLink).toBeInTheDocument();
        expect(cryptoLink).toBeInTheDocument();
        expect(statusLink).toBeInTheDocument();
    });

    test('should navigate to different route when different navbar link is clicked', async () => {
        renderWithProviders(<NavBar />);
        await screen.findAllByTestId('navbar');
        const welcomelink = screen.getByRole('link', { name: 'Welcome' });
        const eventLink = screen.getByRole('link', { name: 'Events' });
        const memberLink = screen.getByRole('link', { name: 'Members' });
        const cryptoLink = screen.getByRole('link', { name: 'Crypto' });
        const statusLink = screen.getByRole('link', { name: 'Status' });

        expect(welcomelink).toHaveAttribute(
            'href',
            'https://welcome.realdevsquad.com'
        );
        expect(eventLink).toHaveAttribute(
            'href',
            'https://www.realdevsquad.com/events.html'
        );
        expect(memberLink).toHaveAttribute(
            'href',
            'https://members.realdevsquad.com'
        );
        expect(cryptoLink).toHaveAttribute(
            'href',
            'https://crypto.realdevsquad.com'
        );
        expect(statusLink).toHaveAttribute(
            'href',
            'https://status.realdevsquad.com'
        );
    });

    test('whether logo is rendering or not', async () => {
        const { getByTestId } = renderWithProviders(<NavBar />);
        await screen.findAllByTestId('navbar');
        const logo = getByTestId('logo');
        expect(logo).toBeInTheDocument();
    });
});
