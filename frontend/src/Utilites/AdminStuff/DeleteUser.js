import axios from "axios";
import error from "../error";

const DeleteUser = async (setLoading, userId) => {
  setLoading(true);
  try {
    await axios({
      method: "delete",
      data: {
        userId,
      },
      url: "/api/v1/auth/admin",
    });
  } catch (err) {
    error(err, setLoading);
    return false;
  }
  setLoading(false);
  return true;
};
export default DeleteUser;
