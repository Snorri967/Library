/* eslint-disable no-param-reassign */
/* eslint-disable no-use-before-define */
const books = document.querySelector(".books");
const submitAddition = document.querySelector(".submitAddition");
const errorName = document.querySelector(".errorName");
const errorAuthor = document.querySelector(".errorAuthor");
const errorPages = document.querySelector(".errorPages");
const form = document.querySelector(".form");

let bookDiv = "";

const myLibrary = [];

class Book {
  constructor(name, author, pages, readStatus) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
  }
}

function displayBooks(newBook) {
  bookDiv = document.createElement("div");
  Object.entries(newBook).forEach(([key, value]) => {
    bookDiv.setAttribute("data-set", myLibrary.length);
    const para = document.createElement("p");
    para.append(`${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`)
    bookDiv.appendChild(para);
    books.appendChild(bookDiv);  
  });
  changeReadStatus(bookDiv);
  deleteBook(bookDiv, newBook);
}

function addBookToLibrary() {
  submitAddition.addEventListener("click", (event) => {
    const bookName = document.querySelector(".bookName");
    const author = document.querySelector(".author");
    const readBook = document.querySelector(".readBook");
    const pages = document.querySelector(".pages");
    if (bookName.value === "" && author.value === "" && pages.value === "") {
      errorName.style.display = "block";
      errorAuthor.style.display = "block";
      errorPages.style.display = "block";
      event.preventDefault();
    } else if (bookName.value === "") {
      errorName.style.display = "block";
      event.preventDefault();
    } else if (author.value === "") {
      errorAuthor.style.display = "block";
      event.preventDefault();
    } else if (pages.value === "") {
      errorPages.style.display = "block";
      event.preventDefault();
    } else {
      if (readBook.checked === true) {
        readBook.value = "Read";
      } else if (readBook.checked === false) {
        readBook.value = "Not Read";
      }
      const newBook = new Book(bookName.value, author.value, pages.value, readBook.value);
      myLibrary.push(newBook);
      event.preventDefault(); 
      displayBooks(newBook);
      errorName.style.display = "none";
      errorAuthor.style.display = "none";
      errorPages.style.display = "none";
      form.reset();
    }
  });
}

addBookToLibrary();

function changeReadStatus(book) {
  const button = document.createElement("input");
  button.classList.add("readStatus");
  button.setAttribute("type", "submit");
  button.value = "Change Read Status";
  book.appendChild(button);
  button.addEventListener("click", () => {
    if (book.children[3].innerText === "ReadStatus: Read") {
      book.children[3].innerText = "ReadStatus: Not Read";
    } else if (book.children[3].innerText === "ReadStatus: Not Read") {
      book.children[3].innerText = "ReadStatus: Read";
    }
  });
}

function deleteBook(book, newBook) {
  const button = document.createElement("input");
  button.classList.add("delete");
  button.setAttribute("type", "submit");
  button.value = "Delete Book";
  book.appendChild(button);
  button.addEventListener("click", () => {
    books.removeChild(book);
    myLibrary.pop(newBook);
  });
}

