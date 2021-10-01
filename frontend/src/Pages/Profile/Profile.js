import { Button, Grid, Typography } from "@material-ui/core";
import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UserActions } from "../../Store/UserSlice";
import { IsAuth } from "../../Utilites/secure";
import Wrapper from "../../Utilites/Wrapper";
import ChangePass from "./ChangePass";
import ProfileAvatar from "./ProfileAvatar";
import useStyle from "./ProfileStyle";
import ShowInfo from "./ShowInfo";

function ProfilePage() {
  const classes = useStyle();
  const { user } = useSelector((state) => state.reducer);
  const dispatch = useDispatch();
  const [img, setImg] = useState();
  const sendImg = (image) => {
    if (image && image !== img) {
      setTimeout(() => {
        setImg(image);
      }, 30);
    }
  };
  async function UploadHandler(e) {
    e.preventDefault();
    if (img) {
      const files = document.getElementById("fileId").files[0];
      const form = new FormData();
      form.append("photo", files);
      const { data } = await axios.patch("/api/v1/auth/image", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      dispatch(UserActions.AddUser(data.promises[0]));
      setImg(undefined);
    }
  }
  IsAuth();
  return (
    <Wrapper>
      <Grid container direction="column" alignItems="center">
        <ProfileAvatar sendImg={sendImg} />
        <Grid
          container
          alignItems="center"
          className={classes.ShowBlock}
          direction="column"
        >
          <ShowInfo title={"Name"} content={user.name} />
          <ShowInfo title={"Email"} content={user.email} />
          <Button
            disabled={!img || img === user.photo}
            color="primary"
            variant="contained"
            className={classes.Button}
            style={{ margin: "2.5rem 0 1rem" }}
            onClick={UploadHandler}
          >
            Upload the photo
          </Button>
          <Grid container>
            <Typography variant="h3" className={classes.changeTitle}>
              change Password
            </Typography>
          </Grid>
          <ChangePass />
        </Grid>
      </Grid>
    </Wrapper>
  );
}
export default ProfilePage;
