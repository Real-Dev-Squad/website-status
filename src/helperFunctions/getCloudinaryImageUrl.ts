import { DUMMY_PROFILE_PATH } from "@/components/constants/display-sections";

const CLOUDINARY_IMAGE_URL = `https://res.cloudinary.com/realdevsquad/image/upload`;
const USER_DATA_BASE_URL = `https://api.realdevsquad.com`;

export const getCloudinaryImgURL = async (userName: string,config:string) => {
    const memberDataURL = `${USER_DATA_BASE_URL}/users/${userName}`
    try {
        let res = await fetch(memberDataURL);
        const data = await res.json()
        const { user } = data;
        if (user.picture?.publicId) {
            const imageURL = `${CLOUDINARY_IMAGE_URL}/${config}/${user.picture.publicId}`
            return imageURL;
        }
    } catch (e) {
        console.error(e)
    }
    return DUMMY_PROFILE_PATH;
}