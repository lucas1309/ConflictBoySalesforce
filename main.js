const originalProfileField = document.getElementById('thefile');

function parsingXml(xmlDoc)
{
    var title = xmlDoc.getElementsByTagName("fullName");
    console.log(title);
    console.log('fullName: '+ title[0].childNodes[0].textContent);
    console.log('title.length: '+ title.length);

    for(var i = 0; i < title.length; i++)
    {
        console.log('Node title: '+title[i].childNodes[0].textContent);
    }
}

originalProfileField.addEventListener('change', (event) => {
    const OriginalProfile = event.target.files[0];
    const reader = new FileReader();
    console.log('Name:'+ OriginalProfile.name);
    console.log('Size:'+ OriginalProfile.size);
    console.log('Type:'+ OriginalProfile.type);
    reader.readAsText(OriginalProfile)
    reader.onload = function() {
        console.log('Blob:'+ reader.result);
        var parser = new DOMParser();
        var xmlDoc = parser.parseFromString(reader.result,"text/xml");
        parsingXml(xmlDoc);
    }
})

