import { useState } from "react";
import Select from 'react-select';

export default function EditBook(props) {

    const [name, setName] = useState(props.name);
    const [autor, setAutor] = useState(props.autor);
    const [ISBN, setISBN] = useState(props.ISBN);
    const [hire, setHire] = useState(props.hire ? 'Wypożyczona' : 'Niewypożyczona');

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

    const editBook = () => {
        const book = {
            id: props.id,
            name: name,
            autor: autor,
            ISBN: ISBN,
            hire: hire.value
        }
        props.onEdit(book);
    }

    const options = [
        { value: true, label: 'Wypożyczona' },
        { value: false, label: 'Niewypożyczona' },
    ];

    return (
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

            <button onClick={() => editBook()}>Edytuj książkę</button>
        </div>
    );
}