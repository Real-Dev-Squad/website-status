import { USER_SELF } from '@/constants/url';
import usersData from '../../__mocks__/db/users';
import { rest } from 'msw';
const URL = process.env.NEXT_PUBLIC_BASE_URL;

const selfHandler = [
	rest.get(`${URL}/users/self`, (_, res, ctx) => {
		return res(
			ctx.status(200),
			ctx.json({
				id: 'aTOG168A86JXY5wVosJx',
				github_display_name: 'Mahima Khandelwal',
				github_id: 'Maheima',
				roles: {
					member: true,
					archived: false
				},
				last_name: 'Khandelwal',
				username: 'mahima',
				incompleteUserDetails: false,
				profileStatus: 'BLOCKED',
				picture: {
					publicId: 'profile/aTOG168A86JXY5wVosJx/fj2c46kpmpy3gi8tl63s',
					url: 'https://res.cloudinary.com/realdevsquad/image/upload/v1674639637/profile/aTOG168A86JXY5wVosJx/fj2c46kpmpy3gi8tl63s.jpg'
				},
				status: 'active',
				first_name: 'Mahima',
				profileURL: 'https://mahima-profile-service.onrender.com'
			})
		);
	}),
];

export const adminUserHandler = [
    rest.get(USER_SELF, (_, res, ctx) => {
        return res(ctx.status(200), ctx.json(usersData[11]));
    }),
];

export default selfHandler;
