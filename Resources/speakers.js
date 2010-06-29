var spkrWin = Titanium.UI.currentWindow;

var animation = Titanium.UI.createAnimation();

// create table view data object
var tableview = Titanium.UI.createTableView({
        top:50,
        //bottom:37,
        style: Titanium.UI.iPhone.TableViewStyle.GROUPED
});

function setData() {
/*
	var buttonObjects = [
		{title:'All',width:33,enabled:true},
		{title:'WordPress', width:78},
		{title:'Drupal',width:51},
		{title:'Joomla',width:51},
		{title:'dotNet',width:51},
		{title:'Other',width:51}
	];
	
	var evtTabBar = Titanium.UI.createTabbedBar({
	    labels:buttonObjects,
	    backgroundColor:'#336699',
	    font:{fontSize:4},
	    bottom:0,
	    style:Titanium.UI.iPhone.SystemButtonStyle.BAR,
	    height:37,
	    width:320
	});
	
	spkrWin.add(evtTabBar);
	
	evtTabBar.addEventListener('click', function(e)
	{
		tableview.setData([]);
		setTimeout(function()
		{
			setData(buttonObjects[e.index].title);
		},1000);
	
	});
*/	
	//connect to database
	var db = Titanium.Database.install('opencamp_app.db','opencamp_data');
	//var db = Titanium.Database.open('opencamp_data');
		
	//run query to get dates
//	var dateRows = db.execute('select distinct date from opencamp_data order by date');
//	Titanium.API.info('dateRows: retrived from database: ' + dateRows.getRowCount());
		
	// define image mappings
			
	var images= new Array();
	images["WordPress"]="images/wp.png";
	images["Joomla"]="images/j.png";
	images["Drupal"]="images/d.png";
	images["Other"]="images/oc.png";
	images["all"]="images/oc.png";
	
		
	var data = [];
			
		
//	while (dateRows.isValidRow()) {
	    //Ti.UI.createTableViewSection({headerTitle:dateRows.fieldByName('date')});
	    //Titanium.API.info('dateCounter before = ' + dateCounter);
	    //dateCounter++;
	    //Titanium.API.info('dateCounter after = ' + dateCounter);
//	    Titanium.API.info('outer while dateRows: date: ' + dateRows.fieldByName('date'));
	    
//	    if (track && track != 'All') { 
//	    	Ti.API.info('track = "' + track + '"');
//	    	var dbQuery='select oc_key, date, starttime, duration, event_name, event_desc, track, speaker_name from opencamp_data where date="' + dateRows.fieldByName('date') + '" and track = "' + track + '" order by starttime,track';
//	    } else {
	    	//var dbQuery='select oc_key, date, starttime, duration, event_name, event_desc, track, speaker_name from opencamp_data where date="' + dateRows.fieldByName('date') + '" order by starttime,track';
//	    }
			var dbQuery='select oc_key,speaker_first_name, speaker_last_name from opencamp_data where speaker_first_name not null order by speaker_last_name';
	    //var rows = db.execute('select oc_key, date, starttime, duration, event_name, event_desc, track, speaker_name from opencamp_data where date="' + dateRows.fieldByName('date') + '"');
//	    Ti.API.info('dbQuery is "' + dbQuery + '"');
	    var rows = db.execute(dbQuery);
	    var seen=0;

/*	  
	section=Ti.UI.createTableViewSection({
			headerTitle:'Speakers',
			left:0,
			height:'auto',
			width:200	
		});
		data.push(section);
*/		

	while (rows.isValidRow()) {
		//if ( rows.fieldByName('speaker_first_name').match(/^[A-Z]/) ) {
		//if ( rows.fieldByName('speaker_first_name') ) {
		//	continue;
		//}
			/*
			if (seen == 0) {			
				Titanium.API.info('date header: ' + dateRows.fieldByName('date'));
				section=Ti.UI.createTableViewSection({
					headerTitle:dateRows.fieldByName('date'),
					left:0,
					height:'auto',
					width:200
				});
				data.push(section);
				seen=1;
			}
		   */
			var row = Ti.UI.createTableViewRow({
				height:50
			});

			//data[dateCounter].add(row);
			
		    //Titanium.API.info('track is ' + rows.fieldByName('track'));
		    //Titanium.API.info(' and image URL is ' + images[rows.fieldByName('track')]);
		    /*
			var trackBadge=Titanium.UI.createImageView({
			    url:images[rows.fieldByName('track')],
			    width:32,
			    height:32,
			    left:4,
			    top:4
			});
		    
			var eventName=Titanium.UI.createLabel({
				text:rows.fieldByName('event_name'),
				font:{fontSize:16,fontWeight:'bold'},
				width:'auto',
				textAlign:'left',
				top:2,
				left:40,
				height:19
			});
		    */
			var speakerLabel =  Titanium.UI.createLabel({
				text:rows.fieldByName('speaker_first_name') + " " + rows.fieldByName('speaker_last_name'),
				font:{fontSize:18,fontWeight:'bold'},
				width:'auto',
				textAlign:'left',
				top:0,
				left:10,
				height:50
			});
			/*
			var startTimeLabel = Titanium.UI.createLabel({
				text:rows.fieldByName('starttime'),
				font:{fontSize:12,fontWeight:'bold'},
				width:'auto',
				textAlign:'right',
				bottom:0,
				right:50,
				height:12
			});
			
			var durationLabel = Titanium.UI.createLabel({
				text:rows.fieldByName('duration'),
				font:{fontSize:12,fontWeight:'bold'},
				width:'auto',
				textAlign:'right',
				bottom:0,
				right:10,
				height:12
			});
			*/
			
			//var eventDesc=rows.fieldByName('event_desc');
		  	/*
			row.add(trackBadge);
			row.add(eventName);
			*/
			row.add(speakerLabel);
			/*
			row.add(startTimeLabel);
			row.add(durationLabel);
			
			//row.add(eventDesc);
			//row.hasChild=true;
			row.className = 'schedule row';
			row.eName = rows.fieldByName('event_name');
			//row.eDesc = rows.fieldByName('event_desc');
			//row.sName = rows.fieldByName('speaker_name');
			*/
			row.oc_key = rows.fieldByName('oc_key');
			data.push(row);
			//data[dateCounter].push(row);
			rows.next();
//		} else {
//			continue;
//		};
	}; //end main sql
		  
		/*
		dateRows.next();
		rows.close();
	}; //end date sql
		*/
	// close database
	rows.close();
	db.close();  
	
	// create table view		
	tableview.setData(data);
} //end setData function
  

	
// create table view event listener
tableview.addEventListener('click', function(e)
{	
    //alert(e.rowData.eName + " Don't touch me there!<br> " + e.rowData.eDesc);
    //alert('row ID = ' + e.rowData.oc_key);    
    var spkrDescWin = Titanium.UI.createWindow({
    	url:"speaker_desc.js",
    	backgroundColor:'#3366990',
    	title:e.rowData.eName
	});
	
	//var evtDescWVURL = 'event_desc.htm?oc_key=' + e.rowData.oc_key;
	//Titanium.App.Properties.setInt("oc_key",e.rowData.oc_key);
	//Ti.API.info('evtDescWVURL = ' + evtDescWVURL);
    /* trying to load as webview, can't seem to pass variable to it
    var evtDescWebView = Titanium.UI.createWebView({
            url:'event_desc.html',
            //url:evtDescWVURL,
            top:50
            //scalesPageToFit = false
    });
    */
   	spkrDescWin.oc_key = e.rowData.oc_key;
    
    /*
    evtDescWebView.addEventListener('load', function() {
        Ti.App.fireEvent('pageReady',{oc_key:e.rowData.oc_key});
    });
    */
	
    //spkrDescWin.oc_key = e.rowData.oc_key;
    //spkrDescWin.add(evtDescWebView);
    
    var closeBtn = Titanium.UI.createButton({
    	top:0,
    	left:10,
    	height:30,
    	width:50,
        title:'Back',
        style:Titanium.UI.iPhone.SystemButtonStyle.PLAIN
    });
    closeBtn.addEventListener('click', function(e)
        {
           Ti.API.info('about to close spkrDescWin');
           spkrDescWin.close();
        });
    
    spkrDescWin.add(closeBtn);
    
    
    //Titanium.UI.currentTab.open(spkrDescWin,{animated:true});
    spkrDescWin.open();
//        alert("Don't touch me there!");
        
});
	


// add table view to the window
Titanium.UI.currentWindow.add(tableview);
setTimeout(function()
{
	tableview.setData([]);
	setData();
},500);


//setData();

/*

var data = [
	{while (rows.isValidRow())
	{

	//html += '<div style="margin-bottom:10px;">'+rows.field(1) + '<br/
	 //>&mdash;' + rows.field(0) + '</div>';
	
	
	//{title:'Row 1', hasChild:true, color:'red', selectedColor:'#fff'},
	{title:rows.field(1), hasChild:true, selectedColor:'#6e84a2'},
	
	rows.next();
	rowCount++;
	}
	
	// close database
	rows.close();
}];


// create table view event listener
tableview.addEventListener('click', function(e){
        // event data
        var index = e.index;
        var section = e.section;
        var row = e.row;
        var rowdata = e.rowData;
        Titanium.UI.createAlertDialog({title:'Table View',message:'row ' + row + ' index ' + index + ' section ' + section  + ' row data ' + rowdata}).show();
});

*/

/*
var data = [];

var xhr = Ti.Network.createHTTPClient();
//xhr.open("GET","http://v2.0.news.tmg.s3.amazonaws.com/feeds/news.xml");
//xhr.open("GET","http://openca.mp/feed/rss/");
xhr.open("GET","http://news.bbc.co.uk/rss/newsonline_uk_edition/front_page/rss091.xml");
//xhr.open("GET","http://v2.0.news.tmg.s3.amazonaws.com/feeds/news.xml");

xhr.onload = function()
{
	try
	{
		var doc = this.responseXML.documentElement;
		var items = doc.getElementsByTagName("item");
		var x = 0;
		var doctitle = doc.evaluate("//channel/title/text()").item(0).nodeValue;
		for (var c=0;c<items.length;c++)
		{
			var item = items.item(c);
			var thumbnails = item.getElementsByTagName("media:thumbnail");
			if (thumbnails && thumbnails.length > 0)
			{
				var media = thumbnails.item(0).getAttribute("url");
				var title = item.getElementsByTagName("title").item(0).text;
				var row = Ti.UI.createTableViewRow({height:80});
				var label = Ti.UI.createLabel({
					text:title,
					left:72,
					top:5,
					bottom:5,
					right:5
				});
				row.add(label);
				var img = Ti.UI.createImageView({
					url:media,
					left:5,
					height:60,
					width:60
				});
				row.add(img);
				data[x++] = row;
				row.url = item.getElementsByTagName("link").item(0).text;
			}
		}
		var tableview = Titanium.UI.createTableView({
		   top:45,
		   bottom:25,
		   data:data
		});
		Titanium.UI.currentWindow.add(tableview);
		tableview.addEventListener('click',function(e)
		{
			var w = Ti.UI.createWindow({title:doctitle});
			var wb = Ti.UI.createWebView({url:e.row.url});
			w.add(wb);
//			var b = Titanium.UI.createButton({
//				title:'Close',
				//style:Titanium.UI.iPhone.SystemButtonStyle.PLAIN
//				style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED
//		    });
//			w.setLeftNavButton(b);
//			b.addEventListener('click',function()
//			{
//				w.close();
//			}); 
		w.open({modal:true});
		});
	}
	catch(E)
	{
		alert(E);
	}
};
xhr.send();

*/