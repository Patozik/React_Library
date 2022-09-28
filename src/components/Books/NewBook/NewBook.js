import { useState } from "react";
import Select from 'react-select';
import useAuth from "../../../hooks/useAuth";

function NewBook(props) {
    const [auth, setAuth] = useAuth();
    const [showForm, setShowForm] = useState();
    const [name, setName] = useState('');
    const [autor, setAutor] = useState('');
    const [ISBN, setISBN] = useState('');
    const [hire, setHire] = useState('');

    const changeNameHandler = event => {
        const value = event.target.value;
        setName(value);
    }
    const changeAutorHandler = event => {
        const value = event.target.value;
        setAutor(value);
    }
    const changeISBNHandler = event => {
        const value = event.target.value;
        setISBN(value);
    }

    const addBook = () => {
        const book = {
            name: name,
            autor: autor,
            ISBN: ISBN,
            hire: hire.value
        }
        props.onAdd(book);

        setName('');
        setAutor('');
        setISBN('');
        setHire('');
        setShowForm(false);
    }

    const logout = (e) => {
        e.preventDefault();
        setAuth(false);
    }

    const options = [
        { value: true, label: 'Wypożyczona' },
        { value: false, label: 'Niewypożyczona' },
    ];

    return (
        showForm ? (
            <div className='book'>
                <label>Tytuł</label>
                <input type="text" value={name} onChange={changeNameHandler}></input>

                <label>Autor</label>
                <input type="text" value={autor} onChange={changeAutorHandler}></input>

                <label>ISBN</label>
                <input type="text" value={ISBN} onChange={changeISBNHandler}></input>

                <label>Status</label>
                    <Select
                        defaultValue={hire}
                        onChange={setHire}
                        options={options}
                    />

                <button onClick={() => addBook()}>Dodaj książkę</button>
                <button onClick={() => setShowForm(false)}>Anuluj</button>
                <button className="logout" onClick={logout}>Wyloguj</button>
            </div>
        ) : (
            <div className="book">
                <button onClick={() => setShowForm(true)}>Nowa książka</button>
                <button className="logout" onClick={logout}>Wyloguj</button>
            </div>
        )
    );
}

export default NewBook;