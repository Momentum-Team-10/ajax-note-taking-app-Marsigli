const url = "http://localhost:3000/notes";
const noteList = document.getElementById("note-list");
const container = document.createElement("ul");
container.id = "container"
root.appendChild(container);
const form = document.getElementById("notes-form");

function listNotes() {
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            for (let item of data) {
                renderNoteItem(item);
            }
        });
}

listNotes();

function renderNoteItem(noteObj) {
    const notecontainer = document.createElement("div");
    container.appendChild(notecontainer);

    const li = document.createElement("li");
    li.id = noteObj.id;
    li.innerHTML = `<span>${noteObj.body}</span>`;
    notecontainer.appendChild(li);

    const deletebutton = document.createElement("button");
    deletebutton.innerText = "delete";
    deletebutton.id = noteObj.id;
    notecontainer.appendChild(deletebutton);

    const editbutton = document.createElement("button");
    editbutton.innerText = "edit";
    editbutton.id = noteObj.id;
    notecontainer.appendChild(editbutton);

    //adding functionality to the delete button
    deletebutton.addEventListener('click', (e) => {
        fetch(url + "/" + `${e.target.id} `, {
            method: "DELETE",
        }).then(() => e.target.parentElement.remove());
        console.log(e);
    });

    editbutton.addEventListener('click', (e) => {
        const inputbox = document.createElement('input')
        inputbox.id =  'editbox'
        inputbox.type = 'text'
        inputbox.placeholder = 'enter new note here'
        notecontainer.appendChild(inputbox)
        inputbox.value = noteObj.body
        const savebutton = document.createElement('button')
        savebutton.innerText = "save";
        savebutton.id = noteObj.id;
        notecontainer.appendChild(savebutton);
        savebutton.addEventListener('click', (e) => {
            fetch(url + '/' + `${e.target.id} `, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: 'Title',
                    body: inputbox.value,
                })
            })
                .then(res => res.json())
                .then(data => {
                    li.innerHTML = `<span>${data.body}</span>`;
                    savebutton.remove()
                    inputbox.remove()
                })    
        })

        
    })
}

//adding functionality to 
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const noteText = document.getElementById("input-tab").value;
    console.log(noteText);
    createNote(noteText);
    // Clear form after a todo has been created
    form.reset();
});

function createNote(noteText) {
    fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            title: "Title",
            body: noteText,
            // created_at: moment().format()
        }),
    })
        .then((res) => res.json())
        .then((data) => renderNoteItem(data));
}
