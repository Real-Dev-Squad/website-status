import React from "react";
import classNames from "@/components/footer/footer.module.scss";

const Footer = () => (
    <footer className={classNames.infoRepo}>
        <p>
            The contents of this website are deployed from this{" "}
            <a
                href="https://github.com/Real-Dev-Squad/website-status"
                target="_blank"
                rel="noopener noreferrer"
            >
                open sourced repo
            </a>
        </p>
    </footer>
);

export default Footer;
