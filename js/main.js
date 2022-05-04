/*

	localStorage methods :
		- key(n) = returns name of nth key 
		- setItem(data) = adds key and value to storage || updates key if it already exists
		- getItem(key) = returns value of provided key
		- removeItem(key) = removes provided key
		- clear = empties local storage

*/

class Note{
	constructor(title, content, created){
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
		let title = document.createElement('h1')
		let content = document.createElement('p')

		document.querySelector('.noteTitle').appendChild(title)
		document.querySelector('.')
	}
}

let mynote = new Note('title', 'my note', 'date made')