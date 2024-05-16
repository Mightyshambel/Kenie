import React from "react"
import Sidebar from "./components/Sidebar"
import Editor from "./components/Editor"
import './styles/editor.css';
import Split from "react-split"
import { onSnapshot,addDoc,doc,deleteDoc, setDoc } from "firebase/firestore";
import { notesCollection,db } from "./firebase";


export default function App() {

    const [notes, setNotes] = React.useState([])

    const [currentNoteId, setCurrentNoteId] = React.useState("")
    const [tempNoteText,setTempNoteText]=React.useState("")
     
    const sortedNote=notes.sort((a,b)=>b.updatedAt-a.updatedAt)
    const currentNote=notes.find(note => {
      return note.id === currentNoteId
    }) || notes[0]
  
    React.useEffect(() => {
        const unsubscribe = onSnapshot(notesCollection, (snapshot)=> {
            const notesArr = snapshot.docs.map(doc=>({
                ...doc.data(),
                id: doc.id
            }))
            setNotes(notesArr)
        })
        return unsubscribe
    }, [])

   
    
    React.useEffect(() => {
        if (!currentNoteId) {
            setCurrentNoteId(notes[0]?.id)
        }
    })
    
    React.useEffect(() => {
        if (currentNote) {
            setTempNoteText(currentNote.body)
        }
    }, [currentNote]) 

    React.useEffect(() => {
       const timeoutId = setTimeout(() => {
            if (tempNoteText !== currentNote.body) {
                updateNote(tempNoteText)
            }
        }, 500)
        return ()=>clearTimeout(timeoutId)
    },[tempNoteText])

    async function createNewNote() {
        const newNote = {
            createdAt: Date.now(),
            updatedAt: Date.now(),
            body: "Type your note's title here"
        }
         const newNoteRef=await addDoc(notesCollection,newNote)
        setCurrentNoteId(newNoteRef.id)
    }
    
    // eslint-disable-next-line no-unused-vars
    async function updateNote(text) {
        const docRef = doc(db, "notes", currentNoteId)
        await setDoc(
            docRef,
            {body :text,updatedAt:Date.now()},
            {merge:true}
            )
    }
    
    async function deleteNote(noteId) {
         const docRef = doc(db, "notes", noteId)
         await deleteDoc(docRef)
    }
    
    
    
    return (
        <main>
        {
            notes.length > 0 
            ?
            <Split 
                sizes={[30, 70]} 
                direction="horizontal" 
                className="split"
            >
                <Sidebar
                    notes={sortedNote}
                    currentNote={currentNote}
                    setCurrentNoteId={setCurrentNoteId}
                    newNote={createNewNote}
                    deleteNote={deleteNote}
                />
                <Editor 
                    tempNoteText={tempNoteText} 
                    setTempNoteText={setTempNoteText} 
                />
            </Split>
            :
            <div className="no-notes">
              <div className="notes">
              <h1>Notes</h1>
              <h2>You have no notes</h2>
                <button 
                    className="first-note" 
                    onClick={createNewNote}
                >
                    Create one now
                </button>
              </div>
              
            </div>
            
        }
        </main>
    )
}
