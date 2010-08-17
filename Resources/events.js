var evtWin = Titanium.UI.currentWindow;
evtWin.title = 'Schedule';
evtWin.barColor = '#0069B4';
evtWin.backButtonTitle = 'Schedule';


var animation = Titanium.UI.createAnimation();

// create table view data object
var tableview = Titanium.UI.createTableView({
        top:40,
        bottom:0,
        style: Titanium.UI.iPhone.TableViewStyle.GROUPED,
        backgroundColor:'#FFFFFF'
});

function setData(track) {
	function getArrayLength(array)
	{
		var totalLength = 0;
		for (i=0,ii=array.length; i < ii; i++) 
		{
			totalLength += array[i].length;
		}
		return ( totalLength * 10 );
	};
	
	function getWordLength(word)
	{
		var wordLength=0;
		var wordWidth=0;
		wordLength=trackArray[i].length;
		wordWidth = ( wordLength * 10);
		return wordWidth;
	} // end function wordLength
	
	trackArray=[ 'All', 'WordPress', 'Drupal', 'Joomla', '.NET','New Media','Common' ];
	
	var trackArrayWidth = getArrayLength(trackArray);
	var leftArrowOn = Ti.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory,'images/leftArrowOn.png');
	var leftArrowOff = Ti.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory,'images/leftArrowOff.png');
	var rightArrowOn = Ti.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory,'images/rightArrowOn.png');
	var rightArrowOff = Ti.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory,'images/rightArrowOff.png');
	
	var scrollContainer = Titanium.UI.createView({
		top:-2,
		height:'auto',
		width:320,
		borderWidth:1,
		borderColor:'#374E7E',
		backgroundColor:'#000000'
	});

	var leftLabel = Titanium.UI.createImageView({
		image:leftArrowOn,
		width:10,
		height:20,
		left:0,
		visible:false
	});
	scrollContainer.add(leftLabel);

	var rightLabel = Titanium.UI.createImageView({
			image:rightArrowOn,
			width:10,
			height:20,
			right:0
		});
	
	scrollContainer.add(rightLabel);
	
	var scrollView = Titanium.UI.createScrollView({
	        contentWidth:'auto',
	        contentHeight:50,
	        top:0,
	        left:10,
	        height:50,
	        width:300,
	        borderRadius:0,
	        backgroundColor:'#000000',
	        scrollType:"horizontal"
	});
	
	scrollView.addEventListener('scroll', function(e)
	{
        if (e.x > 30)
		{
			leftLabel.show();
		} else {
			leftLabel.hide();
		}
		
		if (e.x < 130)
		{
			rightLabel.show();
		} else {
			rightLabel.hide();
		}
	});
	
	var buttonObjects = [];
	for (i=0,ii=trackArray.length; i < ii; i++)
	{
		var buttonObj = [];
		buttonObj = {
			title:trackArray[i],
			width:getWordLength(trackArray[i])
		};
		buttonObjects.push(buttonObj);
	};
	
	var evtTabBar = Titanium.UI.createTabbedBar({
	    labels:buttonObjects,
		backgroundColor:'#374E7E',
	    bottom:-2,
	    style:Titanium.UI.iPhone.SystemButtonStyle.BAR,
	    left:0,
	    height:50,
	    width:trackArrayWidth
	});
	evtTabBar.addEventListener('click', function(e)
	{
		tableview.setData([]);
		setTimeout(function()
		{
			setData(buttonObjects[e.index].title);
		},500);
	
	});
	
	scrollView.add(evtTabBar);
	scrollContainer.add(scrollView);
	scrollContainer.add(scrollView);
	evtWin.add(scrollContainer);
	
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

	var images= new Array();
	images["WordPress"]="images/wordpress_icon_3.png";
	images["Joomla"]="images/joomla_icon_3.png";
	images["Drupal"]="images/drupal_icon_3.png";
	images["New Media"]="images/newmedia_icon_3.png";
	images[".NET"]="images/net_icon_3.png";
	images["Common"]="images/common_icon_3.png";
	images["NA"]="images/oc.png";

	var data = [];
	var count=0;
	var breakSeen=0;
	var lunchSeen=0;
	
	while (dateRows.isValidRow()) {

	    var rows =[];
	    var dbQuery = [];
	    if (track && track != 'All') { 
	    	dbQuery='select oc_key, date, starttime, duration, event_name, event_desc, track, speaker_first_name, speaker_last_name, difficulty from opencamp_data where date="' + dateRows.fieldByName('date') + '" and track = "' + track + '" order by starttime, track';
	    } else {
	    	dbQuery='select oc_key, date, starttime, duration, event_name, event_desc, track, speaker_first_name, speaker_last_name, difficulty from opencamp_data where date="' + dateRows.fieldByName('date') + '" order by starttime,track';
	    }
	    rows = db.execute(dbQuery);
	    var sectionSeen=0;

		
	    //innerloop:
		while (rows.isValidRow()) {
			if (sectionSeen == 0) {
				section=Ti.UI.createTableViewSection({
					headerTitle:dateRows.fieldByName('date'),
					left:0,
					height:'auto',
					width:200
				});
				data.push(section);
				sectionSeen=1;
			}
		   
			var row = Ti.UI.createTableViewRow({
				height:50
			});
			
			var event_name_text = rows.fieldByName('event_name');
			
			// show just one break/lunch
			if ( event_name_text == "Break" ) {
				breakSeen++;
				lunchSeen=0;
			} else if ( event_name_text == "Lunch" ) {
				lunchSeen++;
				breakSeen=0;
			}
			
			if ( breakSeen >= 2 && event_name_text == "Break" ) {
				rows.next();
				continue;
			} else if ( lunchSeen >= 2 && event_name_text == "Lunch" ) {
			   	rows.next();
			   	continue;
			}
			
			var trackBadge=Titanium.UI.createImageView({
			    url:images[rows.fieldByName('track')],
			    width:32,
			    height:32,
			    left:4,
			    top:4
			});
		  
			var eventName=Titanium.UI.createLabel({
				text:event_name_text,
				font:{fontSize:16,fontWeight:'bold'},
				width:'auto',
				textAlign:'left',
				bottom:14,
				left:45,
				height:19
			});
			
			if (rows.fieldByName('difficulty') != 'NA') {
			
				var difficultyLabel2 = Ti.UI.createLabel({
					text:difficultyArray[rows.fieldByName('difficulty')][0],
					font:{fontSize:12,fontWeight:'bold'},
					width:'auto',
					textAlign:'left',
					top:2,
					right:4,
					height:12,
					backgroundColor:difficultyArray[rows.fieldByName('difficulty')][1]
				});
			} else {
				var difficultyLabel2 = Ti.UI.createLabel({
					width:'auto',
					textAlign:'left',
					top:2,
					right:4,
					height:12
				});			
			};
		  	

			if (rows.fieldByName('speaker_first_name') !== 'NA')
		  	{
				var speakerLabel =  Titanium.UI.createLabel({
					text:rows.fieldByName('speaker_first_name') + ' ' + rows.fieldByName('speaker_last_name'),
					font:{fontSize:12,fontWeight:'bold'},
					width:'auto',
					textAlign:'left',
					bottom:0,
					left:45,
					height:12
				});
			} else {
				var speakerLabel =  Titanium.UI.createLabel({
					font:{fontSize:12,fontWeight:'bold'},
					width:'auto',
					textAlign:'left',
					bottom:0,
					left:45,
					height:12
				});				
			}
			
			var dateObj = new Date(rows.fieldByName('starttime') * 1000);
			var localTime=dateObj.toLocaleTimeString().match(/^(\d+:\d+).*([APap][Mm])/);
			var startTimeLabel = Titanium.UI.createLabel({
				text:localTime[1] + localTime[2],
				font:{fontSize:12,fontWeight:'bold'},
				width:'auto',
				textAlign:'right',
				top:2,
				left:45,
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
				top:2,
				left:120,
				height:12
			});
			
			row.add(trackBadge);
			row.add(eventName);
			if (difficultyLabel2) {
				row.add(difficultyLabel2);
			}

			if (count % 2 !== 0) {
				row.backgroundColor = '#FFFFFF';
			} else {
				row.backgroundColor ='#E7E7E7';
			}
			count++;
			
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
    Titanium.UI.currentTab.open(evtDescWin,{animated:true});
    evtDescWin.open();        
});
	


// add table view to the window
Titanium.UI.currentWindow.add(tableview);
setTimeout(function()
{
	tableview.setData([]);
	setData();
},500);