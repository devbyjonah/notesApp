/*

	localStorage methods :
		- key(n) = returns name of nth key 
		- setItem(data) = adds key and value to storage || updates key if it already exists
		- getItem(key) = returns value of provided key
		- removeItem(key) = removes provided key
		- clear = empties local storage

*/

class Note {
	constructor(label, title, content, date){
		this._label = label
		this._title = title
		this._content = content
		this._updated = date
	}
	get label(){
		return this._label
	}
	get title(){
		return this._title
	}
	set title(newTitle){
		this._title = newTitle
	}
	get content(){
		return this._content
	}
	set content(newContent){
		this._content = newContent
	}
	get updated(){
		return this._updated
	}
	set updated(newDate){
		this._updated = newDate
	}

	renderNote(){
		document.querySelector('.title').value = this._title
		document.querySelector('.content').value = this._content
	}

	renderPreview(){
		/* create elements */
		let notePreview = document.createElement('li')
		let title = document.createElement('h3')
		let content = document.createElement('p')
		let updated = document.createElement('span')

		/* assign preview class with this._label */
		notePreview.id = this._label

		/* attach elements to container */
		notePreview.appendChild(title)
		notePreview.appendChild(content)
		notePreview.appendChild(updated)

		/* assign preview values */
		title.innerText = this._title
		content.innerText = this._content
		updated.innerText = this._updated

		/* append to DOM */
		document.querySelector('.notesList').appendChild(notePreview)
	}

	removePreview(){
		document.querySelector('.' + this._label).remove()
	}
}

class NoteStorage{
	constructor() {
		this._noteCount = 0
		this._noteList = {}
		this._currentNote
	}

	initialize(){
		for(let i = 0; i < localStorage.length; i++){
			let current = JSON.parse(localStorage[(i + 1).toString()])
			this._noteList[current.label] = current
			this._noteCount += 1
			current.renderPreview()
		}
	}

	get noteList(){
		return this._noteList
	}

	get currentNote(){
		return this._currentNote
	}

	set currentNote(note){
		this._currentNote = note
	}

	createNote(){
		this._noteCount++
		let newNote = new Note(this._noteCount, 'Enter title here . . .', 'Write your thoughts here . . .', Date())
		this._currentNote = newNote
		newNote.renderNote()
	}

	saveNote(){
		if (!this.currentNote){
			let newNote = new Note(this._noteCount, document.querySelector('.title').innerText, document.querySelector('.content').innerText, Date())
			this._currentNote = newNote
		}
		this._noteCount += 1
		this._currentNote.updated = Date()
		localStorage.setItem(this._noteCount, JSON.stringify(this._currentNote))
	}

	deleteNote(note){
		localStorage.removeItem(note.label)
		note.removePreview()
		this._noteCount -= 1
	}
}

/* button setup */
const saveButton = document.querySelector('.saveButton')
const addButton = document.querySelector('.addButton')
const preview = document.querySelector('li')

/* create notes object to store and manage all notes */
let notes = new NoteStorage()
notes.initialize()

/* event listeners*/
saveButton.addEventListener('click', () => notes.saveNote())
addButton.addEventListener('click', () => notes.createNote())
preview.addEventListener('click', (val) => {
	notes.noteList[val.id].renderNote()
	notes.currentNote = notes.noteList[val.id]
})
