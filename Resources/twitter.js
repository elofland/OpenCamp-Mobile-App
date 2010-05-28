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

var scrollView = Titanium.UI.createScrollView({
	top: android ? 0 : 0,
	contentHeight:'auto',
	contentWidth:'auto',
	backgroundColor:'#13386c',
	//width:300,
	borderRadius:10
});

socWin.addEventListener('open', function()
{
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
	xhr.open('GET','http://twitter.com/statuses/user_timeline/97368313.json');
	
	//http://'+username.value+':'+password.value+'@twitter.com/statuses/friends_timeline.json?count=5');

	// send the data
	xhr.send();
});

socWin.add(scrollView);
scrollView.add(label);
