const fs = require('fs')
const chalk = require('chalk')


const addNote = (title, body) => {
	const notes = loadNote()
	//const dupNote = notes.filter((note) => note.title === title)
	// above is inefficient way (searches all the elements)
	const dupNote = notes.find(note=>note.title===title) //returns true if found(doesnt search further)
	
	if (!dupNote) {  //dupNote.length === 0  //if using filter method
		notes.push({
			title: title,
			body: body
		})
		saveNotes(notes)
		console.log(chalk.green('Note added!'))
	} else {
		console.log(chalk.red('Note with title \'' + title + '\' already exist!'))
	}

}
debugger //to run it=> node inspect <appname>
const saveNotes = (notes) => {
	const dataJSON = JSON.stringify(notes)
	fs.writeFileSync('notes.json', dataJSON);
}
const removeNote = (title) => {
	const notes = loadNote()
	const newList = notes.filter((note) => note.title !== title)
	if (notes.length === newList.length) {
		console.log(chalk.red('Note with title \'' + title + '\' doesnt exist!'))
	}
	else {
		saveNotes(newList)
		console.log(chalk.blue('note deleted!'))
	}
}

const listNotes = ()=>{
	const allNotes=loadNote()
	console.log(chalk.blue('Your Notes:'))
	allNotes.forEach(element => {
		console.log(element.title)
	});
}
const readNote=(title)=>{
	const allNotes=loadNote()
	const foundNote = allNotes.filter(note=>note.title===title)
	console.log(foundNote)
	if(foundNote.length===1){
		console.log(chalk.blue.inverse.bold(title))
		console.log(chalk.blue(foundNote[0].body))
	}
	else{
		console.log(chalk.red.bold('Note Not Found'))
	}
}

const loadNote = () => {
	try {
		const dataBuffer = fs.readFileSync('notes.json');
		const data = dataBuffer.toString()
		return JSON.parse(data)
	}
	catch (e) {
		return []//fs.writeFileSync('notes.json','');
	}
}

module.exports = {
	addNote: addNote,
	removeNote: removeNote,
	listNotes: listNotes,
	readNote:readNote
}