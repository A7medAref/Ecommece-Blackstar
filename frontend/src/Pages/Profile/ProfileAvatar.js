import { Grid, Avatar } from "@material-ui/core";
import { useState, useRef } from "react";
import { useSelector } from "react-redux";
import useStyle from "./ProfileStyle";
import { FaCamera } from "react-icons/fa";
function ProfileAvatar({ sendImg }) {
  const classes = useStyle();
  const [showUpload, setShowUpload] = useState(false);
  const { user } = useSelector((state) => state.reducer);
  const [img, setImg] = useState(user.photo);
  const ref = useRef();
  const inputClicked = async () => {
    ref.current.click();
  };
  const changeProfileImg = async () => {
    if (ref.current.files[0]) setImg(URL.createObjectURL(ref.current.files[0]));
  };
  sendImg(img);
  return (
    <>
      <form onSubmit={(e) => e.preventDefault()}>
        <Grid
          item
          className={classes.profileImageContainer}
          onMouseOver={() => setShowUpload(true)}
          onMouseLeave={() => setShowUpload(false)}
          onClick={inputClicked}
        >
          {
            <Avatar
              src={!img ? user.photo : img}
              className={classes.profileImage}
            />
          }
          <Grid
            item
            className={
              showUpload
                ? `${classes.upload} ${classes.uploadTop}`
                : classes.upload
            }
          >
            <FaCamera style={{ fontSize: "2rem" }} />
          </Grid>
        </Grid>
        <input
          onSubmit={(e) => e.preventDefault()}
          type="file"
          accept="image/*"
          id="fileId"
          hidden
          ref={ref}
          onChange={changeProfileImg}
        ></input>
      </form>
    </>
  );
}

export default ProfileAvatar;
