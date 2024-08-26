import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';

const Notes = () => {
    const context = useContext(noteContext);
    const { notes, getNotes } = context;
    const ref = useRef(null)
    const [note, setNote] = useState({ mtitle: "", mdescription: "", mtag: "" })

    useEffect(() => {
        getNotes()
        // eslint-disable-next-line
    }, [])
    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({ mtitle: currentNote.title, mdescription: currentNote.description, mtag: currentNote.tag })
    }
    const handleClick = (e) => {
        e.preventDefault();
        console.log("Updating a note:::: ", note)
    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <>
            <AddNote />
            <button type="button" className="btn btn-primary d-none" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="my-3">
                                <div className="mb-3">
                                    <label htmlFor="mtitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" value={note.mtitle} onChange={onChange} id="mtitle" name="mtitle"
                                        aria-describedby="titleHelp" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="mdescription" className="form-label">Description</label>
                                    <input type="text" className="form-control" value={note.mdescription} onChange={onChange} id="mdescription" name="mdescription" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="mtag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" value={note.mtag} onChange={onChange} id="mtag" name="mtag" />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>


            <div className="row my-3">
                <h4>Your Notes</h4>
                {notes.map((note) => {
                    return <NoteItem key={note._id} updateNote={updateNote} note={note} />
                })}
            </div>
        </>
    )
}

export default Notes
