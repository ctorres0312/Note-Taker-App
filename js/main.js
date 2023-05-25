import NotesView from './NotesView.js'
import NotesAPI from './NotesAPI.js'

const app = document.getElementById('app');
const view = new NotesView(app, {
    onNoteAdd() {
        console.log("Let's scribble a note!");
    },
    onNoteSelect(id) {
        console.log("Note Selected:" + id);
    },
    onNoteDelete(id) {
        console.log("Note DELETED:" + id);
    },  
    onNoteEdit(newTitle, newBody) {
        console.log(newTitle);
        console.log(newBody);
    },
});

view.updateNoteList(NotesAPI.getAllNotes());


















// NotesAPI.deleteNote(833587);


// console.log(NotesAPI.getAllNotes());





// .saveNote({
//     id: 833587,
//     title: 'New Note!',
//     body: 'water.'

// });