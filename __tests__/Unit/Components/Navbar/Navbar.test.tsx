import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import NavBar from '../../../../src/components/Navbar';
import * as authHooks from '@/hooks/useAuthenticated';
import { renderWithProviders } from '@/test-utils/renderWithProvider';
import { setupServer } from 'msw/node';
import handlers from '../../../../__mocks__/handlers';

const server = setupServer(...handlers);

beforeAll(() => {
    server.listen();
});
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Navbar', () => {
    test.skip('check for loading state', () => {
        const { getByTestId } = renderWithProviders(<NavBar />);
        const loader = getByTestId('loader');
        expect(loader).toBeInTheDocument();
    });

    test.skip('user whether loggedIn or not', async () => {
        renderWithProviders(<NavBar />);
        const navbar = await screen.findAllByTestId('navbar');
        expect(screen.getByText('Hello, Mahima'));
    });

    test('renders the hamburger icon', async () => {
        const { getByTestId } = renderWithProviders(<NavBar />);
        await screen.findAllByTestId('navbar');
        const hamburgerIcon = getByTestId('hamburgerIcon');
        expect(hamburgerIcon).toBeInTheDocument();
    });

    test('renders Navbar Links', async () => {
        renderWithProviders(<NavBar />);
        await screen.findAllByTestId('navbar');
        const homeLink = screen.getByRole('link', { name: 'Welcome' });
        const eventLink = screen.getByRole('link', { name: 'Events' });
        const memberLink = screen.getByRole('link', { name: 'Members' });
        // TODO: Uncomment when crypto is added
        // const cryptoLink = screen.getByRole('link', { name: 'Crypto' });
        const statusLink = screen.getByRole('link', { name: 'Status' });

        expect(homeLink).toBeInTheDocument();
        expect(eventLink).toBeInTheDocument();
        expect(memberLink).toBeInTheDocument();
        // TODO: Uncomment when crypto is added
        // expect(cryptoLink).toBeInTheDocument();
        expect(statusLink).toBeInTheDocument();
    });

    test('should navigate to different route when different navbar link is clicked', async () => {
        renderWithProviders(<NavBar />);
        await screen.findAllByTestId('navbar');
        const welcomelink = screen.getByRole('link', { name: 'Welcome' });
        const eventLink = screen.getByRole('link', { name: 'Events' });
        const memberLink = screen.getByRole('link', { name: 'Members' });
        // TODO: Uncomment when crypto is added
        // const cryptoLink = screen.getByRole('link', { name: 'Crypto' });
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
        // TODO: Uncomment when crypto is added
        // expect(cryptoLink).toHaveAttribute(
        //     'href',
        //     'https://crypto.realdevsquad.com'
        // );
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

    test('should toggle the dropdown', async () => {
        renderWithProviders(<NavBar />);
        const button = await screen.findByTestId('toggler');
        fireEvent.click(button);
        expect(screen.getByTestId('dropdown')).toBeInTheDocument();
    });
});
