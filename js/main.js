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
		this.key = key // key is set to a unique string of date/time the note was created
		this.title = title
		this.content = content
		this.updated = updated // updated stores the date and time the note was last saved
	}

	deleteNote(){
		localStorage.removeItem(this.key)
	}

	saveNote(){
		// updating note object to current values from the DOM
		this.title = document.querySelector('.title').value
		this.content = document.querySelector('.content').value
		this.updated = new Date().toLocaleString()

		// store note object with key set to the objects key property
		localStorage.setItem(this.key, JSON.stringify(this)) // JSON.stringify() serializes object into a string
	}

	openNote(){
		// insert Notes properties title, content, and key into the DOM
		document.querySelector('.title').value = this.title
		document.querySelector('.content').value = this.content
		document.querySelector('#noteID').innerText = this.key
		// updated displayedNote variable to reflect current Note object
		displayedNote = this
	}
}

function init(){
	// cycle through notesList element and remove each child element (clearing list)
	const notesList = document.querySelector('.notesList')
	while (notesList.firstChild){
		notesList.removeChild(notesList.lastChild)
	}

	// iterate through localStorage, re-constructing serialized strings into Note objects
	for (let i = 0; i < localStorage.length; i++){
		let current = JSON.parse(localStorage.getItem(localStorage.key(i))) // current note object
		let loadedNote = new Note(current.key, current.title, current.content, current.updated) // init object with Note constructor

		let preview = document.createElement('li') // note preview to be appended to notesList sidebar

		preview.innerText = current.key
		preview.id = current.key

		// add event listener to preview to open the note it represents
		preview.addEventListener('click', () => {
			loadedNote.openNote()
		})
		notesList.appendChild(preview)
	}
}
// display default note on startup
let emptyNote = new Note(new Date().toLocaleString(), '', '', new Date().toLocaleString())
emptyNote.openNote()

document.addEventListener('DOMContentLoaded', () => init()) // call init function after DOM is loaded in
// event listener for saveButton saves note into localStoraage and calls init() function to refresh notesList
document.querySelector('.saveButton').addEventListener('click', () => { 
	displayedNote.saveNote()
	init()
})
// new note event listener creates new Note object and opens the note with openNote() method
document.querySelector('.addButton').addEventListener('click', () => {
	let newNote = new Note(new Date().toLocaleString(), '', '', new Date().toLocaleString())
	newNote.openNote()
})
document.querySelector('.deleteButton').addEventListener('click', () => {
	displayedNote.deleteNote()
	emptyNote.openNote()
	init()
})
