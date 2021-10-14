const url = 'http://localhost:3000/notes'
const noteList = document.getElementById('note-list')


function listNotes() {
    fetch(url)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        for (let item of data) {
            renderNoteItem(item)
        }
    })
}

function renderNoteItem(noteObj) {
    const li = document.createElement('li')
    li.id = noteObj.id

    renderNoteItem(li, noteObj)
    const container = document.createElement('ul')
    root.appendchild(ul)
}

function renderNoteItem(li, noteObj) {
    li.innerHTML = '<span>${noteObj.body}</span>'
}

