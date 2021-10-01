import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import { AiOutlineSearch } from "react-icons/ai";
const useStyle = makeStyles({
  container: {
    position: "relative",
  },
  input: {
    border: "none",
    backgroundColor: "#F7F7F9",
    padding: ".8rem 1.3rem",
    outline: "none",
    "&:focus": {
      outline: "none",
    },
  },
  searchIcon: {
    position: "absolute",
    right: "0",
    paddingRight: ".6rem",
    color: "#444",
    fontSize: "1.5rem",
    top: "50%",
    height: "100%",
    cursor: "pointer",
    transform: "translateY(-50%)",
    zIndex: "100",
    backgroundColor: "#F7F7F9",
  },
});
export default function AdminSearch({ placeholder, event }) {
  const classes = useStyle();
  const [words, setWords] = useState();
  return (
    <div className={classes.container}>
      <input
        className={classes.input}
        placeholder={placeholder}
        onChange={(e) => setWords(e.target.value)}
      ></input>
      <AiOutlineSearch
        className={classes.searchIcon}
        onClick={() => event(words)}
      />
    </div>
  );
}
