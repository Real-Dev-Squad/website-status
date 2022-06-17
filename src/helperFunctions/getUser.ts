import { USER_SELF } from "@/components/constants/url";
import fetch from "@/helperFunctions/fetch";
import { toast, ToastTypes } from "@/helperFunctions/toast";

const userData = async () => {
  try {
    const { requestPromise } = fetch({
      url: USER_SELF,
      method: "get",
    });
    const response = await requestPromise;
    return response.data;
  } catch (error) {
    toast(ToastTypes.ERROR, (error as Error).message);
  }
};

export default userData;
