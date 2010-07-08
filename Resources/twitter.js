var socWin = Titanium.UI.currentWindow;

var animation = Titanium.UI.createAnimation();

var android = Ti.Platform.name == 'android';

// create table view data object
var tableview = Titanium.UI.createTableView({
        top:50,
        bottom:37
});

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

var closeBtn = Titanium.UI.createButton({
	top:5,
	left:10,
	height:40,
	width:50,
    title:'Back',
    style:Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
    backgroundColor:'#3366990',
    borderRadius:10
});
closeBtn.addEventListener('click', function()
    {
       socWin.close();
    });

socWin.add(closeBtn);

function getData(twitterURL) {
	var data=[];
		
	if (typeof(twitterURL) == 'undefined') {
		twitterURL='http://api.twitter.com/1/statuses/user_timeline.json?screen_name=ocdfw';
	}			

	var xhr = Titanium.Network.createHTTPClient();
	xhr.onerror = function(e)
	{
		alert("ERROR " + e.error);
	};
	xhr.onload = function()
	{
		var resp =  eval('('+this.responseText+')');
		for (var i=0;i<resp.length;i++)
		{
			var row = Ti.UI.createTableViewRow({
				height:'auto'
			});
			
			// stripy table effect
			if (i % 2 !== 0) {
				row.backgroundColor = '#DDDDDD';
			}
				
			var tweeterLabel=Titanium.UI.createLabel({
				text:resp[i].user.name,
				font:{fontSize:16,fontWeight:'bold'},
				top:0,
				left:10,
				right:10,
				height:20,
				textAlign:'left'
			});
			
			var tweetLabel=Titanium.UI.createLabel({
				text:resp[i].text,
				font:{fontSize:16},
				top:20,
				left:10,
				right:10,
				height:'auto',
				textAlign:'left'
			});
		row.add(tweeterLabel);
		row.add(tweetLabel);
		row.className = 'twitter row';
		data.push(row);
		}
	tableview.setData(data);
	};

	
	// open the client
	xhr.open('GET',twitterURL);

	// send the data
	xhr.send();
	//});
}; //end getData function


var buttonObjects = [
	{title:'OpenCamp',width:79,enabled:true,twitterURL:'http://api.twitter.com/1/statuses/user_timeline.json?screen_name=ocdfw'},
	{title:'Committee', width:79,twitterURL:'http://api.twitter.com/1/ocdfw/lists/opencamp-committee/statuses.json?per_page=5'},
	{title:'Attendees',width:79,twitterURL:'http://api.twitter.com/1/ocdfw/lists/opencamp-attendees/statuses.json?per_page=5'},
	{title:'Sponsors',width:80,twitterURL:'http://api.twitter.com/1/ocdfw/lists/opencamp-sponsors/statuses.json?per_page=5'}
];

var socTabBar = Titanium.UI.createTabbedBar({
    labels:buttonObjects,
    backgroundColor:'#336699',
    font:{fontSize:4},
    bottom:-2,
    style:Titanium.UI.iPhone.SystemButtonStyle.BAR,
    height:37,
    width:320,
    index:0
});

socWin.add(socTabBar);

socTabBar.addEventListener('click', function(e)
{
	twitterURL=	buttonObjects[e.index].twitterURL;
	tableview.setData([]);
	setTimeout(function()
	{
		getData(twitterURL);
	},500);
});

//socWin.add(scrollView);
Titanium.UI.currentWindow.add(tableview);
tableview.setData([]);
setTimeout(function()
{
	getData();
},500);