function scrollToTop()
{
	window.scrollTo({
	 top: 0,
	 left: 0,
	 behavior: 'smooth'
	});
}

function clearSearch()
{
	var i, targetName, baseName = '_sidebars_xxx_quicksearch_', fieldNames = [];
	fieldNames.push('emailAddress');
	fieldNames.push('firstName');
	fieldNames.push('middleName');
	fieldNames.push('lastName');
	fieldNames.push('phone');
	for(i=0;i<fieldNames.length;i++)
	{
	document.getElementsByName(baseName+fieldNames[i])[1].value = ''; 
	}
}

function searchCandidate(emailAddress,reqNumber)
{
	var isGearCardOpen = (document.getElementById('action_popup_div').style.display=='inline') ? true : false;
	if(isGearCardOpen){action_popup_close(); isGearCardOpen=!isGearCardOpen;}

	var isPanelOpen = ((document.getElementById('Site_pageMask').style.display=='inline') ? (true) : (false));
	if(isPanelOpen){document.getElementsByName('__cancel_button')[0].click(); isPanelOpen=!isPanelOpen;}
	
	if(reqNumber)
	{
		var _elem, _id='targetreq';
		_elem = document.getElementById(_id);
		if(!_elem)
		{
			var _new = document.createElement('textarea');
			_new.id = _id;
			_new.style.display = 'none';
			document.body.appendChild(_new);
		}
		document.getElementById(_id).value = reqNumber;		
	}
	
	clearSearch();

	scrollToTop();

	document.querySelectorAll('input.portal-input[name*=emailAddress')[0].value = emailAddress;
	sidebars_xxx_quicksearch_go();
	setTimeout(clickGear,800);
}

function clickGear(x){
	if(!x && x!=0){x=0;}
	var searchResults = document.querySelectorAll('#sidebars_yyy_quicksearch_results button');
	var noResults = document.querySelectorAll('div[id$="quicksearch_results"] img[src^="info.dbrez"]').length;
	if(noResults){alert('No results found.'); return;}
	if(searchResults.length>0){searchResults[x].click(); setTimeout(navCard,500);}
	else{setTimeout(clickGear,300);}
}

function navCard()
{
	if (document.getElementById('action_popup_div').style.display=='none'){setTimeout(navCard,300);}
	
	var reqs = document.querySelectorAll('input[name="_action_popup_reqID"]');
	if(reqs.length>1)
	{
		var targetobj = document.getElementById('targetreq');
		var targetreq = ((targetobj) ? (targetobj.value) : (0))
		if (document.getElementById('action_popup_div').style.display=='none'){setTimeout(navCard,300);}
		var i, reqTitle, reqLocations=[], reqNumbers=[];
		for(i=0;i<reqs.length;i++)
		{
			reqTitle = reqs[i].parentElement.parentElement.parentElement.querySelector('a.editlink').innerText;
			reqNumbers.push(reqTitle.split('-')[0].trim());
			reqLocations.push(reqTitle.split('-')[2].trim());
		}
		i = ((targetreq) ? (reqNumbers.indexOf(targetreq)) : (0));
		reqs[i].click();
		setTimeout(navCard,300);
	}
	
	else
	{
		var ResReview = document.querySelector('div > a[href*="action_resreview"]');
		if(!ResReview){setTimeout(navCard,300);}
		ResReview.click();
		setTimeout(changeTitle,500);
	}
}

function changeTitle()
{
	var panelTitle = document.querySelector('table.controlpanel span.h1 > span.h1'),
	pageCursor = document.body.style.cursor,
	panelDisplay = document.getElementById('Site_pageMask').style.display;

	if(panelTitle && pageCursor=='default' && panelDisplay=='inline')
	{
		setTimeout(function(){document.title = document.title.slice(7).concat(' - Resume Review');},800);;
		document.getElementById('__cancel_button').addEventListener('click',revertTitle);
	}
	else{setTimeout(changeTitle,500);}
}

function revertTitle()
    {
        document.title = 'RightThingRecruit - Gateway';
    }

/*	
	Version Control

	1.0.2
	- Added version control at bottom of code
	- Added [revertTitle] function hat just reverts title to ~"RTR Gateway"
	- Added click event to cancel button to trigger [revertTitle]
*/
