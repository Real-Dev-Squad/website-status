const cloudinaryImageUrl = `https://res.cloudinary.com/realdevsquad/image/upload`;
const userBaseUrl = `https://api.realdevsquad.com`;

export const getCloudinaryImgURL = async (userName: string,config:string) => {
    const memberDataUrl = `${userBaseUrl}/users/${userName}`
    try {
        let res = await fetch(memberDataUrl);
        const data = await res.json()
        const { user } = data;
        if (user.picture?.publicId) {
            const imageUrl = `${cloudinaryImageUrl}/${config}/${user.picture.publicId}`
            return imageUrl;
        }
    } catch (e) {
        console.error(e)
    }
    return `/dummyProfile.png`;
}