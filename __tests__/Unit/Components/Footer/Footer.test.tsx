import Footer from '@/components/footer';
import { render } from '@testing-library/react';
import React from 'react';

describe('Footer', () => {
    it('should render the Footer component', () => {
        const { getByText } = render(<Footer />);
        const linkElement = getByText(
            /The contents of this website are deployed from this/i
        );
        expect(linkElement).toBeInTheDocument();
        const link = getByText(/open sourced repo/i);
        expect(link).toBeInTheDocument();

        const expectedRepoUrl =
            'https://github.com/Real-Dev-Squad/website-status';
        expect(link.getAttribute('href')).toBe(expectedRepoUrl);
    });
});
