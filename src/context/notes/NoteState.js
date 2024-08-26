import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {

    const notesInitial = [
        {
            "_id": "66c0c26c189808e001415c56",
            "user": "66bf66ffe93d17ea87ad677e",
            "title": "My Title",
            "description": "Please wake up early",
            "tag": "personal",
            "date": "2024-08-17T15:31:56.996Z",
            "__v": 0
        },
        {
            "_id": "66c0c32a98103141b1edca75",
            "user": "66bf66ffe93d17ea87ad677e",
            "title": "My Title",
            "description": "Please wake up early",
            "tag": "personal",
            "date": "2024-08-17T15:35:06.374Z",
            "__v": 0
        },
        {
            "_id": "66c0c33298103141b1edca79",
            "user": "66bf66ffe93d17ea87ad677e",
            "title": "My Title 2",
            "description": "Please wake up early 22cdacasdcasdcasd",
            "tag": "personal",
            "date": "2024-08-17T15:35:14.725Z",
            "__v": 0
        },
        {
            "_id": "66c0c33298103141b1edca7b",
            "user": "66bf66ffe93d17ea87ad677e",
            "title": "My Title 2",
            "description": "Please wake up early 22cdacasdcasdcasd",
            "tag": "personal",
            "date": "2024-08-17T15:35:14.813Z",
            "__v": 0
        },
        {
            "_id": "66c0c33398103141b1edca7d",
            "user": "66bf66ffe93d17ea87ad677e",
            "title": "My Title 2",
            "description": "Please wake up early 22cdacasdcasdcasd",
            "tag": "personal",
            "date": "2024-08-17T15:35:15.265Z",
            "__v": 0
        }
    ]


    const [notes, setNotes] = useState(notesInitial);

    // add a note
    const addNote = (title, description, tag) => {
        // TODO : api call
        console.log("adding a new note")
        const note = {
            "_id": "66c0c33398103141b1edca7d",
            "user": "66bf66ffe93d17ea87ad677e",
            "title": title,
            "description": description,
            "tag": tag,
            "date": "2024-08-17T15:35:15.265Z",
            "__v": 0
        };
        setNotes(notes.concat(note))
    }
    // delete a note
    const deleteNote = (id) => {
        // TODO : api call
        console.log("Deleting a note with id::: ", id);
        const newNotes = notes.filter((note) => { return note._id !== id });
        setNotes(newNotes)
    }
    // edit a note
    const editNote = (id, title, description, tag) => {

    }

    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;