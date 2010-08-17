var spkrDescWin = Titanium.UI.currentWindow;
spkrDescWin.title = 'Speaker';
spkrDescWin.barColor = '#0069B4';
spkrDescWin.backButtonTitle = 'Back';

Ti.include('lib.js');

var spkrDescScrollView = Titanium.UI.createScrollView({
	top:10,
	bottom:-10,
	width:320,
	contentWidth:'auto',
	contentHeight:'auto',
	backgroundColor:'#FFFFFF',
	showVerticalScrollIndicator:true
});

var spkrDescView = Ti.UI.createView({
    	bottom:0,
        backgroundColor:'#FFFFFF',
        borderRadius:10,
        borderWidth:2,
    	contentHeight:'auto',
    	top:0,
    	width:300,
        height:'auto'
});

speaker_first_name = spkrDescWin.firstName;
speaker_last_name = spkrDescWin.lastName;

Ti.API.info('first name is "' + speaker_first_name + '" and last name is "' + speaker_last_name + '"');

var db = Titanium.Database.install('opencamp_app.db','opencamp_data');
var rows = db.execute('select speaker_first_name, speaker_last_name, speaker_desc, speaker_img_url from opencamp_data where speaker_first_name = "' + speaker_first_name + '" and speaker_last_name = "' + speaker_last_name + '"');
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
		text:rows.fieldByName('speaker_first_name') + '\n' + rows.fieldByName('speaker_last_name'),
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
	borderColor:'#374E7E',
	contentHeight:'auto',
	top:0,
	width:300,
	height:'auto'
});

if (rows.fieldByName('speaker_desc') != "NA") 
{
	spkrDescText = Encoder.htmlDecode(rows.fieldByName('speaker_desc'));

	var spkrDescLabel = Titanium.UI.createLabel({
		text:spkrDescText + '\n\n',		
		font:{fontSize:16},
		width:'auto',
		textAlign:'left',
		top:145,
		left:10,
		right:10,
		height:'auto'
	});
} else {
	var spkrDescLabel = Titanium.UI.createLabel({
		text:'\n\n',
		width:'auto',
		textAlign:'left',
		top:145,
		left:10,
		right:10,
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