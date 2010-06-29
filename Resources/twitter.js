var socWin = Titanium.UI.currentWindow;

var animation = Titanium.UI.createAnimation();

var android = Ti.Platform.name == 'android';

// create table view data object
var tableview = Titanium.UI.createTableView({
        top:50,
        bottom:37
        //style: Titanium.UI.iPhone.TableViewStyle.GROUPED
});

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

var closeBtn = Titanium.UI.createButton({
	top:0,
	left:10,
	height:50,
	title:'Close',
	//zIndex:2,
	style:Titanium.UI.iPhone.SystemButtonStyle.PLAIN
});

closeBtn.addEventListener('click', function() 
{
	socWin.close(animation);
});

socWin.add(closeBtn);


/*
var scrollView = Titanium.UI.createScrollView({
	top: android ? 45 : 45,
	bottom:25,
	contentHeight:'auto',
	contentWidth:'auto',
	backgroundColor:'#13386c'
	//width:300,
	//borderRadius:10
});
*/
/*
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
*/
/*
var buttonObjects = [
	{title:'OCDFW',width:33,enabled:true},
	{title:'Committee', width:78},
	{title:'Attendees',width:51},
	{title:'Sponsors',width:51}
];
*/


function getData(twitterURL) {
		var data=[];
		
//	socWin.addEventListener('open', function() 
//	{
		if (typeof(twitterURL) == 'undefined') {
			twitterURL='http://api.twitter.com/1/statuses/user_timeline.json?screen_name=ocdfw';
		}			

	    Titanium.API.info('++++++++ getData: twitterURL is ' + twitterURL);
	
		var xhr = Titanium.Network.createHTTPClient();
		xhr.onerror = function(e)
		{
			alert("ERROR " + e.error);
		};
		xhr.onload = function()
		{
			//label.hide();
			var resp =  eval('('+this.responseText+')');
			Ti.API.info('++++++++ getData response length: ' + resp.length);
			for (var i=0;i<resp.length;i++)
			{
				var row = Ti.UI.createTableViewRow({
					height:'auto'
					//borderColor:'black',
					//borderWidth:2,
					//borderRadius:5
				});
				
				// stripy table effect
				if (i % 2 !== 0) {
					row.backgroundColor = '#DDDDDD';
				}
			
//				statusLabel.text += resp[i].user.name + '\n' + resp[i].text + '\n\n';
				
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
					//text:resp[i].user.name + '\n' + resp[i].text,
					text:resp[i].text,
					//font:{fontSize:16,fontWeight:'bold'},
					font:{fontSize:16},
					top:20,
					left:10,
					right:10,
					//height:'110',	
					//contentHeight:'auto',
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
		//xhr.open('GET','http://twitter.com/statuses/user_timeline/97368313.json');
		
		//xhr.open('GET','http://api.twitter.com/1/ocdfw/lists/10172378/statuses.json');
		xhr.open('GET',twitterURL);
		//http://'+username.value+':'+password.value+'@twitter.com/statuses/friends_timeline.json?count=5');
	
		// send the data
		xhr.send();
	//});
}; //end getData function


var buttonObjects = [
	{title:'OCDFW',width:80,enabled:true,twitterURL:'http://api.twitter.com/1/statuses/user_timeline.json?screen_name=ocdfw'},
	{title:'Committee', width:80,twitterURL:'http://api.twitter.com/1/ocdfw/lists/opencamp-committee/statuses.json?per_page=5'},
	{title:'Attendees',width:80,twitterURL:'http://api.twitter.com/1/ocdfw/lists/opencamp-attendees/statuses.json?per_page=5'},
	{title:'Sponsors',width:80,twitterURL:'http://api.twitter.com/1/ocdfw/lists/opencamp-sponsors/statuses.json?per_page=5'}
];

var socTabBar = Titanium.UI.createTabbedBar({
    labels:buttonObjects,
    backgroundColor:'#336699',
    font:{fontSize:4},
    bottom:0,
    style:Titanium.UI.iPhone.SystemButtonStyle.BAR,
    height:37,
    width:320,
    index:0
});

socWin.add(socTabBar);

socTabBar.addEventListener('click', function(e)
{
	Ti.API.info('tabBar listener invoked with ' + buttonObjects[e.index].twitterURL);
	//tableview.setData([]);
//	setTimeout(function()
//	{
//		getData(buttonObjects[e.index].twitterURL);
//	},1000);
//		if (typeof(twitterURL) == 'undefined') {
//			twitterURL='http://api.twitter.com/1/statuses/user_timeline.json?screen_name=ocdfw';
//		} else {
			twitterURL=	buttonObjects[e.index].twitterURL;
//		}
			tableview.setData([]);
			setTimeout(function()
			{
				getData(twitterURL);
			},500);
			

/*
	    Titanium.API.info('++++++++ open: twitterURL is ' + twitterURL);
	
		var xhr = Titanium.Network.createHTTPClient();
		xhr.onerror = function(e)
		{
			alert("ERROR " + e.error);
		};
		xhr.onload = function()
		{
			//label.hide();
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
*/

});


/*
var twitterURL = 'http://api.twitter.com/1/statuses/user_timeline.json?screen_name=ocdfw';
socButtonBar.addEventListener('click', function(e)
   {
		if (e.index == 0)
		{
			Titanium.API.log('OCDFW');
			twitterURL = 'http://twitter.com/statuses/user_timeline/97368313.json?count=10';		
		}
		else if (e.index == 1)
		{
			//twitterURL = 'http://api.twitter.com/1/ocdfw/lists/10172378/statuses.json?count=10';
			twitterURL = 'http://api.twitter.com/1/ocdfw/lists/opencamp-committee/statuses.xml?per_page=5';
			Titanium.API.log('Committee');
			getData(twitterURL);
		}
		else if (e.index == 2)
		{
			//twitterURL = 'http://api.twitter.com/1/ocdfw/lists/10433942/statuses.json?count=10';
			twitterURL = 'http://api.twitter.com/1/ocdfw/lists/opencamp-attendees/statuses.xml?per_page=5';
			Titanium.API.log('Attendees');
		}
		else if (e.index == 3)
		{
			//twitterURL = 'http://api.twitter.com/1/ocdfw/lists/10433923/statuses.json?count=10';
			twitterURL = 'http://api.twitter.com/1/ocdfw/lists/opencamp-sponsors/statuses.xml?per_page=5';
			Titanium.API.log('Sponsors');
		}
    });
	socWin.add(socButtonBar);
*/    

/*
It seems the response from twitter on the request below is taking too long, need to figure out how to limit the return set
*/



/*
socWin.addEventListener('click', function()
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
*/

//socWin.add(scrollView);
Titanium.UI.currentWindow.add(tableview);
tableview.setData([]);
setTimeout(function()
{
	getData();
},500);



//setTimeout(function()
//{
	//tableview.setData([]);
//	getData();
//},500);
//scrollView.add(label);
