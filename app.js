const fs=require('fs');
const _ =require('lodash');
const yargs=require('yargs');
var titleOpt={
    describe:'Title of note',
    demand:true,
    alias:'t'
};
var bodyOpt={
    describe:'Body of note',
    demand:true,
    alias:'b'
};
const argv=yargs
            .command('add','Add a new note',{
                title:titleOpt,
                body:bodyOpt
            })
            .command('list','List all note',{
            })
            .command('read','Read a note',{
                title:titleOpt
            })
            .command('remove','Remove an existing note',{
                title:titleOpt,
                alias:'r'
            })
            .help()
            .argv;


var notes=require('./notes'); 

var command = process.argv[2];
if(command=='add'){
    //console.log('Adding new note');
    var note=notes.addNote(argv.title,argv.body);
    if(note){
        console.log(`title:${note.title}`);
        console.log(`body:${note.body}`);
    }
    //console.log(argv.title);
}else if(command=='list'){
    notes.getAll();
}else if(command=='read'){
    var note=notes.getNote(argv.title);
    if(note.length>0){
        console.log('\nNote Found');
        console.log(note);

    }else{
        console.log("Note not found");
    }
    
}else if(command=='remove'){
   var bool= notes.removeNote(argv.title);
   var msg=bool?"Node removed":"Node doesn't exists";
   console.log(msg);
    
}else{
    console.log('Command not recognized');
}