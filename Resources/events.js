var evtWin = Titanium.UI.currentWindow;

var animation = Titanium.UI.createAnimation();

// create table view data object
var tableview = Titanium.UI.createTableView({
        top:50,
        bottom:37,
        style: Titanium.UI.iPhone.TableViewStyle.GROUPED,
        backgroundColor:'#FFFFFF'
});

function setData(track) {

	var buttonObjects = [
		{title:'All',width:33,enabled:true},
		{title:'WordPress', width:78},
		{title:'Drupal',width:51},
		{title:'Joomla',width:51},
		{title:'.NET',width:51},
		{title:'Other',width:51}
	];
	
	var evtTabBar = Titanium.UI.createTabbedBar({
	    labels:buttonObjects,
	    backgroundColor:'#336699',
	    font:{fontSize:4},
	    bottom:-2,
	    style:Titanium.UI.iPhone.SystemButtonStyle.BAR,
	    height:37,
	    width:320
	});
	
	evtWin.add(evtTabBar);
	
	evtTabBar.addEventListener('click', function(e)
	{
		tableview.setData([]);
		setTimeout(function()
		{
			setData(buttonObjects[e.index].title);
		},500);
	
	});
	
	// define difficultyArray mapping difficulty number returned from database to a word and color combination
	var difficultyArray=[
		['Beginner','#B5E1B0'],
		['Intermediate','#C58F66'],
		['Advanced','#C5666E']
	];
	
	//connect to database
	var db = Titanium.Database.install('opencamp_app.db','opencamp_data');
		
	//run query to get dates
	var dateRows = db.execute('select distinct date from opencamp_data order by date');
		
	// define image mappings
	var images= new Array();
	images["WordPress"]="images/wp.png";
	images["Joomla"]="images/j.png";
	images["Drupal"]="images/d.png";
	images["Other"]="images/oc.png";
	images["all"]="images/oc.png";
	
		
	var data = [];

	while (dateRows.isValidRow()) {

	    var rows =[];
	    
	    if (track && track != 'All') { 
	    	var dbQuery='select oc_key, date, starttime, duration, event_name, event_desc, track, speaker_first_name, speaker_last_name, difficulty from opencamp_data where date="' + dateRows.fieldByName('date') + '" and track = "' + track + '" order by starttime desc, track';
	    } else {
	    	var dbQuery='select oc_key, date, starttime, duration, event_name, event_desc, track, speaker_first_name, speaker_last_name, difficulty from opencamp_data where date="' + dateRows.fieldByName('date') + '" order by starttime desc,track';
	    }
	    var rows = db.execute(dbQuery);
	    var seen=0;
	    
		
	    
		while (rows.isValidRow()) {
			if (seen == 0) {
				section=Ti.UI.createTableViewSection({
					headerTitle:dateRows.fieldByName('date'),
					left:0,
					height:'auto',
					width:200
				});
				data.push(section);
				seen=1;
			}
		   
			var row = Ti.UI.createTableViewRow({
				height:50
			});
			
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
			
			if (rows.fieldByName('difficulty') != 'na') {
			
				var difficultyLabel2 = Ti.UI.createLabel({
					text:difficultyArray[rows.fieldByName('difficulty')][0],
					font:{fontSize:12,fontWeight:'bold'},
					width:'auto',
					textAlign:'left',
					bottom:14,
					right:10,
					height:12,
					backgroundColor:difficultyArray[rows.fieldByName('difficulty')][1]
				});
			};
		  
			var speakerLabel =  Titanium.UI.createLabel({
				text:rows.fieldByName('speaker_first_name') + ' ' + rows.fieldByName('speaker_last_name'),
				font:{fontSize:12,fontWeight:'bold'},
				width:'auto',
				textAlign:'left',
				bottom:0,
				left:60,
				height:12
			});
		
			var startTimeLabel = Titanium.UI.createLabel({
				text:rows.fieldByName('starttime'),
				font:{fontSize:12,fontWeight:'bold'},
				width:'auto',
				textAlign:'right',
				bottom:0,
				right:50,
				height:12
			});
			
			var durTimeUnit=rows.fieldByName('duration');
			var durText;
			if (durTimeUnit % 2 !== 0) {
				durTimeUnit *= 30;
				durText = durTimeUnit + 'm';
			} else {
				durTimeUnit /= 2;
				durText = durTimeUnit + 'h';
			}
			var durationLabel = Titanium.UI.createLabel({
				text:durText,
				font:{fontSize:12,fontWeight:'bold'},
				width:'auto',
				textAlign:'right',
				bottom:0,
				right:10,
				height:12
			});
			
			row.add(trackBadge);
			row.add(eventName);
			if (difficultyLabel2) {
//				row.add(difficultyLabel1);
				row.add(difficultyLabel2);
			}
			row.add(speakerLabel);
			row.add(startTimeLabel);
			row.add(durationLabel);
			row.className = 'schedule row';
			row.eName = rows.fieldByName('event_name');
			row.oc_key = rows.fieldByName('oc_key');
			data.push(row);
			rows.next();
		  
		  
		}; //end main sql
		dateRows.next();
		rows.close();
	}; //end date sql
		
	// close database
	db.close();  
	
	// create table view		
	tableview.setData(data);
} //end setData function
  

	
// create table view event listener
tableview.addEventListener('click', function(e)
{	
    var evtDescWin = Titanium.UI.createWindow({
    	url:"event_desc.js",
    	backgroundColor:'#FFFFFF',
    	title:e.rowData.eName
	});
	
   	evtDescWin.oc_key = e.rowData.oc_key;
    
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
    closeBtn.addEventListener('click', function(e)
        {
           evtDescWin.close();
        });
    
    evtDescWin.add(closeBtn);
    
    
    //Titanium.UI.currentTab.open(evtDescWin,{animated:true});
    evtDescWin.open();        
});
	


// add table view to the window
Titanium.UI.currentWindow.add(tableview);
setTimeout(function()
{
	tableview.setData([]);
	setData();
},500);