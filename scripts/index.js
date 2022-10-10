/**
* @Collections of this Kind
* All code not attributed, 
* Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License. 
* http://creativecommons.org/licenses/by-nc-sa/4.0/
*
* Code for pages showing indexes for blogs, lists, etc. 
* Includes legacy code for fisheye list, but this isn't currently used.
*/


/**
* Code to utilize an index page for a blog that includes a 
* fish-eye blog list (see also CSS for additional code smoothing transitions) 
* and ordering by various attributes.
*/
var themeLinks="";
var themes=[""];
var themeNumbers=[""];
var keydateLinks="";
var postdateLinks="";
var editdateLinks="";
var links="";


/**
* Builds initial list. As all links are plain in the HTML, this goes 
* through and builds the list with some details below each link. The 
* details are drawn from the ID of a succession of nested spans:
* &lt;span class='theme' id='c'&gt;
* &lt;span class='keydate' id='20150101'&gt;
* &lt;span class='postdate' id='20150102'&gt;
* &lt;span class='editdate' id='20150103'&gt;
* &lt;A href=""&gt;link text&lt;/A&gt;
* &lt;/span&gt;
* &lt;/span&gt; 
* &lt;/span&gt; 
* &lt;/span&gt;
* Is converted to:
* link text
* Posted: 03-Jan-2015; Edited: 01-Jan-2015; Dated: 02-Jan-2015; Theme: c
* Only really satisfactory if you only make one 
* unique date, as IDs should be unique, but doesn't break anything other than the 
* HTML standard. Would be better with a bespoke attribute, when these have bedded in.
*/
function initialize()
{
	// Find all post links.
	keydateLinks=document.getElementsByClassName("anchor");
	var listLinksArray=[];
	
	// Get any marginalia and the footer so we can add them back 
	// after rebuilding the page.
	var marginalia=document.getElementsByClassName("marginalia");
	var footer=document.getElementsByClassName("footer");
	var foot=footer[0].innerHTML; // Used because footer altered by the code below before innerHTML used.
	var title=document.getElementsByClassName("top");
	
	// Construct array of links for sorting.
	for (var i=0;i<keydateLinks.length;i++)
	{   
		listLinksArray.push(keydateLinks[i]);
	} 
	
	// Add fisheye hover event listeners.
	var theme=document.getElementsByClassName("theme");

	// Uncomment to fisheye.
	//for (var i=0;i<theme.length;i++)
	//{   
		//theme[i].setAttribute("onmouseover", "fisheye(this)");
		//theme[i].setAttribute("onmouseout", "unfisheye(this)"); 
	//} 
	
	// Start constructing link list.
	var postSpace=document.getElementsByClassName("postsection")[0];
	postSpace.innerHTML="<DIV class=marginalia>" + marginalia[0].innerHTML + "</DIV>" + "<h2 class=top>" + title[0].innerHTML + "</h2>";

	// Add list components.
	for (var i=0;i<listLinksArray.length;i++)
	{  	
		var keydate=listLinksArray[i].getElementsByClassName("keydate")[0]; 
		keydate=keydate.getAttribute("id");
		keydate=parseDate(String(keydate));
		
		var posted=listLinksArray[i].getElementsByClassName("postdate")[0]; 
		posted=posted.getAttribute("id");
		posted=parseDate(String(posted));
		
		var editdate=listLinksArray[i].getElementsByClassName("editdate")[0]; 
		editdate=editdate.getAttribute("id");
		editdate=parseDate(String(editdate));
		
		var theme=listLinksArray[i].getElementsByClassName("theme")[0];
		theme=theme.getAttribute("id");		
		
		postSpace.innerHTML=postSpace.innerHTML + "<P class='anchor'>" + listLinksArray[i].innerHTML + "<br />"  + 
			"<span class=details>Posted: " + posted + "; Edited: " + editdate + "; Dated: " + keydate + "; Theme: " + theme + "</span></P>";
	} 

	// End of page.
	postSpace.innerHTML=postSpace.innerHTML + "<DIV class=footer>" + foot + "</DIV></DIV></DIV></BODY></HTML>";
}


/**
* Order by theme.
*/
function byTheme()
{
	order("theme");
}

/**
* Order by key date.
*/
function byKeydate()
{
	order("keydate");
}


/**
* Order by post date.
*/
function byPostdate()
{
	order("postdate");
}


/**
* Order by edit date.
*/
function byEditdate()
{
	order("editdate");
}


/**
* Order by generic order method.
* Based on:
* http://stackoverflow.com/questions/4760080/how-can-i-reorder-sort-a-nodelist-in-javascript
* http://stackoverflow.com/questions/282670/easiest-way-to-sort-dom-nodes
* http://stackoverflow.com/questions/5285995/how-do-you-sort-letters-in-javascript-with-capital-and-lowercase-letters-combin
* Otherwise works as for initialize.
*/
function order(searchtype)
{
	keydateLinks=document.getElementsByClassName("anchor");
	var listLinksArray=[];
		
	var marginalia=document.getElementsByClassName("marginalia");
	var title=document.getElementsByClassName("top");
	var footer=document.getElementsByClassName("footer");
	var foot=footer[0].innerHTML;

	
	for (var i=0;i<keydateLinks.length;i++)
	{   
		listLinksArray.push(keydateLinks[i]);
	} 
	
	// Code developed from websites above.
	listLinksArray.sort(function(a,b)
	{
		var one=a.getElementsByClassName(searchtype);
		var two=b.getElementsByClassName(searchtype);
		
		var aCat=Number(one[0].getAttribute("id"));
		var bCat=Number(two[0].getAttribute("id"));
		
		
		if (isNaN(aCat))
		{
			return one[0].getAttribute("id").toLowerCase().localeCompare(two[0].getAttribute("id").toLowerCase());
		}

		if (aCat < bCat) return 1;
		if (aCat > bCat) return -1;
		return 0;
	});
	// End of derived code.
	
	var postSpace=document.getElementsByClassName("postsection")[0];
	postSpace.innerHTML="<DIV class=marginalia>" + marginalia[0].innerHTML + "</DIV>" + "<h2 class=top>" + title[0].innerHTML + "</h2>";;
	
	for (var i=0;i<listLinksArray.length;i++)
	{  	
		var keydate=listLinksArray[i].getElementsByClassName("keydate")[0]; 
		keydate=keydate.getAttribute("id");
		keydate=parseDate(String(keydate));
		
		var posted=listLinksArray[i].getElementsByClassName("postdate")[0]; 
		posted=posted.getAttribute("id");
		posted=parseDate(String(posted));
		
		var editdate=listLinksArray[i].getElementsByClassName("editdate")[0]; 
		editdate=editdate.getAttribute("id");
		editdate=parseDate(String(editdate));
		
		postSpace.innerHTML=postSpace.innerHTML + "<P class='anchor'>" + listLinksArray[i].innerHTML + "</P>" ;
	} 
	
	// End of page.
	postSpace.innerHTML=postSpace.innerHTML + "<DIV class=footer>" + foot + "</DIV></DIV></DIV></BODY></HTML>";
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
    case 11:
        monthstr="-Nov-";
        break;
    case 12:
        monthstr="-Dec-";
        break;
	default:
        monthstr="-???-";
	} 
	
	return day + monthstr + year;
}


/**
* Implements a fisheye menu for link list. Expands mouseover link, and links on either 
* side by changing CSS class. Note that if you use transitions in CSS, this smooths the 
* change.
*/
function fisheye (ob)
{
	// First, unfisheye all links.
		
	var links=document.getElementsByClassName("thememid");
	
	var i;
	for (i=0;i<links.length;i++)
	{
		links[i].className="theme";
		i--;
	}
	
	links=document.getElementsByClassName("themebig");

	for (i=0;i<links.length;i++)
	{
		links[i].className="theme";
	}
	
	// Fisheye the link passed in and those either side, if they exist. 
	links=document.getElementsByClassName("theme");

	for (var j=0;j<links.length;j++)
	{
		if (links[j] === ob)
		{ 
			ob.className="themebig" 
			// This mutates the list, so the next is j, rather than j + 1.
			if (j<links.length) links[j].className="thememid"; 
			if (j>0) links[j - 1].className="thememid"; 
		}
	}
}


/**
* Unfisheye, for mouse out where the user isn't mousing down the list.
*/
function unfisheye (ob)
{
	var links=document.getElementsByClassName("thememid");
	
	var i;
	for (i=0;i<links.length;i++)
	{
		links[i].className="theme";
		i--;
	}
	
	links=document.getElementsByClassName("themebig");

	for (i=0;i<links.length;i++)
	{
		links[i].className="theme";
	}	
}
	
		
