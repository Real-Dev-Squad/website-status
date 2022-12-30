import { render } from '@testing-library/react';
import Card from '@/components/idleUsers/card';

const DEFAULT_PROPS = {
    user: {
        id: "H3vNvHtFfp1Y57tPNoQ1",
        currentStatus: {
            state: "IDLE",
            updatedAt: "1672251933839",
            from: "1672251933839",
            until: "",
            message: "js, CSS"
        },
        full_name: "Akash Shukla",
        picture: {
            url: "https://res.cloudinary.com/realdevsquad/image/upload/v1667855535/profile/rZVnZKmtON5djMGuGxHl/bwhnucy8iuzrzuqbo8fg.jpg"
        },
        username: "theakashshukla"
    }
}

describe("Idle User Card", () => {
    test("should render card", () => {
        render(
            <Card {...DEFAULT_PROPS} />
        )
    });
    it('displays User image', () => {
        const {getByAltText} = render(<Card  {...DEFAULT_PROPS} />)
        getByAltText("Akash Shukla"); // throws an expception if the element cannot be found
      })
})