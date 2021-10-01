import axios from "axios";
import error from "../error";
const searching = async (words, link, setRefetch, setLoading, setData) => {
  try {
    if (!words || !words.length) {
      setRefetch((e) => !e);
    } else {
      setLoading(true);
      const { data } = await axios.get(link);
      if (data.data.length === 0) {
        setLoading(false);
      } else {
        setData(data.data);
        setLoading(false);
      }
    }
  } catch (err) {
    error(err, setLoading);
  }
};
export default searching;
