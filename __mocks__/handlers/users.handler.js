import { rest } from 'msw';
const URL = process.env.NEXT_PUBLIC_BASE_URL;
import usersData from '../db/users';

const usersHandler = [
    rest.get(`${URL}/users`,(req, res, ctx) => {
        const searchParamToMatch = req.url.searchParams.get('search') ?? '';
        const nextIdToMatch = req.url.searchParams.get('next');
        const prevIdToMatch = req.url.searchParams.get('prev');
        const size = parseInt(req.url.searchParams.get('size'));
        let nextId;
        let prevId;

        let filteredUsers = usersData.filter((userObj) => {
            return (
                !searchParamToMatch ||
                userObj.username.startsWith(searchParamToMatch)
            );
        });

        if (nextIdToMatch) {
            const index = filteredUsers.findIndex((userObj) => {
                return userObj.id === nextIdToMatch;
            });
            const startIndex = index + 1;
            const endIndex = startIndex + size;
            filteredUsers = filteredUsers.slice(startIndex, endIndex);
        } else if (prevIdToMatch) {
            const index = filteredUsers.findIndex((userObj) => {
                return userObj.id === nextIdToMatch;
            });

            const startIndex = index - filteredUsers.length;
            const endIndex = startIndex + size;
            filteredUsers = filteredUsers.slice(startIndex, endIndex);
        } else if (size) {
            filteredUsers = filteredUsers.slice(0, size);
        }
        nextId = filteredUsers[filteredUsers.length - 1].id ?? '';
        prevId = filteredUsers[0].id ?? '';

        return res(
            ctx.status(200),
            ctx.json({
                message: 'Users returned successfully!',
                users: filteredUsers,
                links: {
                    next: nextId
                        ? `/users?size=${size}&next=${nextId}&search=${searchParamToMatch}`
                        : '',
                    prev: prevId
                        ? `/users?size=${size}&prev=${prevId}&search=${searchParamToMatch}`
                        : '',
                },
            })
        );
    }),
];

export default usersHandler;
