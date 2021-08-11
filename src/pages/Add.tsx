import * as React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
const url = `https://5c6eb0534fa1c9001424240b.mockapi.io/api/v1/books`;

const Add = () => {
  const [addBook, setAddBook] = useState({
    id: "",
    title: "",
    author: "",
    pages: "",
    total_amount: "",
    isbn: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: { target: { name: string; value: string; }; }) => {
    const name = e.target.name;
    const value = e.target.value;
    setAddBook({ ...addBook, [name]: value });
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (!addBook.title.trim()) {
      setError("Title can't be empty");
    } else if (/^\s+$/.test(addBook.author) || addBook.author == "") {
      setError("Author can't be empty");
    } else if (parseInt(addBook.pages) <= 0 || addBook.pages == "") {
      setError("Pages should be a positive integer");
    } else if (
      parseInt(addBook.total_amount) <= 0 ||
      addBook.total_amount == ""
    ) {
      setError("Total amount should be a positive integer");
    } else if (addBook.isbn.length !== 10 && addBook.isbn.length !== 13) {
      setError("ISBN should be 10 or 13 numbers");
    } else {
      const data = {
        ...addBook,
        pages: parseInt(addBook.pages),
        total_amount: parseInt(addBook.total_amount),
      };
      fetch(`${url}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .catch((error) => {
          console.error("Error:", error);
        });

      setAddBook({
        id:"",
        title: "",
        author: "",
        pages: "",
        total_amount: "",
        isbn: "",
      });
      setError("");
    }
  };
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
          value={addBook.title}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="author">Author:</label>
        <input
          type="text"
          name="author"
          id="author"
          value={addBook.author}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="pages">Page:</label>
        <input
          type="number"
          name="pages"
          id="pages"
          value={addBook.pages}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="total_amount">Total:</label>
        <input
          type="number"
          name="total_amount"
          id="total_amount"
          value={addBook.total_amount}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="isbn">ISBN:</label>
        <input
          type="number"
          name="isbn"
          id="isbn"
          value={addBook.isbn}
          onChange={handleChange}
        />
        <br />
        <div className="btngroup">
          <button
            aria-label="add book"
            type="submit"
            className="button"
            onClick={handleSubmit}
          >
            Add
          </button>
          <Link to="/" className="button">
            Back Home
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Add;
