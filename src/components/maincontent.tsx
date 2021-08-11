import * as React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
interface book {
  id:string,
  title:string,
  author:string,
  total_amount:number,
  pages:number,
  isbn:string
}
const url = "https://5c6eb0534fa1c9001424240b.mockapi.io/api/v1/books";
const MainContent = () => {
  const [books, setBooks] = useState<book[] | null>(null);
  const getBooks = async () => {
    const response = await fetch(url);
    const books = await response.json();
    setBooks(books);
  };
  useEffect(() => {
    getBooks();
  }, []);
  const handleDelete = (id:string) => {
    let newBooks = books!.filter((book:book) => book.id !== id);
    setBooks(newBooks);
    const deleteBook = async () => {
      await fetch(`${url}/${id}`, {
        method: "DELETE",
      });
    };
    deleteBook();
  };

  return (
    <main id="main">
      <h2>All the books</h2>
      <ul className="bookcontainer">
      {books === null ? (
          <p>loading</p>
        ) : (books.map((book) => {
          const { id, title, author, total_amount, pages, isbn } = book;
          return (
            <li key={id} className="book" tabIndex={0}>
              <h3>{title}</h3>
              <div>
                <p>{`Author: ${author}`}</p>
                <p>{`Pages: ${pages}`}</p>
                <p>{`Total: ${total_amount}`}</p>
                <p>{`ISBN: ${isbn}`}</p>
              </div>
              <div className="btngroup">
                <Link
                  to={`/book/${id}`}
                  className="button"
                  aria-label={`edit book ${title}`}
                >
                  Edit
                </Link>
                <button
                  aria-label={`delete book ${title}`}
                  className="button"
                  onClick={() => {
                    const confirmBox = window.confirm(
                      "Do you really want to delete this Book?"
                    );
                    if (confirmBox === true) {
                      handleDelete(id);
                    }
                  }}
                >
                  Delete
                </button>
              </div>
            </li>
          );
        }))}
      </ul>
    </main>
  );
};

export default MainContent;
