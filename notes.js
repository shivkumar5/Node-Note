const fs=require('fs');

var fetchNotes=()=>{
    try{
        var notesString=fs.readFileSync('notes-data.json');
        return JSON.parse(notesString);
    }catch(e){
        //console.log(e);
        return [];
    }
};
var saveNotes=(notes)=>{
    fs.writeFileSync('notes-data.json',JSON.stringify(notes));
    
};

var addNote=(title,body)=>{
    var notes=[];
    var note={
        title,
        body
    };
    if(title!=undefined){
        notes=fetchNotes();
        var duplicateNotes=notes.filter((note)=> note.title===title);
        if(duplicateNotes.length===0){
            notes.push(note);
            saveNotes(notes)
            return note; 
        }else{
            console.log("This note already Exists ")
        }
    }else{
            console.log("Enter valid title and try again");
    }
    

};
var getAll=()=>{
    var notes=fetchNotes();
    if(notes.length>0){
        notes.forEach(function(note) {
            console.log(note.title);
            
        }, this);
    }else{
        console.log('There is no notes available');
    }
};
var getNote=(title)=>{
    var notes=fetchNotes();
    var mynote=notes.filter((note)=>note.title===title);
    return mynote;
};
var removeNote=(title)=>{
   let notes=fetchNotes()
   var filteredNotes=notes.filter((note)=>note.title!=title)
   saveNotes(filteredNotes);
   if(notes.length!=filteredNotes.length){
     return true;
   }else{
       return false;
   }
};

module.exports={
    addNote,
    getAll,
    removeNote,
    getNote
    
}