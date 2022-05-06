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
		notePreview.className = this._label

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
		this._noteList = []
		this._currentNote
	}

	initialize(){
		for(let i = 0; i < localStorage.length; i++){
			this._noteList.push(JSON.parse(localStorage[i.toString()]))
			this._noteCount += 1
		}
		/* insert note list into DOM here in .sidebar using Note.renderPreview()*/
		this._noteList.forEach(note => note.renderPreview())
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
		newNote.renderNote()
	}

	saveNote(){
		this._noteCount += 1
		note.updated(Date())
		localStorage.setItem(this._noteCount, JSON.stringify(note))
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

/* create notes object to store and manage all notes */
let notes = new NoteStorage()
notes.initialize()
