let myLibrary = [];

function Book(title, author, pages, read) {
  // Constructor function here
  this.title = title
  this.author = author
  this.pages = pages
  this.read = read
}

Book.addBookToLibrary = function (title, author, pages, read) {
  myLibrary.push(new Book(title, author, pages, read))
}

Book.addBookToLibrary("Outliers", "Malcolm Gladwell", 270, true)
Book.addBookToLibrary("Norwegian Woods", "Haruki Murakami", 310, true)
Book.addBookToLibrary("The Lord Of The Rings: Fellowship Of Two Rings", "J.R.R Tolkien", 270, false)

function displayBook(Book){
  const container = document.getElementById("grids");
  const bookCard = document.createElement("div");
  bookCard.classList.add("card");

  //Creates p element for the title
  const title = document.createElement("h3");
  const titleNode = document.createTextNode(Book.title);
  title.append(titleNode);

  //Creates p element for the author
  const author = document.createElement("p");
  const authorNode = document.createTextNode(`by ${Book.author}`);
  author.appendChild(authorNode);

  //Creates p element for the pages
  const pages = document.createElement("p");
  const pagesNode = document.createTextNode(`Pages: ${Book.pages}`);
  pages.appendChild(pagesNode);

  // Creates button element for the read add some functionality to check
  const readButton = document.createElement("button");
  readStatusChanger(Book, readButton)
  const removeButton = document.createElement("button")
  removeButton.textContent = "Remove"
  removeButton.classList.add('rmv-btn')

  //add eventListener to new book cards to remove
  removeButton.addEventListener("click", ()=> {
    myLibrary.splice(removeButton.parentElement.dataset.index, 1)
    removeButton.parentElement.remove()
    indexBookCards()
  })

  //Appending all p elements to the div
  bookCard.append(title);
  bookCard.append(author);
  bookCard.append(pages);
  bookCard.append(readButton);
  bookCard.append(removeButton);

  container.prepend(bookCard)
}

function indexBookCards() {
  // reason for backward indexing is bookCard are selected from backward somehow :P
  let index = (myLibrary.length - 1)
  const allBookCards = document.getElementsByClassName("card")
  for(const bookCard of allBookCards) {
    bookCard.dataset.index = index
    index--
  }
}

function displayLibrary(){
  myLibrary.forEach(book => displayBook(book))
}

function displayReadStatus(book, button) {
  if (book.read) {
    // Change text to 'Read' and add read-button class
    button.textContent = "Read"
    if (button.classList.contains("not-read-btn"))
      button.classList.remove("not-read-btn")
    button.classList.add("read-btn")
  } else {
    button.textContent = "Not Read"
    if (button.classList.contains("read-btn"))
    button.classList.remove("read-btn")
    button.classList.add("not-read-btn")
    // Change the text to 'Not Read' and add not-read-button class
  }
}

function readStatusChanger(book, button) {
  // adds Listener to the button and when clicked changes the book's read status
  displayReadStatus(book, button)
  button.addEventListener("click", () => {
    book.read ? (book.read = false) : (book.read = true)
    displayReadStatus(book, button)
  })
  // then uses displayReadStatus()
}

function clearDisplayedBooks() {
  const displayedBooks = document.getElementsByClassName("card")
  for (let i = 0; i < myLibrary.length; i++ ) {
    displayedBooks[0].remove()
  }
}

// !POP UP!
const modal = document.getElementById("modal")
const modalContent = document.getElementById("modal-content")

// Opening Form
const addBtn = document.getElementById("add-btn")

addBtn.addEventListener("click", ()=> {
  modal.style.display = "flex";
  modalContent.style.display = "block"
})

// Closing form

// Clicking on the close button

function hideModal() {
  modal.style.display = "none"
  modalContent.style.display = "none"
}

function refreshForm() {
  document.getElementById("book").value = ""
  document.getElementById("author").value = ""
  document.getElementById("title").value = ""
  const requiredFields = document.getElementsByClassName("required-field")
  for (const field of requiredFields) {
    field.style.color = "black"
  }
}

function submitBook() {
  const author = document.getElementById("book-form").elements.namedItem("author").value
  const title = document.getElementById("book-form").elements.namedItem("title").value
  const pages = parseInt(document.getElementById("book-form").elements.namedItem("pages").value)
  let read = document.getElementById("book-form").elements.namedItem("read-status").value
  read = (read === 'read') ? true : false
  Book.addBookToLibrary(title, author, pages, read)
}

function removeBook() {

}


function checkFields() {
  const author = document.getElementById("book-form").elements.namedItem("author").value != ""
  const title = document.getElementById("book-form").elements.namedItem("title").value != ""
  const pages = Number.isInteger(parseInt(document.getElementById("book-form").elements.namedItem("pages").value))
  return author && title && pages
}

const closeButton = document.getElementById("close-button")
closeButton.addEventListener("click", ()=> {
  hideModal()
  refreshForm()
})

// Clicking outside of the modal

window.addEventListener("click", function(e){
  if(e.target == modal){
   hideModal()
   refreshForm()
  }
})


const submitButton = document.getElementById("submit-button")

submitButton.addEventListener("click", ()=> {
  // Let user submit when required fields are filled
  if (checkFields()){
  submitBook()
  hideModal()
  refreshForm()
  displayBook(myLibrary[myLibrary.length - 1  ])
  indexBookCards()
  } else {
    const requiredFields = document.getElementsByClassName("required-field")
    for (const field of requiredFields) {
      field.style.color = "red"
    }
  }
})

// Displaying the books that are already in the library when opening
displayLibrary()

