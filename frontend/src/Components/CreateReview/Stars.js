import { BsStarFill, BsStar } from "react-icons/bs";
import { makeStyles } from "@material-ui/core";
import { useState } from "react";
const useStyle = makeStyles({
  Star: {
    color: "#F8E825",
    width: "fit-content",
    display: "inline-block",
    marginRight: ".4rem",
    "& > *": {
      fontSize: "1.2rem",
      cursor: "pointer",
    },
  },
});
function Stars({ numStars, selectedStar, setSelectedStar }) {
  const classes = useStyle();
  const [HoveredStar, setHoveredStar] = useState(0);
  const handleHover = (i) => {
    setHoveredStar(i);
  };
  const handleUnHover = () => {
    setHoveredStar(0);
  };
  const handleSelect = (i) => {
    setSelectedStar(i);
  };
  return (
    <div onMouseLeave={() => handleUnHover()}>
      {Array.from({ length: numStars }).map((_, i) => (
        <div key={i * 5} className={classes.Star}>
          {HoveredStar >= i + 1 || selectedStar >= i + 1 ? (
            <BsStarFill
              onMouseOver={() => handleHover(i + 1)}
              onClick={() => handleSelect(i + 1)}
            />
          ) : (
            <BsStar
              onMouseOver={() => handleHover(i + 1)}
              onClick={() => handleSelect(i + 1)}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default Stars;
