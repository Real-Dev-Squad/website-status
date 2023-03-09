import { rest } from "msw";
const URL = process.env.NEXT_PUBLIC_BASE_URL;

export const usersHandler = [
    rest.get(`${URL}/users`,(_, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
            message: "Users returned successfully!",
            users: [
                {
                id: "GuqNDIo4iLrV1ecxa1aC",
                twitter_id: "19sriram",
                roles: {
                    archived: false
                },
                company_name: "Juniper networks ",
                first_name: "Sriram",
                linkedin_id: "uiram",
                incompleteUserDetails: false,
                yoe: "5",
                github_display_name: "Sriram",
                designation: "Front end engineer",
                username: "19sriram",
                github_id: "19sriram",
                last_name: "Raghunathan"
                },
                {
                id: "AtPcqKV6BDqfmkSRxolE",
                github_display_name: "Shobhit Kumar",
                twitter_id: "shobhit_1998",
                linkedin_id: "shobhitkumar0",
                roles: {
                    archived: false
                },
                username: "4everlearning",
                first_name: "Shobhit",
                incompleteUserDetails: false,
                github_id: "shobhit-coder",
                last_name: "Kumar",
                yoe: 2
                }
            ]
            })
        )
    })
]