var spkrDescWin = Titanium.UI.currentWindow;

var spkrDescScrollView = Titanium.UI.createScrollView({
	top:50,
//	url:"event_desc.js",
	width:320,
	contentWidth:'auto',
	contentHeight:'auto',
	backgroundColor:'#3366990',
	showVerticalScrollIndicator:true
});


var spkrDescView = Ti.UI.createView({
        backgroundColor:'#FFFFFF',
        borderRadius:10,
    	contentHeight:'auto',
    	top:0,
        width:300,
        height:'auto'
});

//spkrDescScrollView.add(spkrDescView);
//spkrDescWin.add(spkrDescScrollView);

//oc_key = Titanium.UI.currentWindow.oc_key;
oc_key = spkrDescWin.oc_key;
Ti.API.info('oc_key is ' + oc_key);
/*
var closeBtn = Titanium.UI.createButton({
	top:0,
	left:270,
	height:30,
	width:50,
    title:'Close',
    style:Titanium.UI.iPhone.SystemButtonStyle.PLAIN
});
closeBtn.addEventListener('click', function()
    {
       spkrDescWin.close();
    });

spkrDescWin.add(closeBtn);
*/
// define image mappings
var images= new Array();
images["WordPress"]="images/wp.png";
images["Joomla"]="images/j.png";
images["Drupal"]="images/d.png";
images["other"]="images/oc.png";
images["all"]="images/oc.png";

// define difficultyArray mapping difficulty number returned from database to a word and color combination
var difficultyArray=[
	['Beginner','#B5E1B0'],
	['Intermediate','#C58F66'],
	['Advanced','#C5666E']
];
var db = Titanium.Database.install('opencamp_app.db','opencamp_data');
var rows = db.execute('select oc_key, speaker_first_name, speaker_last_name, speaker_desc, speaker_img_url from opencamp_data where oc_key=' + oc_key);
//Titanium.API.info('event desc query: select oc_key, date, starttime, duration, event_name, event_desc, track, speaker_name from opencamp_data where oc_key=' + oc_key);
while (rows.isValidRow()) {
//	var trackBadge=Titanium.UI.createImageView({
//	    url:images[rows.fieldByName('track')],
//	    width:32,
//	    height:32,
//	    left:4,
//	    top:90
//	});
	if (rows.fieldByName('speaker_img_url')) {
		spkrImage=rows.fieldByName('speaker_img_url');
	} else {
		spkrImage='images/nopic-125x125.png';
	}

	var spkrImageView = Titanium.UI.createImageView({
	        url:spkrImage,
	        top:10,
	        left:10,
	        width:125,
	        height:125,
	        borderRadius:10
	});
/*
	var eventName=Titanium.UI.createLabel({
		text:rows.fieldByName('event_name'),
		font:{fontSize:20,fontWeight:'bold'},
		//width:320,
		textAlign:'left',
		top:10,
		left:10,
		height:50
	});
*/
	var speakerLabel =  Titanium.UI.createLabel({
		text:rows.fieldByName('speaker_first_name') + ' ' + rows.fieldByName('speaker_last_name'),
		font:{fontSize:16,fontWeight:'bold'},
		backgroundColor:'#DDDDDD',
		width:140,
		textAlign:'center',
		top:10,
		left:150,
		height:125,
		borderRadius:10
	});
/*	
	var startTimeLabel = Titanium.UI.createLabel({
		text:rows.fieldByName('date') + ' ' + rows.fieldByName('starttime'),
		font:{fontSize:12,fontWeight:'bold'},
		width:'auto',
		textAlign:'right',
		top:79,
		left:10,
		height:12
	});
	
	var durationLabel = Titanium.UI.createLabel({
		text:rows.fieldByName('duration'),
		font:{fontSize:12,fontWeight:'bold'},
		width:'auto',
		textAlign:'right',
		top:79,
		right:10,
		height:12
	});
	
	var locationLabel = Ti.UI.createLabel({
		text:'Location: ' + rows.fieldByName('location'),
		font:{fontSize:12,fontWeight:'bold'},
		width:'auto',
		textAlign:'left',
		top:93,
		left:10,
		height:12
	});
	
	//adjustedTop default
	var adjustedTop=115;
	
	Ti.API.info('difficulty is ' + rows.fieldByName('difficulty'));
	if (rows.fieldByName('difficulty') != 'na') {
		Ti.API.info('difficulty is defined as not na');
		Ti.API.info('difficulty text is ' + difficultyArray[rows.fieldByName('difficulty')][0]);
		Ti.API.info('difficulty color is ' + difficultyArray[rows.fieldByName('difficulty')][1]);
		var difficultyLabel1 = Ti.UI.createLabel({
			text:'Difficulty: ',
			font:{fontSize:12,fontWeight:'bold'},
			width:'auto',
			textAlign:'left',
			top:108,
			left:10,
			height:12
		});
		
		var difficultyLabel2 = Ti.UI.createLabel({
			text:difficultyArray[rows.fieldByName('difficulty')][0],
			font:{fontSize:12,fontWeight:'bold'},
			width:'auto',
			textAlign:'left',
			top:108,
			left:75,
			height:12,
			backgroundColor:difficultyArray[rows.fieldByName('difficulty')][1]
		});
		
		//adjustedTop pushes the descLabel down to make room for the difficultyLabel
		adjustedTop=125;
   	}
*/
//	var textValue=rows.fieldByName('event_desc');
	var spkrDescLabel = Titanium.UI.createLabel({
//		value:textValue,
		text:rows.fieldByName('speaker_desc'),
		font:{fontSize:16},
		width:'auto',
		textAlign:'left',
		top:145,
		left:10,
		height:'auto'
	});

	rows.next();
	
} //end data loop

rows.close();
db.close();

//Titanium.UI.currentWindow.add(trackBadge);
//Ti.UI.currentWindow.add(trackBadge);
//spkrDescView.add(eventName);
spkrDescView.add(spkrImageView);
spkrDescView.add(speakerLabel);
//spkrDescView.add(startTimeLabel);
//spkrDescView.add(durationLabel);
//spkrDescView.add(descLabel);
spkrDescView.add(spkrDescLabel);
//spkrDescView.add(locationLabel);
//if (difficultyLabel1) {
//	spkrDescView.add(difficultyLabel1);
//	spkrDescView.add(difficultyLabel2);
//}


spkrDescScrollView.add(spkrDescView);
spkrDescWin.add(spkrDescScrollView);