import { Grid, Typography, useMediaQuery, useTheme } from "@material-ui/core";
import ProductCard from "../../Components/ProductCard/ProductCard";
import Slider from "../../Components/Slider/Slider";
import Wrapper from "../../Utilites/Wrapper";
import { useEffect, useState } from "react";
import axios from "axios";
import CircularLoading from "../../Components/Feedback/CircularProgress";
import { unstable_batchedUpdates } from "react-dom";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { useLocation, useHistory, useParams } from "react-router-dom";
import { parse } from "querystring";
import useStyle from "./MainStyle";

function Main() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [numPages, setNumPages] = useState(1);
  const limit = 12;
  const classes = useStyle();
  const location = useLocation();
  const history = useHistory();
  const matchXS = useMediaQuery(useTheme().breakpoints.down("xs"));
  const PIG = matchXS ? 3 : 5;
  const param = useParams();
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 10);
      const params = parse(location.search);
      let data;
      if (!param.keyword) {
        if (params["?page"] && params["?page"] * 1 !== page)
          setPage(params["?page"] * 1);
        else if (params.page && params["?page"] * 1 !== page)
          setPage(params["page"] * 1);
        data = (
          await axios.get(
            `/api/v1/products?fields=name,price,rating,numReviews,image&page=${
              params["?page"] || params["?page"] || page
            }&limit=${limit}`,
            { withCredentials: true }
          )
        ).data;
      } else {
        data = (await axios.get(`/api/v1/products?keyword=${param.keyword}`))
          .data;
      }

      const setValues = () => {
        unstable_batchedUpdates(() => {
          setProducts(data.data);
          setNumPages(Math.ceil(data.length / limit));
          if (numPages === 0) setNumPages(1);
        });
      };
      setValues();
      setLoading(false);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, param.keyword]);

  const startToEnd = () => {
    if (numPages - PIG < 0) return [1, numPages];
    else {
      if (!matchXS)
        if (page - 2 > 0) {
          if (page + 3 < numPages) return [page - 2, page + 3];
          else return [numPages - PIG, numPages];
        } else return [1, PIG + 1];
      else if (page - 2 > 0) {
        if (page + 2 < numPages) return [page - 1, page + 2];
        else return [numPages - PIG, numPages];
      } else return [1, PIG + 1];
    }
  };

  function handleMove(type) {
    if (type === "right") {
      history.push(`/?page=${page * 1 + 1}`);
      setPage((pre) => pre * 1 + 1);
    }
    if (type === "left") {
      history.push(`/?page=${page * 1 - 1}`);
      setPage((pre) => pre * 1 - 1);
    }
  }
  let StartToEnd = startToEnd();
  return (
    <Wrapper>
      <Grid container style={{ width: "100%" }} justifyContent="center">
        <Slider />

        {loading ? (
          <CircularLoading type="component" style={{ margin: "3rem 0" }} />
        ) : (
          <Grid container className={classes.productSection}>
            <Grid container>
              <Typography variant="h4" className={classes.last}>
                latest products
              </Typography>
            </Grid>
            <Grid
              container
              spacing={matchXS ? undefined : 5}
              alignItems={matchXS ? "center" : undefined}
              style={{ width: "100%" }}
            >
              {products.map((e) => (
                <Grid
                  item
                  sm={6}
                  md={4}
                  lg={3}
                  key={e._id}
                  style={{ marginBottom: matchXS ? "2rem" : undefined }}
                >
                  <ProductCard product={e}></ProductCard>
                </Grid>
              ))}
            </Grid>
          </Grid>
        )}

        {/* pagination component */}
        {!param.keyword && !loading && (
          <Grid container justifyContent="center" style={{ marginTop: "5rem" }}>
            <div
              className={
                page === 1
                  ? `${classes.exchange} ${classes.page} ${classes.disable}`
                  : `${classes.exchange} ${classes.page}`
              }
              onClick={() => handleMove("left")}
            >
              <FaChevronLeft />
            </div>
            {Array.from({ length: StartToEnd[1] - StartToEnd[0] + 1 }).map(
              (_, i) => (
                <div
                  onClick={() => {
                    history.push(`/?page=${StartToEnd[0] + i}`);
                    setPage(StartToEnd[0] + i);
                  }}
                  key={i}
                  className={
                    StartToEnd[0] + i === page
                      ? `${classes.page} ${classes.ActivePage}`
                      : classes.page
                  }
                >
                  {StartToEnd[0] + i}
                </div>
              )
            )}
            <div
              className={
                page === numPages
                  ? `${classes.exchange} ${classes.page} ${classes.disable}`
                  : `${classes.exchange} ${classes.page}`
              }
              onClick={() => handleMove("right")}
            >
              <FaChevronRight />
            </div>
          </Grid>
        )}
      </Grid>
    </Wrapper>
  );
}

export default Main;
