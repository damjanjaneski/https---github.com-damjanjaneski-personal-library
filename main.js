"use strict";

let title = document.getElementById("title");
let author = document.getElementById("author");
let category = document.getElementById("category");
let read = document.getElementById("read");
let table = document.getElementsByTagName("table")[0];

class Book {
  constructor(title, author, category, read) {
    this.title = title;
    this.author = author;
    this.category = category;
    this.isRead = read;
  }
  read(id) {
    document.getElementById(id).checked = this.isRead;
  }
}

let bookOne = new Book("Hamlet", "William Shakespeare", "Tragedy", false);
let bookTwo = new Book("Harry Potter", `J.K. Rowling`, "Fantasy", true);
let bookThree = new Book("Gambler", "F.M. Dostoevski", "Novel", true);
let bookFour = new Book(`The Da Vinci Code`, "Dan Brown", "Mystery", true);
let bookFive = new Book(
  "War and peace",
  "L.N. Tolstoy",
  "Historical novel",
  false
);

let allBooks = [bookOne, bookTwo, bookThree, bookFour, bookFive];

bookOne.read(`book-1`);
bookTwo.read(`book-2`);
bookThree.read(`book-3`);
bookFour.read(`book-4`);
bookFive.read(`book-5`);

let showInputs = function () {
  document.getElementById("show-on-click").style.display = "block";
};

let addBook = function () {
  let newTitle = title.value;
  let newAuthor = author.value;
  let newCategory = category.value;
  let newRead = read.checked;

  if (newTitle != "" && newAuthor != "" && newCategory != "") {
    if (
      allBooks.some((book) => {
        return (
          book.title.toLowerCase() == newTitle.toLowerCase() &&
          book.author.toLowerCase() == newAuthor.toLowerCase()
        );
      })
    ) {
      alert(`The book already exists in your list!`);
    } else {
      let newBook = new Book(newTitle, newAuthor, newCategory, newRead);
      allBooks.push(newBook);

      let tr = document.createElement("tr");
      let tdTitle = document.createElement("td");
      tdTitle.textContent = newTitle;
      tr.appendChild(tdTitle);

      let tdAuthor = document.createElement("td");
      tdAuthor.textContent = newAuthor;
      tr.appendChild(tdAuthor);

      let tdCategory = document.createElement("td");
      tdCategory.textContent = newCategory;
      tr.appendChild(tdCategory);

      let tdRead = document.createElement("td");
      let inputRead = document.createElement("input");
      inputRead.type = "checkbox";
      inputRead.checked = newRead;
      tdRead.appendChild(inputRead);
      tr.appendChild(tdRead);

      let tdRemove = document.createElement("td");
      let removeButton = document.createElement("button");
      tdRemove.appendChild(removeButton);
      removeButton.textContent = "Remove";
      removeButton.onclick = removeBook;
      tr.appendChild(tdRemove);

      table.appendChild(tr);
      document
        .querySelectorAll(`table tr:not(:first-child)`)
        .forEach((el) => (el.style.visibility = "visible"));
    }
  }
};

let removeBook = function (e) {
  let BookToRemove = allBooks.filter((book) => {
    return (
      book.title == e.target.parentElement.parentElement.firstChild.textContent
    );
  });
  let index = allBooks.indexOf(BookToRemove);
  allBooks.splice(index, 1);

  e.target.parentElement.parentElement.remove();
};
