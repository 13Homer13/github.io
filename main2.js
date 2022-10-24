const app = document.getElementById("app");
const button = app.querySelector("button");

getNotes().forEach( note => {
    let element = createElement(note.id, note.content);
    app.insertBefore(element, button);
});

button.addEventListener("click", addNote);

function getNotes() {
    return JSON.parse(localStorage.getItem("key-note") || "[]");
}

function saveNotes(notes) {
    localStorage.setItem("key-note", JSON.stringify(notes));
}


function createElement(id, content) {
    const element = document.createElement("textarea");
    element.value = content;
    element.classList.add("note");
    element.placeholder = "db click to remove";
    element.addEventListener("change", () => {
        updateNote(id, element.value);
    });
    element.addEventListener("dblclick", () => {
        let ask = confirm("are you sure?");
        if (ask) {
            deleteNote(id, element);
        }
    })
    return element;
}


function deleteNote(id, element) {
    let notes = getNotes().filter(note => note.id !== id);
    saveNotes(notes);
    app.removeChild(element);

}

function updateNote(id, newContent) {
    let notes = getNotes();
    let target = notes.filter(note => note.id === id);
    target[0].content = newContent;
    saveNotes(notes);
}

function addNote() {
    let notes = getNotes();
    let noteObj = {
        id: Math.floor(Math.random()* 1000),
        content: "",
    };
    notes.push(noteObj);
    saveNotes(notes);
    let newNote = createElement(noteObj.id, noteObj.content);
    app.insertBefore(newNote, button);
}