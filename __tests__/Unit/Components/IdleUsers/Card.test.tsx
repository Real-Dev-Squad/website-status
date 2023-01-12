import { render, screen, waitFor } from '@testing-library/react';
import Card from '@/components/idleUsers/card';
import { MEMBERS_URL } from '@/components/constants/url';
import { IdleUser } from '@/interfaces/idleUser.type';
import Image from 'next/image';
const user: IdleUser = {
    id: "H3vNvHtFfp1Y57tPNoQ1",
    currentStatus: {
        state: "IDLE",
        updatedAt: "1672251933839",
        from: "1672272000000",
        until: "",
        message: "js, CSS"
    },
    full_name: "Akash Shukla",
    picture: {
        url: "https://res.cloudinary.com/realdevsquad/image/upload/v1667855535/profile/rZVnZKmtON5djMGuGxHl/bwhnucy8iuzrzuqbo8fg.jpg"
    },
    username: "theakashshukla"
}

describe("Idle User Card", () => {

    const profileUrl = `${MEMBERS_URL}/${user.username}`

    it("should render card", () => {
        render(<Card user={user} />)

        const userImage = screen.getByTestId('user-image');
        const fullName = screen.getByText(user.full_name);
        const idleSince = screen.getByTestId('idle-since');
        const cardLink = screen.getByTestId('profile-card');

        const expectedIdleSinceText = '14 days ago';

        expect(fullName).toHaveTextContent(user.full_name);
        expect(cardLink).toHaveAttribute('href', profileUrl)
        expect(idleSince).toHaveTextContent(expectedIdleSinceText);
        expect(userImage).toHaveAttribute('alt', user.full_name);
        // expect(userImage).toHaveAttribute('src', user.picture.url); 
    });
})