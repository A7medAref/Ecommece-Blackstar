import { Avatar, Grid } from "@material-ui/core";
import { useState, useRef } from "react";
import { FaCamera } from "react-icons/fa";
import useStyle from "./Edit-Add-Style";

function ProductImage({ productImg }) {
  const classes = useStyle();
  const [img, setImg] = useState(productImg);
  const ref = useRef();
  const inputClicked = async () => {
    ref.current.click();
  };
  const changeProfileImg = async () => {
    if (ref.current.files[0]) setImg(URL.createObjectURL(ref.current.files[0]));
  };
  return (
    <>
      <form onSubmit={(e) => e.preventDefault()}>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          onClick={inputClicked}
          className={classes.imgContainer}
        >
          <Avatar
            src={img ? img : productImg}
            alt="productImage"
            className={classes.productImg}
          />
          <Grid item className={classes.camera}>
            <FaCamera style={{ fontSize: "3rem" }} />
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

export default ProductImage;
