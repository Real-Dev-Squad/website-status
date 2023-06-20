import { Header } from '@/components/Header';
import { render, screen } from '@testing-library/react';

/* eslint-disable */
const useRouter = jest.spyOn(require('next/router'), 'useRouter');

describe('Header without dev mode', () => {
    it('should have Tasks category', () => {
        useRouter.mockImplementation(() => {
            return {
                pathname: '/',
                query: {},
            };
        });
        render(<Header />);
        const element = screen.queryByText('Tasks');
        expect(element).toBeInTheDocument();
        expect(element?.classList.contains('active')).toBeTruthy();
    });

    it('should have Issues category', () => {
        useRouter.mockImplementation(() => {
            return {
                pathname: '/issues',
                query: {},
            };
        });
        render(<Header />);
        const element = screen.queryByText('Issues');
        expect(element).toBeInTheDocument();
        expect(element?.classList.contains('active')).toBeTruthy();
    });

    it('should have Mine category', () => {
        useRouter.mockImplementation(() => {
            return {
                pathname: '/mine',
                query: {},
            };
        });
        render(<Header />);
        const element = screen.queryByText('Mine');
        expect(element).toBeInTheDocument();

        expect(element?.classList.contains('active')).toBeTruthy();
    });

    it('should have Open PRs category', () => {
        useRouter.mockImplementation(() => {
            return {
                pathname: '/openPRs',
                query: {},
            };
        });
        render(<Header />);
        const element = screen.queryByText('Open PRs');
        expect(element).toBeInTheDocument();

        expect(element?.classList.contains('active')).toBeTruthy();
    });

    it('should have Stale PRs category', () => {
        useRouter.mockImplementation(() => {
            return {
                pathname: '/stale-pr',
                query: {},
            };
        });
        render(<Header />);
        const element = screen.queryByText('Stale PRs');
        expect(element).toBeInTheDocument();

        expect(element?.classList.contains('active')).toBeTruthy();
    });

    it('should have Idle Users category', () => {
        useRouter.mockImplementation(() => {
            return {
                pathname: '/idle-users',
                query: {},
            };
        });
        render(<Header />);
        const element = screen.queryByText('Idle Users');
        expect(element).toBeInTheDocument();

        expect(element?.classList.contains('active')).toBeTruthy();
    });

    it('should have Standup category', () => {
        useRouter.mockImplementation(() => {
            return {
                pathname: '/standup',
                query: {},
            };
        });
        render(<Header />);
        const element = screen.queryByText('Standup');
        expect(element).not.toBeInTheDocument();
    });

    it('should have Availability Panel category', () => {
        useRouter.mockImplementation(() => {
            return {
                pathname: '/availability-panel',
                query: {},
            };
        });
        render(<Header />);
        const element = screen.queryByText('Availability Panel');
        expect(element).not.toBeInTheDocument();
    });
});

describe('Header with dev mode', () => {
    it('should have Tasks category', () => {
        useRouter.mockImplementation(() => {
            return {
                pathname: '/',
                query: { dev: true },
            };
        });
        render(<Header />);
        const element = screen.queryByText('Tasks');
        expect(element).toBeInTheDocument();
        expect(element?.classList.contains('active')).toBeTruthy();
    });

    it('should have Issues category', () => {
        useRouter.mockImplementation(() => {
            return {
                pathname: '/issues',
                query: { dev: true },
            };
        });
        render(<Header />);
        const element = screen.queryByText('Issues');
        expect(element).toBeInTheDocument();
        expect(element?.classList.contains('active')).toBeTruthy();
    });

    it('should have Mine category', () => {
        useRouter.mockImplementation(() => {
            return {
                pathname: '/mine',
                query: { dev: true },
            };
        });
        render(<Header />);
        const element = screen.queryByText('Mine');
        expect(element).toBeInTheDocument();

        expect(element?.classList.contains('active')).toBeTruthy();
    });

    it('should have Open PRs category', () => {
        useRouter.mockImplementation(() => {
            return {
                pathname: '/openPRs',
                query: { dev: true },
            };
        });
        render(<Header />);
        const element = screen.queryByText('Open PRs');
        expect(element).toBeInTheDocument();

        expect(element?.classList.contains('active')).toBeTruthy();
    });

    it('should have Stale PRs category', () => {
        useRouter.mockImplementation(() => {
            return {
                pathname: '/stale-pr',
                query: { dev: true },
            };
        });
        render(<Header />);
        const element = screen.queryByText('Stale PRs');
        expect(element).toBeInTheDocument();

        expect(element?.classList.contains('active')).toBeTruthy();
    });

    it('should have Idle Users category', () => {
        useRouter.mockImplementation(() => {
            return {
                pathname: '/idle-users',
                query: { dev: true },
            };
        });
        render(<Header />);
        const element = screen.queryByText('Idle Users');
        expect(element).toBeInTheDocument();

        expect(element?.classList.contains('active')).toBeTruthy();
    });

    it('should have Standup category', () => {
        useRouter.mockImplementation(() => {
            return {
                pathname: '/standup',
                query: { dev: true },
            };
        });
        render(<Header />);
        const element = screen.queryByText('Standup');
        expect(element).toBeInTheDocument();

        expect(element?.classList.contains('active')).toBeTruthy();
    });

    it('should have Availability Panel category', () => {
        useRouter.mockImplementation(() => {
            return {
                pathname: '/availability-panel',
                query: { dev: true },
            };
        });
        render(<Header />);
        const element = screen.queryByText('Availability Panel');
        expect(element).toBeInTheDocument();
        expect(element?.classList.contains('active')).toBeTruthy();
    });
});
