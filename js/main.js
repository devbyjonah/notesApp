/*

	localStorage methods :
		- key(n) = returns name of nth key 
		- setItem(data) = adds key and value to storage || updates key if it already exists
		- getItem(key) = returns value of provided key
		- removeItem(key) = removes provided key
		- clear = empties local storage

*/

class Note {
	constructor(label, title, content, created){
		this._label = label
		this._title = title
		this._content = content
		this._created = created
		this._updated = created
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
	get created(){
		return this._created
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
		let notePreview = document.createElement('li')
		let title = document.createElement('h3')
		let content = document.createElement('p')
		let updated = document.createElement('span')
		/* setup note preview maybe title/ content preview with date updated on right */
		notePreview.appendChild(title)
		notePreview.appendChild(content)
		notePreview.appendChild(updated)
	}
}

function NoteStorage(){
	this._noteCount = 0
	this._noteList = []

	this.initialize = function(){
		for(let i = 0; i < localStorage.length; i++){
			this._noteList.push(JSON.parse(localStorage[i.toString()]))
			this._noteCount += 1
		}
		/* insert note list into DOM here in .sidebar using Note.renderPreview()*/
	}

	this.saveNote = function(note){
		this._noteCount += 1
		localStorage.setItem(this._noteCount, JSON.stringify(note))
	}

	this.deleteNote = function(note){
		localStorage.removeItem(note.label)
		this._noteCount -= 1
	}
}

function main(){
	/* create notes object to store and manage all notes */
	let notes = new NoteStorage()
	/* button setup */
	const saveButton = document.querySelector('.saveButton')
	const addButton = document.querySelector('.addButton')
}
