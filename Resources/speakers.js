var spkrWin = Titanium.UI.currentWindow;

var animation = Titanium.UI.createAnimation();

// create table view data object
var tableview = Titanium.UI.createTableView({
        top:50,
        width:300,
        style: Titanium.UI.iPhone.TableViewStyle.GROUPED,
        backgroundColor:'#FFFFFF'
});

function setData() {

	//connect to database
	var db = Titanium.Database.install('opencamp_app.db','opencamp_data');

	// define image mappings			
	var images= new Array();
	images["WordPress"]="images/wp.png";
	images["Joomla"]="images/j.png";
	images["Drupal"]="images/d.png";
	images["Other"]="images/oc.png";
	images["all"]="images/oc.png";
	
	var data = [];

	var dbQuery='select oc_key,speaker_first_name, speaker_last_name from opencamp_data where speaker_first_name not null order by speaker_last_name';
	
	var rows = db.execute(dbQuery);
	var seen=0;

	while (rows.isValidRow()) {

		var row = Ti.UI.createTableViewRow({
			width:300,
			height:50
		});

		var speakerLabel =  Titanium.UI.createLabel({
			text:rows.fieldByName('speaker_first_name') + " " + rows.fieldByName('speaker_last_name'),
			font:{fontSize:18,fontWeight:'bold'},
			width:'auto',
			textAlign:'left',
			top:0,
			left:10,
			height:50
		});

		row.add(speakerLabel);
		row.oc_key = rows.fieldByName('oc_key');
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
    	backgroundColor:'#FFFFFF',
    	title:e.rowData.eName
	});

   	spkrDescWin.oc_key = e.rowData.oc_key;
    
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
           Ti.API.info('about to close spkrDescWin');
           spkrDescWin.close();
        });
    
    spkrDescWin.add(closeBtn);
    
    
    //Titanium.UI.currentTab.open(spkrDescWin,{animated:true});
    spkrDescWin.open();        
});
	


// add table view to the window
Titanium.UI.currentWindow.add(tableview);
setTimeout(function()
{
	tableview.setData([]);
	setData();
},500);