import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

export const IsAdmin = (isAdmin) => {
  const history = useHistory();
  const { isAuth, user, loadingUser } = useSelector((state) => state.reducer);
  if (!loadingUser) if (!isAuth || !user.isAdmin) history.push("/");
};

export const IsAuth = (isAdmin) => {
  const history = useHistory();
  const { isAuth, loadingUser } = useSelector((state) => state.reducer);
  if (!loadingUser) if (!isAuth) history.push("/signin");
};
