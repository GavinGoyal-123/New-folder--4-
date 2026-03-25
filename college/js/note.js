document.addEventListener("DOMContentLoaded", () => {
    let notes = window.loadData('dlm_notes', []);
    
    const noteInput = document.getElementById("note-input");
    const addNoteBtn = document.getElementById("add-note-btn");
    const notesList = document.getElementById("notes-list");

    if (notesList) {

        function renderNotes() {
            notesList.innerHTML = "";

            notes.forEach((note, index) => {
                const li = document.createElement("li");
                li.className = `list-item fade-in ${note.completed ? 'completed' : ''}`;
                
                li.innerHTML = `
                    <div class="item-left">
                        <input type="checkbox" ${note.completed ? "checked" : ""} data-index="${index}">
                        <span class="note-text" data-index="${index}">${note.title}</span>
                    </div>
                    <button class="danger" data-index="${index}">Delete</button>
                `;

                notesList.appendChild(li);
            });
        }

        renderNotes();

        // Add note
        addNoteBtn.addEventListener("click", () => {
            const title = noteInput.value.trim();
            if (title) {
                notes.push({ title, completed: false });
                window.saveData('dlm_notes', notes);
                noteInput.value = "";
                renderNotes();
            }
        });

        // Parent event listener
        notesList.addEventListener("click", (e) => {
            const index = e.target.getAttribute("data-index");
            if (index === null) return;

            // Checkbox click
            if (e.target.tagName === "INPUT") {
                notes[index].completed = e.target.checked;
                window.saveData('dlm_notes', notes);
                renderNotes();
            }

            // Delete note
            else if (e.target.tagName === "BUTTON") {
                notes.splice(index, 1);
                window.saveData('dlm_notes', notes);
                renderNotes();
            }

            // Click text → show full note
            else if (e.target.classList.contains("note-text")) {
                alert(notes[index].title);
            }
        });
    }
});