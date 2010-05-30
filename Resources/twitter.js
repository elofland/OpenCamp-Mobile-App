var socWin = Titanium.UI.currentWindow;

var android = Ti.Platform.name == 'android';
/*
var button = Titanium.UI.createButton({
	title:'Get Status',
	top: android ? 120 : 100,
	width:300,
	height: android ? 45 : 40
});
win.add(button);
*/
var statusLabel = Titanium.UI.createLabel({
	font:{fontSize:18},
	color:'white',
	width:250,
	height:'auto',
	top:20,
	text:'',
	textAlign:'center'
});

var label = Titanium.UI.createLabel({
	text:'No status',
	font:{fontSize:18},
	color:'white',
	width:250,
	height:'auto',
	textAlign:'center'
});

var backBtn = Titanium.UI.createButton({title:'Back'});
socWin.leftNavButton = backBtn;


var scrollView = Titanium.UI.createScrollView({
	top: android ? 45 : 45,
	bottom:25,
	contentHeight:'auto',
	contentWidth:'auto',
	backgroundColor:'#13386c'
	//width:300,
	//borderRadius:10
});

var socButtonBar = Titanium.UI.createButtonBar({
    labels:['OCDFW', 'Committee', 'Attendees', 'Sponsors'],
    //backgroundColor:'#336699',
    backgroundColor:'#13386c',
    bottom:0,
    style:Titanium.UI.iPhone.SystemButtonStyle.BAR.BORDERED,
	//width:auto,
    height:25
    //font:{fontSize:10}
    //width:200
});

var twitterURL = 'http://twitter.com/statuses/user_timeline/97368313.json';
socButtonBar.addEventListener('click', function(e)
   {
		if (e.index == 0)
		{
			Titanium.API.log('OCDFW');
			twitterURL = 'http://twitter.com/statuses/user_timeline/97368313.json';		
		}
		else if (e.index == 1)
		{
			twitterURL = 'http://api.twitter.com/1/ocdfw/lists/10172378/statuses.json';
			Titanium.API.log('Committee');
		}
		else if (e.index == 2)
		{
			twitterURL = 'http://api.twitter.com/1/ocdfw/lists/10433942/statuses.json';
			Titanium.API.log('Attendees');
		}
		else if (e.index == 3)
		{
			twitterURL = 'http://api.twitter.com/1/ocdfw/lists/10433923/statuses.json';
			Titanium.API.log('Sponsors');
		}
    });
	socWin.add(socButtonBar);
    

socWin.addEventListener('open', function()
{
    Titanium.API.info('++++++++ open: twitterURL is ' + twitterURL);

	var xhr = Titanium.Network.createHTTPClient();
	xhr.onerror = function(e)
	{
		alert("ERROR " + e.error);
	};
	xhr.onload = function()
	{
		label.hide();
		var resp =  eval('('+this.responseText+')');
		for (var i=0;i<resp.length;i++)
		{
			statusLabel.text += resp[i].user.name + '\n' + resp[i].text + '\n\n';

		}
		scrollView.add(statusLabel);
	};
	// open the client
	//xhr.open('GET','http://twitter.com/statuses/user_timeline/97368313.json');
	
	//xhr.open('GET','http://api.twitter.com/1/ocdfw/lists/10172378/statuses.json');
	xhr.open('GET',twitterURL);
	//http://'+username.value+':'+password.value+'@twitter.com/statuses/friends_timeline.json?count=5');

	// send the data
	xhr.send();
});

socButtonBar.addEventListener('click', function()
{
    Titanium.API.info('++++++++ click: twitterURL is ' + twitterURL);
	var xhr = Titanium.Network.createHTTPClient();
	xhr.onerror = function(e)
	{
		alert("ERROR " + e.error);
		//Titanium.API.error("ERROR " + e.error);
		
	};
	xhr.onload = function()
	{
		label.hide();
		var resp =  eval('('+this.responseText+')');
		for (var i=0;i<resp.length;i++)
		{
			statusLabel.text += resp[i].user.name + '\n' + resp[i].text + '\n\n';

		}
		scrollView.add(statusLabel);
	};
	// open the client
	Titanium.API.info("++++++++ click: trying open " + twitterURL);
	xhr.open('GET',twitterURL);
	//Ti.App.fireEvent('reload');
	
	//http://'+username.value+':'+password.value+'@twitter.com/statuses/friends_timeline.json?count=5');

	// send the data
	Titanium.API.info("++++++++ click: trying send " + twitterURL);
	xhr.send();
	//Ti.App.fireEvent('reload');
	
});


socWin.add(scrollView);
//scrollView.add(label);
