import * as React from "react";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const url = `https://5c6eb0534fa1c9001424240b.mockapi.io/api/v1/books`;

const Editbook = () => {
  const { ID } = useParams<{ ID: string }>();
  const [change, setChange] = useState({
    title: "",
    author: "",
    pages: "",
    total_amount: "",
    isbn: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const name = e.target.name;
    const value = e.target.value;
    setChange({ ...change, [name]: value });
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (!change.title.trim()) {
      setError("Title can't be empty");
    } else if (/^\s+$/.test(change.author) || change.author == "") {
      setError("Author can't be empty");
    } else if (parseInt(change.pages) <= 0 || change.pages == "") {
      setError("Pages should be a positive integer");
    } else if (
      parseInt(change.total_amount) <= 0 ||
      change.total_amount == ""
    ) {
      setError("Total amount should be a positive integer");
    } else if (change.isbn.length !== 10 && change.isbn.length !== 13) {
      setError("ISBN should be 10 or 13 numbers");
    } else {
      const info = {
        ...change,
        pages: parseInt(change.pages),
        total_amount: parseInt(change.total_amount),
      };
      fetch(`${url}/${ID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(info),
      })
        .then((response) => response.json())
        .catch((error) => {
          console.error("Error:", error);
        });
      setError("");
    }
  };

  const getEditBook = async () => {
    const response = await fetch(`${url}/${ID}`);
    const editBook = await response.json();
    setChange(editBook);
  };

  useEffect(() => {
    getEditBook();
    const timer = setInterval(() => {
      getEditBook();
    }, 30000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div>
      <p className="error-message" role="alert">
        {error}
      </p>
      <form className="form">
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          name="title"
          id="title"
          value={change.title}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="author">Author:</label>
        <input
          type="text"
          name="author"
          id="author"
          value={change.author}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="pages">Page:</label>
        <input
          type="number"
          name="pages"
          id="pages"
          value={change.pages}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="total_amount">Total:</label>
        <input
          type="number"
          name="total_amount"
          id="total_amount"
          value={change.total_amount}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="isbn">ISBN:</label>
        <input
          type="number"
          name="isbn"
          id="isbn"
          value={change.isbn}
          onChange={handleChange}
        />
        <br />
        <div className="btngroup">
          <button
            aria-label="save changes"
            type="submit"
            className="button"
            onClick={handleSubmit}
          >
            Save
          </button>
          <Link to="/" className="button" aria-label="back to homepage">
            Back Home
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Editbook;
