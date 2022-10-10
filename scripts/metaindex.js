/**
* @Collections of this Kind
* All code not attributed, 
* Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License. 
* http://creativecommons.org/licenses/by-nc-sa/4.0/
*
* Code for main index page, known as "metaindex" though called index.html.
*/


/**
* Start page with "show edits" link button on, "show new" off, and new posts shown.
*/
function metainitialize()
{
	
	document.getElementsByClassName("newon")[0].style.display="none";
	
	editlists=document.getElementsByClassName("edits");
	
	for (var i=0;i<editlists.length;i++) {
		editlists[i].style.display="none";
	}
	
}

	
/**
* Display the new posts and the "show edits" link button. 
* Hide new edits and "show new" link button.
*/
function showNew()
{
	
	
	document.getElementsByClassName("newon")[0].style.display="none";
	
	editlists=document.getElementsByClassName("edits");
	
	for (var i=0;i<editlists.length;i++) {
		editlists[i].style.display="none";
	}
	
	
	document.getElementsByClassName("editson")[0].style.display="inline";
	
	editlists=document.getElementsByClassName("new");
	
	for (var i=0;i<editlists.length;i++) {
		editlists[i].style.display="block";
	}
	
	
}


/**
* Display the new edits and the "show new" link button. 
* Hide new posts and "show edits" link button.
*/
function showEdits()
{
	
	
	document.getElementsByClassName("editson")[0].style.display="none";
	
	editlists=document.getElementsByClassName("new");
	
	for (var i=0;i<editlists.length;i++) {
		editlists[i].style.display="none";
	}
	
	
	document.getElementsByClassName("newon")[0].style.display="inline";
	
	editlists=document.getElementsByClassName("edits");
	
	for (var i=0;i<editlists.length;i++) {
		editlists[i].style.display="block";
	}
	
	
}
		
