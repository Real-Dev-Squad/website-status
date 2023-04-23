import React from 'react';
import { render, screen } from '@testing-library/react';
import NavBar from '../../../src/components/navBar';
import * as authHooks from '@/hooks/useAuthenticated';

describe('Navbar', () => {
    test('renders the Navbar component', () => {
        const { getByTestId } = render(<NavBar />);
        const navbar = getByTestId('navbar');
        expect(navbar).toBeInTheDocument();
    });

    test('renders the hamburger icon', () => {
        const { getByTestId } = render(<NavBar />);
        const hamburgerIcon = getByTestId('hamburgerIcon');
        expect(hamburgerIcon).toBeInTheDocument();
    });

    test('user whether loggedIn or not', () => {
        jest.spyOn(authHooks, 'default').mockImplementation(() => ({
            userData: {
                userName: 'IamYash',
                firstName: 'Yash',
                profilePicture: '',
            },
            isLoggedIn: true,
            isLoading: true,
        }));
        render(<NavBar />);
        expect(screen.getByText('Hello, Yash'));
    });

    test('renders Navbar Links', () => {
        render(<NavBar />);
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

    test('should navigate to different route when different navbar link is clicked', () => {
        render(<NavBar />);
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

    test('whether logo is rendering or not', () => {
        const { getByTestId } = render(<NavBar />);
        const logo = getByTestId('logo');
        expect(logo).toBeInTheDocument();
    });
});
