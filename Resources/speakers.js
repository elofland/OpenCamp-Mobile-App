var spkrWin = Titanium.UI.currentWindow;
spkrWin.title = 'Speakers';
spkrWin.barColor = '#0069B4';
spkrWin.backButtonTitle = 'Back';

var animation = Titanium.UI.createAnimation();

var spkrWrapper = Titanium.UI.createView({
	top:5,
	width:300,
	contentHeight:'auto',
	borderWidth:2,
	borderRadius:10,
	borderColor:'#374E7E'
});

// create table view data object
var tableview = Titanium.UI.createTableView({
        top:10,
        width:300,
        backgroundColor:'#FFFFFF'
});

function setData() {

	//connect to database
	var db = Titanium.Database.install('opencamp_app.db','opencamp_data');

	var data = [];
	var dbQuery='select distinct speaker_first_name, speaker_last_name from opencamp_data where speaker_first_name not null order by speaker_last_name;';
	var rows = db.execute(dbQuery);
	var seen=0;
	var count=1;
	
	while (rows.isValidRow()) {

		var row = Ti.UI.createTableViewRow({
			width:300,
			height:40
		});

		if (rows.fieldByName('speaker_first_name') !== 'NA')
			{
			var speakerLabel =  Titanium.UI.createLabel({
				text:rows.fieldByName('speaker_first_name') + " " + rows.fieldByName('speaker_last_name'),
				font:{fontSize:18,fontWeight:'bold'},
				width:'auto',
				textAlign:'left',
				top:0,
				left:10,
				height:40
			});
			count++;

		} else {
			rows.next();
			continue;
		}
		
		// stripy table effect
		if (count % 2 !== 0) {
			row.backgroundColor = '#FFFFFF';
		} else {
			row.backgroundColor ='#E7E7E7';
		}
		
		row.add(speakerLabel);
		row.firstName = rows.fieldByName('speaker_first_name');
		row.lastName = rows.fieldByName('speaker_last_name');
		data.push(row);
		rows.next();
		
	}; //end main sql
	rows.close();
	db.close();  
	
	// create table view		
	tableview.setData(data);
} //end setData function
	
// create table view event listener
tableview.addEventListener('click', function(e)
{	

    var spkrDescWin = Titanium.UI.createWindow({
    	url:"speaker_desc.js",
    	title:e.rowData.eName
	});
   	spkrDescWin.firstName = e.rowData.firstName;
   	spkrDescWin.lastName = e.rowData.lastName;
    Titanium.UI.currentTab.open(spkrDescWin,{animated:true});
    spkrDescWin.open();        
});

// add table view to the window
spkrWrapper.add(tableview);
Titanium.UI.currentWindow.add(spkrWrapper);

setTimeout(function()
{
	tableview.setData([]);
	setData();
},500);