import React from 'react';
import classNames from '@/components/footer/footer.module.scss';
import Link from 'next/link';

const Footer = () => (
    <footer className={classNames.infoRepo}>
        <p>
            The contents of this website are deployed from this{' '}
            <Link
                href="https://github.com/Real-Dev-Squad/website-status"
                target="_blank"
                rel="noopener noreferrer"
            >
                open sourced repo
            </Link>
        </p>
    </footer>
);

export default Footer;
