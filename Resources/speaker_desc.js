var spkrDescWin = Titanium.UI.currentWindow;

var spkrDescScrollView = Titanium.UI.createScrollView({
	top:50,
	width:320,
	contentWidth:'auto',
	contentHeight:'auto',
	backgroundColor:'#FFFFFF',
	showVerticalScrollIndicator:true
});

var spkrDescView = Ti.UI.createView({
        backgroundColor:'#FFFFFF',
        borderRadius:10,
        borderWidth:2,
        borderColor:'#3366990',
    	contentHeight:'auto',
    	top:0,
        width:300,
        height:'auto'
});

oc_key = spkrDescWin.oc_key;

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

while (rows.isValidRow()) {

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

spkrDescView = Ti.UI.createView({
	backgroundColor:'#FFFFFF',
	borderRadius:10,
	borderWidth:2,
	borderColor:'#3366990',
	contentHeight:'auto',
	top:0,
	width:300,
	height:'auto'
});
if (rows.fieldByName('speaker_desc') != "NA") 
{
	var spkrDescLabel = Titanium.UI.createLabel({
		text:rows.fieldByName('speaker_desc'),
		font:{fontSize:16},
		width:'auto',
		textAlign:'left',
		top:145,
		left:10,
		height:'auto'
	});
} else {
	var spkrDescLabel = Titanium.UI.createLabel({
		width:'auto',
		textAlign:'left',
		top:145,
		left:10,
		height:'auto'
	});
};

	rows.next();
	
} //end data loop

rows.close();
db.close();

spkrDescView.add(spkrImageView);
spkrDescView.add(speakerLabel);
spkrDescView.add(spkrDescLabel);
spkrDescScrollView.add(spkrDescView);
spkrDescWin.add(spkrDescScrollView);