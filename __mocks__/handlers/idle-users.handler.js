import { rest } from 'msw';
const URL = process.env.NEXT_PUBLIC_BASE_URL;

const idleUserHandler = [
  rest.get(`${URL}/users/status`, (req, res, ctx) => {

    if(req.url.searchParams.get("state") === "IDLE") {
      return res(
        ctx.status(200),
        ctx.json({
          message: 'All User Status found successfully.',
          allUserStatus: [
            {
              id: 'P8ZEJ2ICrIYzRCbbqexH',
              currentStatus: {
                updatedAt: '1670770946000',
                state: 'IDLE',
                from: '1670697000000',
                message: 'Frontend / Backend / DSA',
                until: '',
              },
              full_name: 'DEBARSHI DAS',
              picture: {
                url: 'https://res.cloudinary.com/realdevsquad/image/upload/v1667685133/profile/mtS4DhUvNYsKqI7oCWVB/aenklfhtjldc5ytei3ar.jpg',
              },
              username: 'darkstark9000',
            },
            {
              id: 'H3vNvHtFfp1Y57tPNoQ1',
              currentStatus: {
                state: 'IDLE',
                from: '1672251933839',
                until: '',
                updatedAt: '1672251933839',
                message: 'js, CSS',
              },
              full_name: 'Akash Shukla',
              picture: {
                url: 'https://res.cloudinary.com/realdevsquad/image/upload/v1667855535/profile/rZVnZKmtON5djMGuGxHl/bwhnucy8iuzrzuqbo8fg.jpg',
              },
              username: 'theakashshukla',
            },
          ],
        })
      );
    }
    else {
      return res(
        ctx.status(400),
        ctx.json({ 
          message: "Missing state param"
        }))
    }
  }),
];

export default idleUserHandler;
