import { Grid, Typography, useMediaQuery, useTheme } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { BiTrash } from "react-icons/bi";
import { useSelector } from "react-redux";
import CircularLoading from "../../../Components/Feedback/CircularProgress";
import Wrapper from "../../../Utilites/Wrapper";
import useStyle from "../../../Utilites/OrderStyle";
import { AiOutlineCheck } from "react-icons/ai";
import { RiAdminFill } from "react-icons/ri";
import DeleteUser from "../../../Utilites/AdminStuff/DeleteUser";
import MakeAdmin from "../../../Utilites/AdminStuff/MakeAdmin";
import error from "../../../Utilites/error";
import { IsAdmin } from "../../../Utilites/secure";
import AdminSearch from "../../../Components/AdminSearch/AdminSearch";
import searching from "../../../Utilites/AdminStuff/handleSearch";

function AdminUsers() {
  IsAdmin();
  const classes = useStyle();
  const { isAuth } = useSelector((state) => state.reducer);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refetch, setRefetch] = useState(true);
  const match = useMediaQuery(useTheme().breakpoints.down("xs"));

  const handleSearch = async (userEmail) => {
    await searching(
      userEmail,
      `/api/v1/auth/admin?email=${userEmail}`,
      setRefetch,
      setLoading,
      setUsers
    );
  };

  useEffect(() => {
    try {
      const fetching = async () => {
        setLoading(true);
        const users = await axios.get("/api/v1/auth/admin");
        setUsers(users.data.data);
        setLoading(false);
      };
      fetching();
    } catch (err) {
      error(err, setLoading);
    }
  }, [refetch]);

  const DeleteUserHandler = async (e, i) => {
    if (window.confirm("Are you sure you wanna delete that user")) {
      const newUsers = [...users];
      if (await DeleteUser(setLoading, e._id)) {
        newUsers.splice(i, 1);
        setUsers(newUsers);
      }
    }
  };
  const AdminHandler = async (e) => {
    if (window.confirm("Are you sure you wanna make that user an admin"))
      await MakeAdmin(setLoading, e._id);
    setRefetch((p) => !p);
  };

  return (
    <Wrapper>
      {loading ? (
        <CircularLoading type="page" />
      ) : (
        isAuth && (
          <>
            <Grid container style={{ marginTop: "1rem" }}>
              <Grid item style={{ marginBottom: "2rem" }}>
                <AdminSearch placeholder="User Email" event={handleSearch} />
              </Grid>
              <Grid container className={classes.table}>
                <Grid item xs={3} container alignItems="center">
                  <Typography variant="body1" className={classes.SizeWord}>
                    ID
                  </Typography>
                </Grid>
                <Grid item xs={2} container alignItems="center">
                  <Typography variant="body1" className={classes.SizeWord}>
                    NAME
                  </Typography>
                </Grid>
                <Grid item xs={3} container alignItems="center">
                  <Typography variant="body1" className={classes.SizeWord}>
                    EMAIL
                  </Typography>
                </Grid>
                <Grid item xs={2} container alignItems="center">
                  <Typography variant="body1" className={classes.SizeWord}>
                    ADMIN
                  </Typography>
                </Grid>
                <Grid item xs={2} container alignItems="center">
                  <Typography variant="body1" className={classes.SizeWord}>
                    EDIT
                  </Typography>
                </Grid>
              </Grid>
              {users.map((e, i) => (
                <Grid container className={classes.table} key={e._id}>
                  <Grid
                    item
                    xs={3}
                    container
                    alignItems="center"
                    style={{ overflow: "hidden" }}
                  >
                    <Typography variant="body1" className={classes.SizeWord}>
                      {e._id}
                    </Typography>
                  </Grid>
                  <Grid item xs={2} container alignItems="center">
                    <Typography variant="body1" className={classes.SizeWord}>
                      {e.name}
                    </Typography>
                  </Grid>
                  <Grid item xs={3} container alignItems="center">
                    <Typography
                      variant="body1"
                      style={{ overflow: "hidden" }}
                      className={classes.SizeWord}
                    >
                      {e.email}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={2}
                    container
                    alignItems="center"
                    justifyContent={match ? "center" : undefined}
                  >
                    {e.isAdmin ? (
                      <AiOutlineCheck
                        style={{ color: "green", fontSize: "1.5rem" }}
                      />
                    ) : (
                      "X"
                    )}
                  </Grid>
                  <Grid
                    item
                    xs={2}
                    container
                    alignItems="center"
                    justifyContent={match ? "center" : undefined}
                  >
                    <Typography variant="body1" className={classes.SizeWord}>
                      <RiAdminFill
                        className={classes.adminCreate}
                        onClick={() => AdminHandler(e)}
                      />
                    </Typography>
                    <Typography
                      variant="body1"
                      className={classes.SizeWord}
                      onClick={() => DeleteUserHandler(e, i)}
                    >
                      <BiTrash className={classes.trash} />
                    </Typography>
                  </Grid>
                </Grid>
              ))}
            </Grid>
          </>
        )
      )}
    </Wrapper>
  );
}

export default AdminUsers;
