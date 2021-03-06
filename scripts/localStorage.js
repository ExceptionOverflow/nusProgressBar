'use strict';

var recovering = false;
var Col = 5;

var keepData = {
/*
	Storage.prototype.setObj: function(key, obj) {
        return this.setItem(key, JSON.stringify(obj));
    },

    Storage.prototype.getObj: function(key) {
        return JSON.parse(this.getItem(key));
    },
*/
    updateColToLocalStorage: function(type){
    	if (type === 'add'){
    		Col++;
    	}
    	else if(type === 'remove'){
    		if (Col === 5) {
    			console.log('error: trying to remove col from 5 fix column');
    		}else {
    			Col--;
    		}
    	}
    	localStorage.setItem('Col',Col);
    },
/*
    retreiveCol: function() {
    	Col = 5;
    	var noColToAdd = localStorage.getItem('Col');
    	if(noColToAdd === 0) return;
    	console.log('start to add col');
    	var moduleTable = require('./moduleTable/index.js');
    	for(var i=0; i<noColToAdd; i++){
    		moduleTable.addCol();
    	}
    },
*/
    saveModuleToLocalStorage: function(mod, tile) {
		if (recovering === true)
			return;
		var tiles;
		if (tile.charAt(0) === '#')
			tiles = tile;
		else
			tiles = "#"+tile;
		var modObj = {"mod": mod, "tile": tiles};
		//console.log("tile");
		//console.log(tile);
		//console.log(tiles);
		var modules = [];
		// console.log(localStorage.getItem('modules'));
		if(localStorage.getItem('modules')!=null){
		    modules = JSON.parse(localStorage.getItem('modules'));
		    //console.log("stored modules");
		    
		    
		}
		modules.push(modObj);
		// console.log(modules);
		localStorage.setItem('modules',JSON.stringify(modules));
		var nowMod = JSON.parse(localStorage.getItem('modules'));
		// console.log("saved");
		// console.log(nowMod);
	},



	removeModuleFrLocalStorage: function(data){
		var modules = JSON.parse(localStorage.getItem("modules"));
	    var rem;
	    for (var i=0; i< modules.length; i++){
	    	rem = modules[i];
	        if (rem.mod == data) {
	        	// console.log("removed!");
	        	modules.splice(i,1);
	        	break;
	        }
	    }
	    localStorage["modules"] = JSON.stringify(modules);
	    // console.log('module removed');
	    // console.log(modules);
	},

	retreiveModules: function(){
		//localStorage.clear();
		recovering = true;
		console.log("retriving last moduleTable");
		var modules = [];
		if(localStorage.getItem('modules')){
		//if(localStorage.length!=0){
	        modules = JSON.parse(localStorage.getItem('modules'));
	        // console.log(modules);
            var AppBody = require("./common/index.js");

	        for(var i=0; i<modules.length; i++){
	        	var moduleCode = modules[i].mod;
	        	// console.log(moduleCode + "retreived");
	        	// console.log(modules[i].tile);
	        	// var elements = modules[i].tile;
                
	        	// var target = ModuleTable.getTileById(elements);
	        	// console.log("tile retreived");
          //       console.log(elements);
                //AppBody.request("addModuleToTile", elements, moduleCode);
				AppBody.request("addModuleToTile", modules[i].tile, moduleCode);
			}
	    }

	    recovering = false;
	},

 
	saveProgrammeToLocalStorage : function(option, data){
		if (recovering === true)
			return;
		switch(option){
			case "AY" :
                localStorage.setItem('AY', data);
			    console.log(localStorage.getItem('AY'));
			    break;
			case "faculty" :
				localStorage.setItem('faculty', data);
				break;

			case "department" :
				localStorage.setItem('department', data);
				break;

			case "programme" :
				localStorage.setItem('programme', data);
				break;
			case "specialisation":
			    //console.log(data);
			    localStorage.setItem('specialisation',data);
			    break;
			}

		var savedDATA = localStorage.getItem(option);
		//console.log(option + ': ');
		//console.log(savedDATA);
	},

	retreiveProgramme: function(jsfile){
		//localStorage.clear();
		recovering = true;
		console.log("retriving last programme");
		var AY;
		var faculty;
		var department;
		var programme;
		var specialisation;
        
        //console.log("which is AY:");
		//console.log(localStorage.getItem('AY'));
	    
	    AY = localStorage.getItem('AY');
	    if(AY === null) {
	    	console.log("no localStorage");
	    	return;
        }
        console.log("only see this when there is localStorage");
	    if(localStorage.getItem('faculty')){
	        faculty = localStorage.getItem('faculty');
	        // console.log(faculty);
	    }
	    if(localStorage.getItem('department')){
	        department = localStorage.getItem('department');
	        // console.log(department);
	    }
	    if(localStorage.getItem('programme')){
	        programme = localStorage.getItem('programme');
	        // console.log(programme);
	    }
	    if(localStorage.getItem('specialisation')){
	        specialisation = localStorage.getItem('specialisation');
	        //console.log('get specialisation from Storage');
	        //console.log(specialisation);
	    }
        
        //var ChooseProgramme = require("./common/ChooseProgramme.js");
        console.log(faculty);
        //ChooseProgramme.updateFrLocalStorage(AY, faculty, department, programme, specialisation);
        jsfile.updateFrLocalStorage(AY, faculty, department, programme, specialisation);
	    recovering = false;
	},


}

module.exports = keepData;