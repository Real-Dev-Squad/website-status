import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import NavBar from '../../../../src/components/navBar';
import isAuthenticated from '@/hooks/useAuthenticated';
import { renderWithProviders } from '@/test-utils/renderWithProvider';
import { setupServer } from 'msw/node';
import handlers from '../../../../__mocks__/handlers';
import {
    selfHandlerFn,
    userSelfData,
} from '../../../../__mocks__/handlers/self.handler';
import { BASE_URL } from '@/constants/url';

const server = setupServer(...handlers);

beforeAll(() => {
    server.listen();
});
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const getLoginButton = () =>
    screen.getByRole('button', { name: 'Sign In With Github GitHub Icon' });
const getLoginLinkNode = () =>
    screen.getByRole('link', { name: 'Sign In With Github GitHub Icon' });
const getStateParam = () =>
    new URL(
        getLoginLinkNode().getAttribute('href')!,
        BASE_URL
    ).searchParams.get('state')!;

describe('Navbar', () => {
    beforeAll;
    test.skip('check for loading state', () => {
        const { getByTestId } = renderWithProviders(<NavBar />);
        const loader = getByTestId('loader');
        expect(loader).toBeInTheDocument();
    });

    test.skip('user whether loggedIn or not', async () => {
        renderWithProviders(<NavBar />);
        expect(screen.getByText('Hello, Mahima')).toBeVisible();
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

    test('show login in button when the user is not logged in', () => {
        server.use(
            selfHandlerFn(404, {
                message: 'User does not exist',
                error: 'Not Found',
            })
        );
        renderWithProviders(<NavBar />);
        expect(getLoginButton()).toBeVisible();
    });

    test('state param on second time login', () => {
        const { rerender } = renderWithProviders(<NavBar />);
        const state = getStateParam();
        rerender(<NavBar />);
        expect(state).not.toBe(getStateParam());
    });

    test('login button client id should be correct', () => {
        renderWithProviders(<NavBar />);
        expect(getLoginLinkNode().getAttribute('href')).toContain(
            '?client_id=23c78f66ab7964e5ef97'
        );
    });
});
