import { useState } from "react";
import Modal from "react-modal";
import "./styles.css";

Modal.setAppElement("#root");

const BookList = ({ searchData }) => {
  const [selectedBook, setSelectedBook] = useState(null);

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  function closeModal() {
    setSelectedBook(null);
  }

  return (
    <div className="books-container">
      <ul className="list-container">
        {searchData.map((book) => (
          <li
            className="book"
            key={book.key}
            onClick={() => setSelectedBook(book)}
          >
            <div>
              {book.isbn && (
                <img
                  src={`http://covers.openlibrary.org/b/isbn/${book.isbn[0]}-M.jpg`}
                  alt="book-image"
                />
              )}
            </div>
            <div>
              <h2>{book.title}</h2>
              <h3>
                {book.author_name &&
                  book.author_name.map((author) => `${author} `)}
              </h3>
            </div>
          </li>
        ))}
      </ul>
      <Modal
        isOpen={selectedBook !== null}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        {selectedBook && (
          <>
            <div>
              {selectedBook.isbn && (
                <img
                  src={`http://covers.openlibrary.org/b/isbn/${selectedBook.isbn[0]}-M.jpg`}
                  alt="book-image"
                />
              )}
            </div>
            <h2>{selectedBook.title}</h2>
            <h3>
              {selectedBook.author_name &&
                selectedBook.author_name.map((author) => `${author} `)}
            </h3>
            <p>ISBN: {selectedBook.isbn[0]}</p>
            {selectedBook.publish_date && (
              <p>Publication Date: {selectedBook.publish_date[0]}</p>
            )}
          </>
        )}
      </Modal>
    </div>
  );
};

export default BookList;
