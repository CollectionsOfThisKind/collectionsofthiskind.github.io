/**
* @Collections of this Kind
* All code not attributed, 
* Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License. 
* http://creativecommons.org/licenses/by-nc-sa/4.0/
*
* Code for pages to show various notes and edits.
*/

/**
* Default text color to return to.
*/
var defaultColor="#555555";


/**
 * Just makes sure the link to turn off edits is vanished (they haven't yet been turned off).
*/
function initialize()
{
	document.getElementsByClassName("editsoff")[0].style.display="none";
	quotes=document.getElementsByClassName("quote");
	
	for (var i=0;i<quotes.length;i++)
	{
		quotes[i].innerHTML="<!--#include file='quotes/" + quotes.id + ".html' -->"
		console.log(quotes[i].innerHTML);
	}
	
	document.getElementsByClassName("notesoff")[0].style.display="none";
	
	editsUnsorted=document.getElementsByClassName("edit");
	deletesUnsorted=document.getElementsByClassName("delete");
	if ((editsUnsorted.length==0) && (deletesUnsorted.length==0))
	{	
		document.getElementsByClassName("editsoff")[0].style.display="none";
		document.getElementsByClassName("editson")[0].style.display="none";
	}	
	
	notes=document.getElementsByClassName("notes");
	if (notes.length==0)
	{
		document.getElementsByClassName("notesoff")[0].style.display="none";
		document.getElementsByClassName("noteson")[0].style.display="none";
	}
}


/**
* Gets the edits, sorts them by date, and shows those in the page made later in a 
* darker colour.
* Ordering code based on:
* http://stackoverflow.com/questions/4760080/how-can-i-reorder-sort-a-nodelist-in-javascript
* http://stackoverflow.com/questions/282670/easiest-way-to-sort-dom-nodes
* http://stackoverflow.com/questions/5285995/how-do-you-sort-letters-in-javascript-with-capital-and-lowercase-letters-combin
* Edits should be in the form:
* &lt;span class=edit id=20150103&gt; which becomes 03-Jan-2015. 
* Deletes should be in the class "delete". These will be hidden by CSS, and 
* displayed as strike-through when revealed.
*/
function showEdits()
{
	editsUnsorted=document.getElementsByClassName("edit");
	deletesUnsorted=document.getElementsByClassName("delete");
	
	var edits=[];
	
	for (var i=0;i<editsUnsorted.length;i++)
	{   
		edits.push(editsUnsorted[i]);
	} 
	for (var i=0;i<deletesUnsorted.length;i++)
	{   
		edits.push(deletesUnsorted[i]);
		deletesUnsorted[i].style.display="inline";
	} 
	
	edits.sort(function(a,b) {
		
		var aCat=Number(a.getAttribute("id"));
		var bCat=Number(b.getAttribute("id"));
		
		if (isNaN(aCat))
		{
			return a.getAttribute("id").toLowerCase().localeCompare(b.getAttribute("id").toLowerCase());
		}
		//alert(aCat + " " + bCat);
		if (aCat > bCat) return 1;
		if (aCat < bCat) return -1;
		return 0;
	});
	
	for (var i=0;i<edits.length;i++)
	{   
		ident=edits[i].getAttribute("id");
		dateOfEdit=parseDate(String(ident));
		scale=-(0 - (20 + (i * 100/edits.length)));
		hex=rgbToHex(scale, scale, scale);
		edits[i].style.color=hex;
		edits[i].title=dateOfEdit;
	} 
	
	document.getElementsByClassName("editson")[0].style.display="none";
	document.getElementsByClassName("editsoff")[0].style.display="inline";	
}


/**
* Hides edits by changing back to defaultColor color.
* This is set in file-level variable at top.
*/
function hideEdits()
{
	edits=document.getElementsByClassName("edit");
	
	for (var i=0;i<edits.length;i++)
	{   
		edits[i].style.color=defaultColor;
		edits[i].title="";
	} 

	deletesUnsorted=document.getElementsByClassName("delete");
	
	
	for (var i=0;i<deletesUnsorted.length;i++)
	{   
		deletesUnsorted[i].style.color=defaultColor;
		deletesUnsorted[i].style.display="none";
		deletesUnsorted[i].title="";
	} 
	
	document.getElementsByClassName("editson")[0].style.display="inline";
	document.getElementsByClassName("editsoff")[0].style.display="none";	
}

	
/**
* Shows notes and sets the relevant link buttons.
*/	
function showNotes()
{	
	document.getElementsByClassName("noteson")[0].style.display="none";
	document.getElementsByClassName("notesoff")[0].style.display="block";
	notes=document.getElementsByClassName("notes");
	noteNumbers=document.getElementsByClassName("note");
	for (var i=0;i<notes.length;i++)
	{   
		notes[i].style.display="block";
	} 
	for (var i=0;i<noteNumbers.length;i++)
	{   
		noteNumbers[i].style.display="inline";
	} 
}


/**
* Hides notes and sets the relevant link buttons.
*/	
function hideNotes()
{
	document.getElementsByClassName("noteson")[0].style.display="block";
	document.getElementsByClassName("notesoff")[0].style.display="none";	
	notes=document.getElementsByClassName("notes");
	noteNumbers=document.getElementsByClassName("note");
	for (var i=0;i<notes.length;i++)
	{   
		notes[i].style.display="none";
	} 
	for (var i=0;i<noteNumbers.length;i++)
	{   
		noteNumbers[i].style.display="none";
	} 
}
		

/**
* RGB to hex string conversion, from: http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
*/
function rgbToHex(r, g, b)
{
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}


/**
* Parses a string (see initialize) into a hypen-separated date.
* e.g. 20150102 becomes 02-Jan-2015.
*/
function parseDate(str)
{
	var year=str.substring(0,4);
	var month=str.substring(4,6);
	var monthstr="";
	var day=str.substring(6);
	
	switch(month)
	{
    case "01":
        monthstr="-Jan-";
        break;
    case "02":
        monthstr="-Feb-";
        break;
    case "03":
        monthstr="-Mar-";
        break;
    case "04":
        monthstr="-Apr-";
        break;
    case "05":
        monthstr="-May-";
        break;
    case "06":
        monthstr="-Jun-";
        break;
    case "07":
        monthstr="-Jul-";
        break;
    case "08":
        monthstr="-Aug-";
        break;
    case "09":
        monthstr="-Sep-";
        break;
    case "10":
        monthstr="-Oct-";
        break;
    case "11":
        monthstr="-Nov-";
        break;
    case "12":
        monthstr="-Dec-";
        break;
	defaultColor:
        monthstr="-???-";
	} 
	
	return day + monthstr + year;
}
