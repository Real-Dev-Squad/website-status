import { FC, useState } from "react";
import Card from "@/components/Card/index";
import details from "@/components/challenges/details";
import participantsDetails from "@/components/challenges/participants";
import fetch from "@/helperFunctions/fetch";
import { SUBSCRIBE_TO_CHALLENGE_URL } from "@/components/constants/url";
import { toast, ToastTypes } from "@/helperFunctions/toast";

type ActiveProps = {
    content: {
        id: number;
        title: string;
        level: string;
        start_date: string;
        end_date: string;
        participants: {
            user_id: string;
            first_name: string;
            last_name: string;
            yoe: number;
            company: string;
            designation: string;
            img: string;
            github_id: string;
            linkedin_id: string;
            twitter_id: string;
            instagram_id: string;
            is_member: number;
            rds_member_id: string;
        }[];
        is_active: boolean;
        is_user_subscribed: number;
    };
    userId: string;
};

const { SUCCESS, ERROR } = ToastTypes;

const Active: FC<ActiveProps> = ({ content, userId }) => {
    const [isUserSubscribed, setUserSubscribed] = useState(
        content.is_user_subscribed
    );

    const subscibeUser = async () => {
        try {
            const url = SUBSCRIBE_TO_CHALLENGE_URL;
            const data = {
                challenge_id: content.id,
                user_id: userId,
            };
            const { requestPromise } = fetch({
                url,
                method: "post",
                data,
            });
            const response = await requestPromise;
            setUserSubscribed(response.data.is_user_subscribed);
            toast(SUCCESS, "You have subscribed to the challenges");
        } catch (error: any) {
            if ("response" in error) {
                toast(ERROR, error.response.data.message);
                return;
            }
            toast(ERROR, error.message);
        }
    };

    return (
        <Card
            title={{ text: content.title }}
            data={details(content)}
            participants={participantsDetails(content)}
            button={
                !isUserSubscribed
                    ? {
                          text: "I will do this",
                          onClick: subscibeUser,
                      }
                    : undefined
            }
            key={content.title}
        />
    );
};

export default Active;
