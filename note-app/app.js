
const notes=require('./notes.js')
const chalk=require('chalk')
const yargs=require('yargs')

yargs.version('1.1.0') //customize version
//console.log(yargs.argv)

//create add command
yargs.command({
	command:'add',
	describe:'add a new note',
	builder:{
		title:{
			describe:'Note title',
			demandOption: true, //if title is strictly required
			type: 'string'
			},
		body:{
			describe:'Note body',
			type:'string'
			}					
	},
	handler: (argv)=>{
		notes.addNote(argv.title,argv.body)
	}
})

//remove command
yargs.command({
	command:'remove',
	describe:'',
	builder:{
		title:{
			describe:'note title to be removed',
			demandOption:true,
			type:'string'
		}
	},
	handler(argv){
		notes.removeNote(argv.title)
	}
})
yargs.command({
	command:'read',
	describe:'read a note',
	builder:{
		title:{
			describe:'title of the notes to read',
			demandOption:true,
			type:'string'
		}
	},
	handler: function(argv){
		notes.readNote(argv.title)
	}
})
yargs.command({
	command:'list',
	describe:'gives the list of all the notes',
	handler(){
		notes.listNotes()
	}
})
yargs.parse()  //console.log(yargs.argv)
