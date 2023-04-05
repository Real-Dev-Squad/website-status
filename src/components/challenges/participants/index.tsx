const index = (content: any) => {
    const arrayOfParticipants: any[] = content.participants;

    const participants: any[] = [];
    const getParticipants = (users: any[]) => {
        users.forEach((user) => {
            participants.push({
                firstName: user.first_name,
                lastName: user.last_name,
                userName: user.rds_member_id,
                imgUrl: `${process.env.NEXT_PUBLIC_GITHUB_IMAGE_URL}${user.rds_member_id}/img.png`,
                key: user.rds_member_id,
            });
        });
        return participants;
    };
    return getParticipants(arrayOfParticipants);
};

export default index;
