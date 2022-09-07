const originalProfileField = document.getElementById('firstFile');
const newProfileField = document.getElementById('secondFile');
const form = document.getElementById('form');
localStorage.clear();

function filterJsonTrash(json)
{
    if (json.CustomField["#text"]) 
    {
        delete json.CustomField["#text"];
    }
    return json;
}

function xmlToJson(xml) 
{
	// Create the return object
	var obj = {};

	if (xml.nodeType == 1) { // element
		// do attributes
		if (xml.attributes.length > 0) {
		obj["@attributes"] = {};
			for (var j = 0; j < xml.attributes.length; j++) {
				var attribute = xml.attributes.item(j);
                console.log(attribute);
				obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
			}
		}
	} else if (xml.nodeType == 3) { // text
		obj = xml.nodeValue;
	}

	// do children
	if (xml.hasChildNodes()) {
		for(var i = 0; i < xml.childNodes.length; i++) {
			var item = xml.childNodes.item(i);
			var nodeName = item.nodeName;
			if (typeof(obj[nodeName]) == "undefined") {
				obj[nodeName] = xmlToJson(item);
			} else {
				if (typeof(obj[nodeName].push) == "undefined") {
					var old = obj[nodeName];
					obj[nodeName] = [];
					obj[nodeName].push(old);
				}
				obj[nodeName].push(xmlToJson(item));
			}
		}
	}
	return obj;
};

form.onsubmit = function(event){
    if (localStorage.getItem('inputProfile') && localStorage.getItem('secondInputProfile'))
    {
        console.log('Diff the fields!');
    }
    else { console.log('Its missing a file...');}
    return false;
}

function checkVar(element)
{
    console.log('CheckVar: inputProfile: ' +localStorage.getItem('inputProfile'));
    console.log('CheckVar: secondInputProfile: ' +localStorage.getItem('secondInputProfile'));
}

originalProfileField.addEventListener('change', (event) => {
    const OriginalProfile = event.target.files[0];
    const reader = new FileReader();
    reader.readAsText(OriginalProfile);
    reader.onload = function() {
        var parser = new DOMParser();
        var xmlDoc = parser.parseFromString(reader.result,"text/xml");
        var inputProfile = xmlToJson(xmlDoc);
        inputProfile = filterJsonTrash(inputProfile);
        console.log('inputProfile: '+JSON.stringify(inputProfile));
        localStorage.setItem('inputProfile',inputProfile);
    }
    
})

newProfileField.addEventListener('change', (event) => {
    const newProfile = event.target.files[0];
    const reader = new FileReader();
    reader.readAsText(newProfile)
    reader.onload = function() {
        var parser = new DOMParser();
        var xmlDoc = parser.parseFromString(reader.result,"text/xml");
        var secondInputProfile = xmlToJson(xmlDoc);
        secondInputProfile = filterJsonTrash(secondInputProfile);
        console.log('secondInputProfile: '+JSON.stringify(secondInputProfile));
        localStorage.setItem('secondInputProfile',secondInputProfile);
    }
})

function diffJsons(jsonOld,jsonNew)
{
    console.log('Entered diffJsons');
    //For each node of the NEW, look at the old
    // then for each node of the old, search at the new

    //Show them to the user
}



