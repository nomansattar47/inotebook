import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {

    const host = "http://localhost:4000";
    const notesInitial = [];
    const [notes, setNotes] = useState(notesInitial);

    // get all notes
    const getNotes = async () => {

        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZiZjY2ZmZlOTNkMTdlYTg3YWQ2NzdlIn0sImlhdCI6MTcyNDY2ODQ5M30.8AMPd3yJCBZ1kgmCjAmVFm0Asev_jaEieWVZYLK4Jds",
            }
        });
        const json = await response.json();
        console.log(json);
        setNotes(json);
    }

    // add a note
    const addNote = async (title, description, tag) => {

        const response = await fetch(`${host}/api/notes/addenote`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZiZjY2ZmZlOTNkMTdlYTg3YWQ2NzdlIn0sImlhdCI6MTcyMzgyMjc3MH0.v0oWKlpfC2S28AAyVVdwaL2wycQuet - MWUvmdb3HYkQ"
            },
            body: JSON.stringify({ title, description, tag })
        });


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

        console.log("Deleting a note with id::: ", id);
        const newNotes = notes.filter((note) => { return note._id !== id });
        setNotes(newNotes)
    }
    // edit a note
    const editNote = async (id, title, description, tag) => {


        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZiZjY2ZmZlOTNkMTdlYTg3YWQ2NzdlIn0sImlhdCI6MTcyMzgyMjc3MH0.v0oWKlpfC2S28AAyVVdwaL2wycQuet-MWUvmdb3HYkQ"
            },
            body: JSON.stringify({ title, description, tag })
        });

        const json = response.json();

        for (let index = 0; index < notes.length; index++) {
            const element = notes[index];
            if (element._id === id) {
                element.title = title;
                element.description = description;
                element.tag = tag;
            }

        }
    }

    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;