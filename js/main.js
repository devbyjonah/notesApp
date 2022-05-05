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
}

function NoteStorage(){
	this._noteCount = 0
	this._noteList = []

	this.initialize = function(){
		for(let i = 0; i < localStorage.length; i++){
			this._noteList.push(JSON.parse(localStorage[i.toString()]))
			this._noteCount += 1
		}
		console.log(this._noteList)
	}

	this.addNote = function(note){
		this._noteCount += 1
		localStorage.setItem(this._noteCount, JSON.stringify(note))
	}

	this.removeNote = function(note){

	}
}

let notes = new NoteStorage()
let myNote = new Note('label','this is my title', 'this is my notes content that i definitely spent a while on', 'dateCreated')

/* let saveButton = document.querySelector('.saveButton')
let addButton = document.querySelector('.addButton')

saveButton.addEventListener('click', ) */
