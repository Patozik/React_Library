function Book(props) {

    const editHandler = () => {
        props.onEdit({ 
            id: props.id, 
            name: props.name, 
            autor: props.autor, 
            ISBN: props.ISBN,
            hire: props.hire 
        });
    }

    return (
        <div className='book'>
            <p>Tytuł: {props.name}</p>
            <p>Autor: {props.autor}</p>
            <p>ISBN: {props.ISBN}</p>
            <p>Status: {props.hire ? 'Wypożyczona' : 'Niewypożyczona'}</p>
            <button onClick={editHandler}>Edytuj</button>
            <button 
                className='delete' 
                onClick={() => props.onDelete(props.id)}>Usuń</button>
        </div>
    );
}

export default Book;