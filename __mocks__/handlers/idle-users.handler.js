import { rest } from "msw";
const URL = process.env.NEXT_PUBLIC_BASE_URL;

const idleUserHandler = [
	rest.get(`${URL}/users/status?state=IDLE`, (_, res, ctx) => {
		return res(
			ctx.status(200),
			ctx.json({
				message: "All User Status found successfully.",
				allUserStatus: [
					{
						id: "P8ZEJ2ICrIYzRCbbqexH",
						currentStatus: {
							updatedAt: "1670770946000",
							state: "IDLE",
							from: "1670697000000",
							message: "Frontend / Backend / DSA",
							until: "",
						},
						full_name: "DEBARSHI DAS",
						picture: {
							url: "https://res.cloudinary.com/realdevsquad/image/upload/v1667685133/profile/mtS4DhUvNYsKqI7oCWVB/aenklfhtjldc5ytei3ar.jpg",
						},
						username: "darkstark9000",
					},
					{
						id: "JwYni9ZOztObSvzUaCwL",
						currentStatus: {
							state: "IDLE",
							from: "1670869800000",
							until: "",
							updatedAt: "1670869989059",
							message: "django, python\n",
						},
						full_name: "Vinayak Trivedi",
						picture: {
							url: "https://res.cloudinary.com/realdevsquad/image/upload/v1660416701/profile/2LEt2spMNDUCpkjmbsfa/pmtjfsf2pmk1cdfxrtvr.jpg",
						},
						username: "vinayak",
					},
					{
						id: "nfuuHym5Bg8JSlKUFoaY",
						currentStatus: {
							from: "1671561000000",
							updatedAt: "1671530865798",
							message: "React, JavaScript",
							state: "IDLE",
						},
						full_name: "Manikandan Eakambaram",
						picture: {
							url: "https://res.cloudinary.com/realdevsquad/image/upload/v1671530531/profile/0dgFZOEAsyffmTR4XxFX/owjju9nu9ca29o8bbqwf.jpg",
						},
						username: "manikandan-av",
					},
					{
						id: "H3vNvHtFfp1Y57tPNoQ1",
						currentStatus: {
							state: "IDLE",
							from: "1672251933839",
							until: "",
							updatedAt: "1672251933839",
							message: "js, CSS",
						},
						full_name: "Akash Shukla",
						picture: {
							url: "https://res.cloudinary.com/realdevsquad/image/upload/v1667855535/profile/rZVnZKmtON5djMGuGxHl/bwhnucy8iuzrzuqbo8fg.jpg",
						},
						username: "theakashshukla",
					},
				],
			})
		);
	}),
];

export default idleUserHandler;
