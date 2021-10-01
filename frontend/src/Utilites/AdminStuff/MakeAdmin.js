import axios from "axios";
import error from "../error";

const MakeAdmin = async (setLoading, userId) => {
  setLoading(true);
  try {
    await axios({
      method: "patch",
      data: {
        userId,
      },
      url: "/api/v1/auth/admin",
    });
  } catch (err) {
    error(err, setLoading);
  }
  setLoading(false);
};
export default MakeAdmin;
