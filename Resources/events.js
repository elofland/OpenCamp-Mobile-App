/*
var header = Ti.UI.createView({
        backgroundColor:'#111',
        height:20
});
*/

// create table view data object

var evtWin = Titanium.UI.currentWindow;

var animation = Titanium.UI.createAnimation();

var evtButtonBar = Titanium.UI.createButtonBar({
    labels:['All', 'WordPress', 'Drupal', 'Joomla','Other'],
    //backgroundColor:'#336699',
    backgroundColor:'#13386c',
    bottom:0,
    style:Titanium.UI.iPhone.SystemButtonStyle.BAR.BORDERED,
	//width:auto,
    height:25
    //font:{fontSize:10}
    //width:200
});

evtWin.add(evtButtonBar);

// create table view
var tableview = Titanium.UI.createTableView({
        top:50,
        bottom:25
});


//connect to database
var db = Titanium.Database.install('opencamp_app.db','opencamp_data');

//run query
var rows = db.execute('select date, event_name, event_desc, track, speaker_name from opencamp_data');


Titanium.API.info('retrived from database: ' + rows.getRowCount());

// define image mappings
var images= new Array();
images["WordPress"]="images/wp.png";
images["Joomla"]="images/j.png";
images["Drupal"]="images/d.png";
images["other"]="images/oc.png";
images["all"]="images/oc.png";

var data = [];
Titanium.API.info('getting ready to seed data for table rows');

/*
while (rows.isValidRow())
{
	data.push({title:rows.field(1),hasChild:true,test:'maps.js'});
}
*/

while (rows.isValidRow()) {
  //if ((car_type=="cool") || (car_type=="family") || (car_type=="big"))
  //  alert("I think you should get a(n) "+my_cars[car_type]+".");
   
	var row = Ti.UI.createTableViewRow({height:40});
    Titanium.API.info('track is ' + rows.fieldByName('track'));
    Titanium.API.info(' and image URL is ' + images[rows.fieldByName('track')]);
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
		height:16
	});
  
	var speakerLabel =  Titanium.UI.createLabel({
		text:rows.fieldByName('speaker_name'),
		font:{fontSize:12,fontWeight:'bold'},
		width:'auto',
		textAlign:'left',
		bottom:0,
		left:60,
		height:12
	});
  
  row.add(trackBadge);
  row.add(eventName);
  row.add(speakerLabel);
  row.hasChild=true;
  row.className = 'schedule row';
  
  data.push(row);
  rows.next();
  
  
};
  /*
  data.push({
    title: rows.fieldByName('event_name'),
    fontSize:16,
    fontFamily:'Marker Felt',
    id: rows.field(0)
  });
        rows.next();
}
//rows.close();
*/
// create table view

tableview.setData(data);

/*
var tableview = Titanium.UI.createTableView({
        data:data,
        top:50,
        bottom:25
});
*/


// create table view event listener
tableview.addEventListener('click', function(e)
{
        if (e.rowData.test)
        {
                var win = Titanium.UI.createWindow({
                        url:e.rowData.test,
                        title:e.rowData.title
                });
                Titanium.UI.currentTab.open(win,{animated:true});
        }
});

// close database
rows.close();
db.close();  
// add table view to the window
Titanium.UI.currentWindow.add(tableview);


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