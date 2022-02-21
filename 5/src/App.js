import { useState } from "react";
import axios from "axios";
import Book from "./bookComponent/Book";
import "./App.css";

const App = () => {
  const [word, setWord] = useState("");
  const [rhymesLeft, setRhymesLeft] = useState([]);
  const [rhymesRight, setRhymesRight] = useState([]);
  const [err, setErr] = useState("");
  const [openBook, setopenBook] = useState(false);
  const [isLoading, setisLoading] = useState(false);

  const fetchRhymes = async (e) => {
    e.preventDefault();
    setisLoading(true);
    try {
      const res = await axios.get(
        `https://api.datamuse.com/words?rel_rhy=${word}&max=14`
      );
      res.data.forEach((rhyme, index) => {
        if (index < 7) {
          setRhymesLeft((prevState) => [...prevState, rhyme]);
        } else {
          setRhymesRight((prevState) => [...prevState, rhyme]);
        }
      });
      if (res.data.length > 0) {
        setopenBook(true);
      } else {
        setErr("NO RHYMES FOUND!");
      }
    } catch (err) {
      setErr(err.response);
    }
    setisLoading(false);
  };

  return (
    <div className="App">
      <h1>RHYMES</h1>
      <form onSubmit={fetchRhymes}>
        <input
          type="text"
          name="search"
          autoComplete="off"
          placeholder="Type a word"
          autoFocus
          value={word}
          onChange={(e) => {
            setopenBook(false);
            setRhymesRight([]);
            setRhymesLeft([]);
            setErr("");
            setWord(e.target.value);
          }}
        />
        <button type="submit">
          <svg fill="#fff" viewBox="0 0 512 512">
            <path d="M500.3 443.7l-119.7-119.7c27.22-40.41 40.65-90.9 33.46-144.7C401.8 87.79 326.8 13.32 235.2 1.723C99.01-15.51-15.51 99.01 1.724 235.2c11.6 91.64 86.08 166.7 177.6 178.9c53.8 7.189 104.3-6.236 144.7-33.46l119.7 119.7c15.62 15.62 40.95 15.62 56.57 0C515.9 484.7 515.9 459.3 500.3 443.7zM79.1 208c0-70.58 57.42-128 128-128s128 57.42 128 128c0 70.58-57.42 128-128 128S79.1 278.6 79.1 208z" />
          </svg>
        </button>
      </form>
      {isLoading && <h4>LOADING...</h4>}
      {err !== "" && <h4>{err}</h4>}
      <Book
        openBook={openBook}
        rhymesRight={rhymesRight}
        rhymesLeft={rhymesLeft}
      />
    </div>
  );
};

export default App;
