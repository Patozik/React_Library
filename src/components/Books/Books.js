import React from 'react';
import './Books.css';
import Book from './Book/Book'
import NewBook from './NewBook/NewBook';
import Modal from 'react-modal';
import EditBook from './EditBook/EditBook';
import axios from 'axios';

class Books extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            books : [],
            showEditModal: false,
            editBook: {}
        };
    }

    componentDidMount() {
        this.fetchBooks();
    }

    async fetchBooks() {
        const res = await axios.get(process.env.REACT_APP_API_URL_BOOK+'all');
        const books = res.data;

        this.setState({ books });
    }

    async deleteBook(id) {
        const books = [...this.state.books]
            .filter(book => book.id !== id);

        await axios.delete(process.env.REACT_APP_API_URL_BOOK+'delete/' + id);

        this.setState({ books });
    }

    async addBook(book) {
        const books = [...this.state.books];
        //dodanie backend
        const res = await axios.post(process.env.REACT_APP_API_URL_BOOK+'add', book);
        const newNote = res.data;
        //dodanie frontend
        books.push(newNote);
        this.setState({ books });
    }

    async editBook(book) {
        //edycja backend
        await axios.patch(process.env.REACT_APP_API_URL_BOOK+'edit/' + book.id, book);
        //edycja frontend
        const books = [...this.state.books];
        const index = books.findIndex(x => x.id === book.id);
        if(index >= 0) {
            books[index] = book
            this.setState({ books });
       }
       this.toggleModal();
    }

    toggleModal() {
        this.setState({ 
            showEditModal: !this.state.showEditModal 
        });
    }

    editBookHandler(book) {
        this.toggleModal();
        this.setState({ editBook: book });
    }

    render() {

        return (
            <div>
                <h2>Książki</h2>

                <NewBook 
                    onAdd={(book) => this.addBook(book)} />

                <Modal 
                    ariaHideApp={false}
                    isOpen={this.state.showEditModal}
                    contentLabel='Edytuj książkę'>
                        <EditBook
                            id={this.state.editBook.id}
                            name={this.state.editBook.name}
                            autor={this.state.editBook.autor}
                            ISBN={this.state.editBook.ISBN}
                            hire={this.state.editBook.hire} 
                            onEdit={book => this.editBook(book)}/>
                        <button onClick={() => this.toggleModal()}>Anuluj</button>
                </Modal>

                {this.state.books.map(book => (
                    <Book
                        key={book.id}
                        id={book.id}
                        name={book.name}
                        autor={book.autor}
                        ISBN={book.ISBN}
                        hire={book.hire}
                        onEdit={(book) => this.editBookHandler(book)}
                        onDelete={(id) => this.deleteBook(id)}/>
                ))}

            </div>
        )
    }
}

export default Books;