/*

	localStorage methods :
		- key(n) = returns name of nth key 
		- setItem(data) = adds key and value to storage || updates key if it already exists
		- getItem(key) = returns value of provided key
		- removeItem(key) = removes provided key
		- clear() = empties local storage

*/

// The Note object has methods to allow adding a new note, saving a note, deleting a note, and opening a note

// It has 4 properties: key, title, content, and updated

let displayedNote // displayedNote holds the Note object of the current opened note

class Note{
	constructor(key, title, content, updated){
		this.key = key
		this.title = title
		this.content = content
		this.updated = updated
	}

	deleteNote(){
		localStorage.removeItem(this.key)
	}

	saveNote(){
		this.title = document.querySelector('.title').value
		this.content = document.querySelector('.content').value
		this.updated = new Date().toLocaleString()

		localStorage.setItem(this.key, JSON.stringify(this))
	}

	openNote(){
		document.querySelector('.title').value = this.title
		document.querySelector('.content').value = this.content
		document.querySelector('#noteID').innerText = this.key

		displayedNote = this
	}
}

function init(){
	// emptying list before loading notes back in
	const notesList = document.querySelector('.notesList')
	while (notesList.firstChild){
		notesList.removeChild(notesList.lastChild)
	}

	for (let i = 0; i < localStorage.length; i++){
		let current = JSON.parse(localStorage.getItem(localStorage.key(i)))
		let loadedNote = new Note(current.key, current.title, current.content, current.updated)

		let preview = document.createElement('li')

		preview.innerText = current.key
		preview.id = current.key
		preview.addEventListener('click', () => {
			loadedNote.openNote()
		})
		notesList.appendChild(preview)
	}
}

displayedNote = new Note(new Date().toLocaleString(), 'my title here', 'my content here', new Date().toLocaleString())
displayedNote.openNote()

document.addEventListener('DOMContentLoaded', () => init())
document.querySelector('.saveButton').addEventListener('click', () => {
	displayedNote.saveNote()
	init()
})
