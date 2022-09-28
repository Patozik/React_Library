import React from 'react';
import './Books.css';
import Book from './Book/Book'
import NewBook from './NewBook/NewBook';
import Modal from 'react-modal';
import EditBook from './EditBook/EditBook';
import axios from 'axios';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

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
        try {
            if ( !book.name || !book.autor || !book.ISBN ) {
                throw new Error('Wypełnij wszystkie dane');
            } else {
                const books = [...this.state.books];
                //dodanie backend
                const res = await axios.post(process.env.REACT_APP_API_URL_BOOK + 'add', book);
                const newBook = res.data;
                //dodanie frontend
                books.push(newBook);
                this.setState({ books });
                NotificationManager.success('Dodanie przebiegło pomyślnie');
            }
        } catch (err) {
            NotificationManager.error(err.message || 'Coś poszło nie tak');
        }
    }

    async editBook(book) {
        try {
            if (!book.name || !book.autor || !book.ISBN) {
                throw new Error('Wypełnij wszystkie dane');
            } else {
                //edycja backend
                await axios.patch(process.env.REACT_APP_API_URL_BOOK + 'edit/' + book.id, book);
                //edycja frontend
                const books = [...this.state.books];
                const index = books.findIndex(x => x.id === book.id);
                if (index >= 0) {
                    books[index] = book
                    this.setState({ books });
                }
                this.toggleModal();
                NotificationManager.success('Edycja przebiegła pomyślnie');
            }
        } catch (err) {
            NotificationManager.error(err.message || 'Coś poszło nie tak');
        }
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

                <NotificationContainer />

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
                        <div className='book'>
                            <button onClick={() => this.toggleModal()}>Anuluj</button>
                        </div>
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