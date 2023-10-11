import { Header } from '@/components/Header';
import { render, screen } from '@testing-library/react';

/* eslint-disable */
const useRouter = jest.spyOn(require('next/router'), 'useRouter');

describe('Header without dev mode', () => {
    it('should have Tasks category', () => {
        useRouter.mockImplementation(() => {
            return {
                pathname: '/tasks',
                query: {},
            };
        });
        render(<Header />);
        const taskElement = screen.getByText('Tasks');
        const issueElement = screen.getByText('Issues');
        const mineElement = screen.getByText('Mine');
        const openPRElement = screen.getByText('Open PRs');
        const stalePRElement = screen.getByText('Stale PRs');
        const idleUsersElement = screen.getByText('Idle Users');
        const standupElement = screen.queryByText('Standup');
        const availabilityElement = screen.queryByText('Availability Panel');

        expect(taskElement.classList.contains('active')).toBeTruthy();
        expect(issueElement.classList.contains('active')).toBeFalsy();
        expect(mineElement.classList.contains('active')).toBeFalsy();
        expect(openPRElement.classList.contains('active')).toBeFalsy();
        expect(stalePRElement.classList.contains('active')).toBeFalsy();
        expect(idleUsersElement.classList.contains('active')).toBeFalsy();
        expect(standupElement).not.toBeInTheDocument();
        expect(availabilityElement).not.toBeInTheDocument();
    });

    it('should have Issues category', () => {
        useRouter.mockImplementation(() => {
            return {
                pathname: '/issues',
                query: {},
            };
        });
        render(<Header />);
        const taskElement = screen.getByText('Tasks');
        const issueElement = screen.getByText('Issues');
        const mineElement = screen.getByText('Mine');
        const openPRElement = screen.getByText('Open PRs');
        const stalePRElement = screen.getByText('Stale PRs');
        const idleUsersElement = screen.getByText('Idle Users');
        const standupElement = screen.queryByText('Standup');
        const availabilityElement = screen.queryByText('Availability Panel');

        expect(taskElement.classList.contains('active')).toBeFalsy();
        expect(issueElement.classList.contains('active')).toBeTruthy();
        expect(mineElement.classList.contains('active')).toBeFalsy();
        expect(openPRElement.classList.contains('active')).toBeFalsy();
        expect(stalePRElement.classList.contains('active')).toBeFalsy();
        expect(idleUsersElement.classList.contains('active')).toBeFalsy();
        expect(standupElement).not.toBeInTheDocument();
        expect(availabilityElement).not.toBeInTheDocument();
    });

    it('should have Mine category', () => {
        useRouter.mockImplementation(() => {
            return {
                pathname: '/mine',
                query: {},
            };
        });
        render(<Header />);
        const taskElement = screen.getByText('Tasks');
        const issueElement = screen.getByText('Issues');
        const mineElement = screen.getByText('Mine');
        const openPRElement = screen.getByText('Open PRs');
        const stalePRElement = screen.getByText('Stale PRs');
        const idleUsersElement = screen.getByText('Idle Users');
        const standupElement = screen.queryByText('Standup');
        const availabilityElement = screen.queryByText('Availability Panel');

        expect(taskElement.classList.contains('active')).toBeFalsy();
        expect(issueElement.classList.contains('active')).toBeFalsy();
        expect(mineElement.classList.contains('active')).toBeTruthy();
        expect(openPRElement.classList.contains('active')).toBeFalsy();
        expect(stalePRElement.classList.contains('active')).toBeFalsy();
        expect(idleUsersElement.classList.contains('active')).toBeFalsy();
        expect(standupElement).not.toBeInTheDocument();
        expect(availabilityElement).not.toBeInTheDocument();
    });

    it('should have Open PRs category', () => {
        useRouter.mockImplementation(() => {
            return {
                pathname: '/open-prs',
                query: {},
            };
        });
        render(<Header />);
        const taskElement = screen.getByText('Tasks');
        const issueElement = screen.getByText('Issues');
        const mineElement = screen.getByText('Mine');
        const openPRElement = screen.getByText('Open PRs');
        const stalePRElement = screen.getByText('Stale PRs');
        const idleUsersElement = screen.getByText('Idle Users');
        const standupElement = screen.queryByText('Standup');
        const availabilityElement = screen.queryByText('Availability Panel');

        expect(taskElement.classList.contains('active')).toBeFalsy();
        expect(issueElement.classList.contains('active')).toBeFalsy();
        expect(mineElement.classList.contains('active')).toBeFalsy();
        expect(openPRElement.classList.contains('active')).toBeTruthy();
        expect(stalePRElement.classList.contains('active')).toBeFalsy();
        expect(idleUsersElement.classList.contains('active')).toBeFalsy();
        expect(standupElement).not.toBeInTheDocument();
        expect(availabilityElement).not.toBeInTheDocument();
    });

    it('should have Stale PRs category', () => {
        useRouter.mockImplementation(() => {
            return {
                pathname: '/stale-prs',
                query: {},
            };
        });
        render(<Header />);
        const taskElement = screen.getByText('Tasks');
        const issueElement = screen.getByText('Issues');
        const mineElement = screen.getByText('Mine');
        const openPRElement = screen.getByText('Open PRs');
        const stalePRElement = screen.getByText('Stale PRs');
        const idleUsersElement = screen.getByText('Idle Users');
        const standupElement = screen.queryByText('Standup');
        const availabilityElement = screen.queryByText('Availability Panel');

        expect(taskElement.classList.contains('active')).toBeFalsy();
        expect(issueElement.classList.contains('active')).toBeFalsy();
        expect(mineElement.classList.contains('active')).toBeFalsy();
        expect(openPRElement.classList.contains('active')).toBeFalsy();
        expect(stalePRElement.classList.contains('active')).toBeTruthy();
        expect(idleUsersElement.classList.contains('active')).toBeFalsy();
        expect(standupElement).not.toBeInTheDocument();
        expect(availabilityElement).not.toBeInTheDocument();
    });

    it('should have Idle Users category', () => {
        useRouter.mockImplementation(() => {
            return {
                pathname: '/idle-users',
                query: {},
            };
        });
        render(<Header />);
        const taskElement = screen.getByText('Tasks');
        const issueElement = screen.getByText('Issues');
        const mineElement = screen.getByText('Mine');
        const openPRElement = screen.getByText('Open PRs');
        const stalePRElement = screen.getByText('Stale PRs');
        const idleUsersElement = screen.getByText('Idle Users');
        const standupElement = screen.queryByText('Standup');
        const availabilityElement = screen.queryByText('Availability Panel');

        expect(taskElement.classList.contains('active')).toBeFalsy();
        expect(issueElement.classList.contains('active')).toBeFalsy();
        expect(mineElement.classList.contains('active')).toBeFalsy();
        expect(openPRElement.classList.contains('active')).toBeFalsy();
        expect(stalePRElement.classList.contains('active')).toBeFalsy();
        expect(idleUsersElement.classList.contains('active')).toBeTruthy();
        expect(standupElement).not.toBeInTheDocument();
        expect(availabilityElement).not.toBeInTheDocument();
    });

    it('should have Standup category', () => {
        useRouter.mockImplementation(() => {
            return {
                pathname: '/standup',
                query: {},
            };
        });
        render(<Header />);
        const taskElement = screen.getByText('Tasks');
        const issueElement = screen.getByText('Issues');
        const mineElement = screen.getByText('Mine');
        const openPRElement = screen.getByText('Open PRs');
        const stalePRElement = screen.getByText('Stale PRs');
        const idleUsersElement = screen.getByText('Idle Users');
        const standupElement = screen.queryByText('Standup');
        const availabilityElement = screen.queryByText('Availability Panel');

        expect(taskElement.classList.contains('active')).toBeFalsy();
        expect(issueElement.classList.contains('active')).toBeFalsy();
        expect(mineElement.classList.contains('active')).toBeFalsy();
        expect(openPRElement.classList.contains('active')).toBeFalsy();
        expect(stalePRElement.classList.contains('active')).toBeFalsy();
        expect(idleUsersElement.classList.contains('active')).toBeFalsy();
        expect(standupElement).not.toBeInTheDocument();
        expect(availabilityElement).not.toBeInTheDocument();
    });

    it('should have Availability Panel category', () => {
        useRouter.mockImplementation(() => {
            return {
                pathname: '/availability-panel',
                query: {},
            };
        });
        render(<Header />);
        const taskElement = screen.getByText('Tasks');
        const issueElement = screen.getByText('Issues');
        const mineElement = screen.getByText('Mine');
        const openPRElement = screen.getByText('Open PRs');
        const stalePRElement = screen.getByText('Stale PRs');
        const idleUsersElement = screen.getByText('Idle Users');
        const standupElement = screen.queryByText('Standup');
        const availabilityElement = screen.queryByText('Availability Panel');

        expect(taskElement.classList.contains('active')).toBeFalsy();
        expect(issueElement.classList.contains('active')).toBeFalsy();
        expect(mineElement.classList.contains('active')).toBeFalsy();
        expect(openPRElement.classList.contains('active')).toBeFalsy();
        expect(stalePRElement.classList.contains('active')).toBeFalsy();
        expect(idleUsersElement.classList.contains('active')).toBeFalsy();
        expect(standupElement).not.toBeInTheDocument();
        expect(availabilityElement).not.toBeInTheDocument();
    });
});

describe('Header with dev mode', () => {
    it('should have Tasks category', () => {
        useRouter.mockImplementation(() => {
            return {
                pathname: '/tasks',
                query: { dev: true },
            };
        });
        render(<Header />);
        const taskElement = screen.getByText('Tasks');
        const issueElement = screen.getByText('Issues');
        const mineElement = screen.getByText('Mine');
        const openPRElement = screen.getByText('Open PRs');
        const stalePRElement = screen.getByText('Stale PRs');
        const idleUsersElement = screen.getByText('Idle Users');
        const standupElement = screen.getByText('Standup');
        const availabilityElement = screen.getByText('Availability Panel');

        expect(taskElement.classList.contains('active')).toBeTruthy();
        expect(issueElement.classList.contains('active')).toBeFalsy();
        expect(mineElement.classList.contains('active')).toBeFalsy();
        expect(openPRElement.classList.contains('active')).toBeFalsy();
        expect(stalePRElement.classList.contains('active')).toBeFalsy();
        expect(idleUsersElement.classList.contains('active')).toBeFalsy();
        expect(standupElement.classList.contains('active')).toBeFalsy();
        expect(availabilityElement.classList.contains('active')).toBeFalsy();
    });

    it('should have Issues category', () => {
        useRouter.mockImplementation(() => {
            return {
                pathname: '/issues',
                query: { dev: true },
            };
        });
        render(<Header />);
        const taskElement = screen.getByText('Tasks');
        const issueElement = screen.getByText('Issues');
        const mineElement = screen.getByText('Mine');
        const openPRElement = screen.getByText('Open PRs');
        const stalePRElement = screen.getByText('Stale PRs');
        const idleUsersElement = screen.getByText('Idle Users');
        const standupElement = screen.getByText('Standup');
        const availabilityElement = screen.getByText('Availability Panel');

        expect(taskElement.classList.contains('active')).toBeFalsy();
        expect(issueElement.classList.contains('active')).toBeTruthy();
        expect(mineElement.classList.contains('active')).toBeFalsy();
        expect(openPRElement.classList.contains('active')).toBeFalsy();
        expect(stalePRElement.classList.contains('active')).toBeFalsy();
        expect(idleUsersElement.classList.contains('active')).toBeFalsy();
        expect(standupElement.classList.contains('active')).toBeFalsy();
        expect(availabilityElement.classList.contains('active')).toBeFalsy();
    });

    it('should have Mine category', () => {
        useRouter.mockImplementation(() => {
            return {
                pathname: '/mine',
                query: { dev: true },
            };
        });
        render(<Header />);
        const taskElement = screen.getByText('Tasks');
        const issueElement = screen.getByText('Issues');
        const mineElement = screen.getByText('Mine');
        const openPRElement = screen.getByText('Open PRs');
        const stalePRElement = screen.getByText('Stale PRs');
        const idleUsersElement = screen.getByText('Idle Users');
        const standupElement = screen.getByText('Standup');
        const availabilityElement = screen.getByText('Availability Panel');

        expect(taskElement.classList.contains('active')).toBeFalsy();
        expect(issueElement.classList.contains('active')).toBeFalsy();
        expect(mineElement.classList.contains('active')).toBeTruthy();
        expect(openPRElement.classList.contains('active')).toBeFalsy();
        expect(stalePRElement.classList.contains('active')).toBeFalsy();
        expect(idleUsersElement.classList.contains('active')).toBeFalsy();
        expect(standupElement.classList.contains('active')).toBeFalsy();
        expect(availabilityElement.classList.contains('active')).toBeFalsy();
    });

    it('should have Open PRs category', () => {
        useRouter.mockImplementation(() => {
            return {
                pathname: '/open-prs',
                query: { dev: true },
            };
        });
        render(<Header />);
        const taskElement = screen.getByText('Tasks');
        const issueElement = screen.getByText('Issues');
        const mineElement = screen.getByText('Mine');
        const openPRElement = screen.getByText('Open PRs');
        const stalePRElement = screen.getByText('Stale PRs');
        const idleUsersElement = screen.getByText('Idle Users');
        const standupElement = screen.getByText('Standup');
        const availabilityElement = screen.getByText('Availability Panel');

        expect(taskElement.classList.contains('active')).toBeFalsy();
        expect(issueElement.classList.contains('active')).toBeFalsy();
        expect(mineElement.classList.contains('active')).toBeFalsy();
        expect(openPRElement.classList.contains('active')).toBeTruthy();
        expect(stalePRElement.classList.contains('active')).toBeFalsy();
        expect(idleUsersElement.classList.contains('active')).toBeFalsy();
        expect(standupElement.classList.contains('active')).toBeFalsy();
        expect(availabilityElement.classList.contains('active')).toBeFalsy();
    });

    it('should have Stale PRs category', () => {
        useRouter.mockImplementation(() => {
            return {
                pathname: '/stale-prs',
                query: { dev: true },
            };
        });
        render(<Header />);
        const taskElement = screen.getByText('Tasks');
        const issueElement = screen.getByText('Issues');
        const mineElement = screen.getByText('Mine');
        const openPRElement = screen.getByText('Open PRs');
        const stalePRElement = screen.getByText('Stale PRs');
        const idleUsersElement = screen.getByText('Idle Users');
        const standupElement = screen.getByText('Standup');
        const availabilityElement = screen.getByText('Availability Panel');

        expect(taskElement.classList.contains('active')).toBeFalsy();
        expect(issueElement.classList.contains('active')).toBeFalsy();
        expect(mineElement.classList.contains('active')).toBeFalsy();
        expect(openPRElement.classList.contains('active')).toBeFalsy();
        expect(stalePRElement.classList.contains('active')).toBeTruthy();
        expect(idleUsersElement.classList.contains('active')).toBeFalsy();
        expect(standupElement.classList.contains('active')).toBeFalsy();
        expect(availabilityElement.classList.contains('active')).toBeFalsy();
    });

    it('should have Idle Users category', () => {
        useRouter.mockImplementation(() => {
            return {
                pathname: '/idle-users',
                query: { dev: true },
            };
        });
        render(<Header />);
        const taskElement = screen.getByText('Tasks');
        const issueElement = screen.getByText('Issues');
        const mineElement = screen.getByText('Mine');
        const openPRElement = screen.getByText('Open PRs');
        const stalePRElement = screen.getByText('Stale PRs');
        const idleUsersElement = screen.getByText('Idle Users');
        const standupElement = screen.getByText('Standup');
        const availabilityElement = screen.getByText('Availability Panel');

        expect(taskElement.classList.contains('active')).toBeFalsy();
        expect(issueElement.classList.contains('active')).toBeFalsy();
        expect(mineElement.classList.contains('active')).toBeFalsy();
        expect(openPRElement.classList.contains('active')).toBeFalsy();
        expect(stalePRElement.classList.contains('active')).toBeFalsy();
        expect(idleUsersElement.classList.contains('active')).toBeTruthy();
        expect(standupElement.classList.contains('active')).toBeFalsy();
        expect(availabilityElement.classList.contains('active')).toBeFalsy();
    });

    it('should have Standup category', () => {
        useRouter.mockImplementation(() => {
            return {
                pathname: '/standup',
                query: { dev: true },
            };
        });
        render(<Header />);
        const taskElement = screen.getByText('Tasks');
        const issueElement = screen.getByText('Issues');
        const mineElement = screen.getByText('Mine');
        const openPRElement = screen.getByText('Open PRs');
        const stalePRElement = screen.getByText('Stale PRs');
        const idleUsersElement = screen.getByText('Idle Users');
        const standupElement = screen.getByText('Standup');
        const availabilityElement = screen.getByText('Availability Panel');

        expect(taskElement.classList.contains('active')).toBeFalsy();
        expect(issueElement.classList.contains('active')).toBeFalsy();
        expect(mineElement.classList.contains('active')).toBeFalsy();
        expect(openPRElement.classList.contains('active')).toBeFalsy();
        expect(stalePRElement.classList.contains('active')).toBeFalsy();
        expect(idleUsersElement.classList.contains('active')).toBeFalsy();
        expect(standupElement.classList.contains('active')).toBeTruthy();
        expect(availabilityElement.classList.contains('active')).toBeFalsy();
    });

    it('should have Availability Panel category', () => {
        useRouter.mockImplementation(() => {
            return {
                pathname: '/availability-panel',
                query: { dev: true },
            };
        });
        render(<Header />);
        const taskElement = screen.getByText('Tasks');
        const issueElement = screen.getByText('Issues');
        const mineElement = screen.getByText('Mine');
        const openPRElement = screen.getByText('Open PRs');
        const stalePRElement = screen.getByText('Stale PRs');
        const idleUsersElement = screen.getByText('Idle Users');
        const standupElement = screen.getByText('Standup');
        const availabilityElement = screen.getByText('Availability Panel');

        expect(taskElement.classList.contains('active')).toBeFalsy();
        expect(issueElement.classList.contains('active')).toBeFalsy();
        expect(mineElement.classList.contains('active')).toBeFalsy();
        expect(openPRElement.classList.contains('active')).toBeFalsy();
        expect(stalePRElement.classList.contains('active')).toBeFalsy();
        expect(idleUsersElement.classList.contains('active')).toBeFalsy();
        expect(standupElement.classList.contains('active')).toBeFalsy();
        expect(availabilityElement.classList.contains('active')).toBeTruthy();
    });
});
