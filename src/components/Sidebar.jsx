/* eslint-disable react/prop-types */


export default function Sidebar(props) {
    // eslint-disable-next-line react/prop-types
    const noteElements = props.notes.map((note, index) => (
        <div key={note.id}>
            <div
                
                className={`title ${
                    // eslint-disable-next-line react/prop-types
                    note.id === props.currentNote.id ? "selected-note" : ""
                }`}
                // eslint-disable-next-line react/prop-types
                onClick={() => props.setCurrentNoteId(note.id)}
            >
                <h4 className="text-snippet">{note.body.split("\n")[0]}</h4>
                <button 
                    className="delete-btn"
                    // eslint-disable-next-line react/prop-types
                    onClick={(event) => props.deleteNote(event, note.id)}
                >
                    <i className="gg-trash trash-icon"></i>
                </button>
            </div>
        </div>
    ))

    return (
        <section className="pane sidebar">
            <div className="sidebar--header">
                <h3>Notes</h3>
                <button className="new-note" onClick={props.newNote}>+</button>
            </div>
            {noteElements}
        </section>
    )
}
