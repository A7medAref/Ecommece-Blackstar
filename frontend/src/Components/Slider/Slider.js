import { Grid } from "@material-ui/core";
import { useEffect, useState } from "react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { AiOutlineLine } from "react-icons/ai";
import axios from "axios";
import useStyle from "./SliderStyle";
import CircularLoading from "../Feedback/CircularProgress";
import { Link } from "react-router-dom";
function Slider() {
  const [index, setIndex] = useState(0);
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const classes = useStyle();
  ////////////////////////////////////////
  const stopEvent = (e) => {
    if (e) {
      e.target.classList.add("stopEvent");
      setTimeout(() => e.target.classList.remove("stopEvent"), 1000);
    }
  };
  const Previous = (e) => {
    if (e && !e.target.classList.contains("stopEvent")) {
      index === 0 ? setIndex(product.length - 1) : setIndex((i) => i - 1);
      stopEvent(e);
    }
  };
  const next = (e) => {
    if (e && !e.target.classList.contains("stopEvent")) {
      index === product.length - 1 ? setIndex(0) : setIndex((i) => i + 1);
      stopEvent(e);
    }
  };
  const nextW = () => {
    index === product.length - 1 ? setIndex(0) : setIndex((i) => i + 1);
  };
  ////////////////////////
  useEffect(() => {
    const clear = setTimeout(() => {
      nextW();
    }, 4000);
    return () => clearTimeout(clear);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);
  ///////////////////////
  // fetching
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { data } = await axios.default.get("/api/v1/products/get/topthree");
      setProduct(data.data);
      setLoading(false);
    };
    fetchData();
  }, []);
  function isNext(i) {
    if (product.length - 1 === index) return i === 0;
    else return i === index + 1;
  }
  ////////////////////////////////
  const Top = (
    <>
      {product.map((e, i) => (
        <Grid
          container
          direction="column"
          alignItems="center"
          justifyContent="space-between"
          key={e._id}
          component={Link}
          to={`/product/${e._id}`}
          className={
            i === index
              ? `${classes.current} ${classes.stylePhoto}`
              : isNext(i)
              ? `${classes.next} ${classes.stylePhoto}`
              : `${classes.previous} ${classes.stylePhoto}`
          }
        >
          <Grid item className={classes.name}>
            {e.name} (${e.price})
          </Grid>
          {<img src={e.image} alt="Product" className={classes.img} />}
        </Grid>
      ))}
    </>
  );
  return (
    <Grid container justifyContent="space-between" className={classes.slider}>
      <Grid
        item
        container
        xs={2}
        alignItems="center"
        className={classes.arrow}
        justifyContent="center"
        onClick={Previous}
      >
        <IoIosArrowBack />
      </Grid>
      <Grid
        container
        item
        direction="column"
        justifyContent="space-between"
        alignItems="center"
        xs={8}
        style={{ height: "100%", position: "relative" }}
      >
        {loading ? (
          <CircularLoading type="component" style={{ color: "white" }} />
        ) : (
          <>
            {Top}
            <Grid item className={classes.slide}>
              {product.map((_, i) => (
                <span
                  key={i}
                  onClick={() => setIndex(i)}
                  className={index !== i ? classes.non_active : null}
                >
                  <AiOutlineLine />
                </span>
              ))}
            </Grid>
          </>
        )}
      </Grid>

      <Grid
        item
        container
        xs={2}
        alignItems="center"
        className={classes.arrow}
        justifyContent="center"
        onClick={next}
      >
        <IoIosArrowForward />
      </Grid>
    </Grid>
  );
}

export default Slider;
