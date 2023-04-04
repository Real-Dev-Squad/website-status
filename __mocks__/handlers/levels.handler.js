import { rest } from "msw";
const URL = process.env.NEXT_PUBLIC_BASE_URL;

const levelsHandler = [
	rest.get(`${URL}/levels`, (_, res, ctx) => {
		return res(
			ctx.status(200),
			ctx.json({
				message: "Levels returned Successfully",
				levels: [
					{
						id: "ORS84peu3fAyPi54CNDt",
						name: "two",
						createdBy: "XAF7rSUvk4p0d098qWYS",
						value: 2,
						date: {
							_seconds: 1670107075,
							_nanoseconds: 971000000,
						},
					},
					{
						id: "QEQfB3MhcZCB2nnGzj9T",
						createdBy: "XAF7rSUvk4p0d098qWYS",
						value: 5,
						date: {
							_seconds: 1670516361,
							_nanoseconds: 177000000,
						},
						name: "five",
					},
					{
						id: "ZbxSl5h3AgFx4G1Axb5P",
						date: {
							_seconds: 1670105941,
							_nanoseconds: 299000000,
						},
						value: 4,
						createdBy: "XAF7rSUvk4p0d098qWYS",
						name: "four",
					},
					{
						id: "cDdQXU0GKxVBIRDnBKpH",
						name: "zero",
						value: 0,
						date: {
							_seconds: 1670516153,
							_nanoseconds: 348000000,
						},
						createdBy: "XAF7rSUvk4p0d098qWYS",
					},
					{
						id: "mtipLVmqbvsJGNT2cjiJ",
						name: "Debugging",
						createdBy: "XAF7rSUvk4p0d098qWYS",
						date: {
							_seconds: 1677194133,
							_nanoseconds: 987000000,
						},
						value: 0,
					},
					{
						id: "pcfFBfsmICeOkipFmHTP",
						name: "one",
						value: 1,
						date: {
							_seconds: 1670518024,
							_nanoseconds: 296000000,
						},
						createdBy: "XAF7rSUvk4p0d098qWYS",
					},
					{
						id: "qHW1Dtte0DtfqzlMOzqP",
						date: {
							_seconds: 1677194139,
							_nanoseconds: 304000000,
						},
						createdBy: "XAF7rSUvk4p0d098qWYS",
						value: 1,
						name: "Debugging",
					},
					{
						id: "w9k8hqCVvDzYpOn7qaGs",
						createdBy: "XAF7rSUvk4p0d098qWYS",
						value: 3,
						date: {
							_seconds: 1670729417,
							_nanoseconds: 638000000,
						},
						name: "three",
					},
				],
			})
		);
	}),
];

export default levelsHandler;
