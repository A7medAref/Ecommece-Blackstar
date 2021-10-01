import axios from "axios";
import error from "../error";

const Delivered = async (setLoading, orderId, orders, setOrders, index) => {
  setLoading(true);
  try {
    const newOrders = [...orders];
    await axios.patch("/api/v1/order", { orderId });
    newOrders[index].deliveredAt = Date.now();
    setOrders([...newOrders]);
  } catch (err) {
    error(err, setLoading);
  }
  setLoading(false);
};
export default Delivered;
