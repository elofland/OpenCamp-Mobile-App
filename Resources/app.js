// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#FFFFFF');
var animation = Titanium.UI.createAnimation();
Ti.API.info('==== entry point');
var splashWin = Titanium.UI.createWindow({  
    title:'OpenCamp',
	backgroundImage:'images/OpenCamp_splash2.png',
    fullscreen:1,
    backgroundColor:'#FFFFFF'
});
//  CREATE CUSTOM LOADING INDICATOR
//
var indWin = null;
var actInd = null;
function showIndicator()
{
        // window container
        indWin = Titanium.UI.createWindow({
        		top:92,
        		left:89,
                height:150,
                width:150,
                zIndex:10
        });

        // black view
        var indView = Titanium.UI.createView({
                height:150,
                width:150,
                backgroundColor:'#000',
				borderRadius:75,
                opacity:0.8
        });
        indWin.add(indView);

        // loading indicator
        actInd = Titanium.UI.createActivityIndicator({
                style:Titanium.UI.iPhone.ActivityIndicatorStyle.BIG,
                height:50,
                width:50,
                top:20
        });
        indWin.add(actInd);

        // message
        var message = Titanium.UI.createLabel({
                text:'Retrieving Latest Data',
                color:'#fff',
                width:'auto',
                height:'auto',
                textAlign:'center',
                font:{fontSize:20,fontWeight:'bold'},
                bottom:30
        });
        indWin.add(message);
        indWin.open();
        actInd.show();
        Titanium.UI.currentWindow.add(indWin);

};

function hideIndicator()
{
        actInd.hide();
        indWin.close({opacity:0,duration:1000});
};

//
// Add global event handlers to hide/show custom indicator
//
Titanium.App.addEventListener('show_indicator', function(e)
{
        Ti.API.info("IN SHOW INDICATOR");
        showIndicator();
});
Titanium.App.addEventListener('hide_indicator', function(e)
{
        Ti.API.info("IN HIDE INDICATOR");
        hideIndicator();
});

//
//  create event to fire after loading
//

//splashWin.addEventListener('open', function()
//{
	// fire off data loading
//	Ti.include("data.js");
//});

//splashWin.addEventListener('close', function()
//{
//	alert('data updated and the parent windows has closed');
//});

if(Titanium.Network.online)
{
	Ti.API.info('+++  We have network!');
	//Ti.include('checkForUpdate.js');
		var db_update = Titanium.Database.install('opencamp_app.db','app');
	
		dbQuery='select data_last_update from app';
		rows = db_update.execute(dbQuery);
		
		while (rows.isValidRow()) {
			var lastUpdate = rows.fieldByName('data_last_update');
			rows.next();
		}
		db_update.close;
		Ti.API.info('data last update: ' + lastUpdate);
		
		//var xhr = [];
		var xhr = Ti.Network.createHTTPClient();
		xhr.open("GET","http://openca.mp/xml/calendar-last-modified/?key=nQcarG4jg9Nh");
		xhr.onload = function()
		{
			try
			{
			Ti.API.info('attempting to get latest update time from server');
			var doc = this.responseXML.documentElement;
			
			var update = doc.getElementsByTagName("last_updated");
	
			var currentLastUpdate = update.item(0).text;
			Ti.API.info('currentLastUpdated is "' + currentLastUpdate + '"');
			
			if ( lastUpdate >= currentLastUpdate ) 
			{
				Ti.API.info('You have the latest data!  See: ' + lastUpdate + ' >= ' + currentLastUpdate);
				Ti.include('main.js');
			} else {
				Ti.API.info('Uh oh!  You need to update your data! See: ' + lastUpdate + ' < ' + currentLastUpdate);
				splashWin.currentLastUpdate = currentLastUpdate;
				splashWin.open({
//					opacity:0
					transition:Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_RIGHT
					
				});
//				splashWin.animate({opacity:1,duration:1800});				
				Ti.include('data.js');
			}
	
			}
			catch(E)
			{
				alert('Unable to retrieve data from openca.mp site, please try again later');
			}
			
		};
			//httpClient.send();
			
		xhr.onerror = function(e)
		{
			alert('Unable to retrieve data, please try again later cp2');
		};
		xhr.send();	
	
} 
	else if (Titanium.Network.online && Titanium.Network.networkTypeName !== 'wifi' && Titanium.Network.networkTypeName !== 'lan')
{
	alert("The data currently on this device looks like it’s out of date and we require wifi access to update. Please relaunch the app when you have a WiFi connection to automatically download the most current content.");
	Ti.include("main.js");
} else {
	alert("The data currently on this device looks like it’s out of date. Some parts of this application, such as the Twitter feeds and the OpenCa.mp blog, require network connectivity to refresh.\n\nPlease relaunch the app when you have a WiFi connection to automatically download the most current content.")
	Ti.include("main.js");
}

//splashWin.open({
//	opacity:0
//});
//splashWin.animate({opacity:1,duration:1800});