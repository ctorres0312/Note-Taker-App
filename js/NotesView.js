export default class NotesView {
    constructor(root, { onNoteSelect, onNoteAdd, onNoteEdit, onNoteDelete } = {}) {
        this.root = root;
        this.onNoteSelect = onNoteSelect;
        this.onNoteAdd = onNoteAdd;
        this.onNoteEdit = onNoteEdit;
        this.onNoteDelete = onNoteDelete;


        this.root.innerHTML = ` 
        <div class="notes-sidebar">
            <button class="notes-add" type="button">Add Note</button>
                <div class="notes-list"> </div>  
            <button class="notes-delete" type="button">Delete Note</button>
        </div>
        <div class="notes-preview">
                <input class="notes-title" type="text" placeholder="New Note...">
                <textarea class="notes-body">Scribble note...</textarea>
                </div>
        `;

        const btnAddNote = this.root.querySelector('.notes-add');
        const inpTitle = this.root.querySelector('.notes-title');
        const inpBody = this.root.querySelector('.notes-body');
        const btnDeleteNote = this.root.querySelector('.notes-delete');

        btnAddNote.addEventListener('click', () => {
            this.onNoteAdd();
        });

        [inpTitle, inpBody].forEach(inputField => {
            inputField.addEventListener("blur", () => {
                const updatedTitle = inpTitle.value.trim();
                const updatedBody = inpBody.value.trim();

                this.onNoteEdit(updatedTitle, updatedBody);
            });
        });



        console.log(this._createListItemHTML(300, "Hey", "Yeah mate", new Date()));
        //todo: hide the note preview by default        


    }

    _createListItemHTML(id, title, body, updated) {
        const MAX_BODY_LENGTH = 60;

        return `
            <div class = 'notes-list-item' data-note-id="${id}">
                <div class="notes-small-title">${title}</div>
                <div class="notes-small-body">
                    ${body.substring(0, MAX_BODY_LENGTH)}
                    ${body.length > MAX_BODY_LENGTH ? "..." : ""}
                </div>
                <div class="notes-small-updated">
                ${updated.toLocaleString(undefined, { dateStyle: "full", timeStyle: "short"})}
                </div>
            </div>
        `;


    }

    updateNoteList(notes) {
        const notesListContainer = this.root.querySelector(".notes-list");

        // Empty list
        notesListContainer.innerHTML = "";

        for (const note of notes) {
            const html = this._createListItemHTML(note.id, note.title, note.body, new Date(note.updated));

            notesListContainer.insertAdjacentHTML("beforeend", html);
            
        }

        
            // Add select/delete events for each list item
            notesListContainer.querySelectorAll(".notes-list-item").forEach(noteListItem => {
                noteListItem.addEventListener("click", () => {
                this.onNoteSelect(noteListItem.dataset.noteId);
            });

            noteListItem.addEventListener("dblclick", () => {
                const doDelete = confirm("Are you sure you want to delete this note?");

                if (doDelete) {
                    this.onNoteDelete(noteListItem.dataset.noteId);
                }
            })
        });

        
    }

    updateActiveNote(note) {
        this.root.querySelector(".notes-title").value = note.title;
        this.root.querySelector(".notes-body").value = note.body;


this.root.querySelectorAll(".notes-list-item").forEach(noteListItem => {
    noteListItem.classList.remove("notes-list-item-selected")
});

this.root.querySelector(`.notes-list-item[data-note-id="${note.id}"]`)

    }

}