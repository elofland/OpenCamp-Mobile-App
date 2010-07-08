// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#FFFFFF');

// create tab group
var tabGroup = Titanium.UI.createTabGroup();

//
// create base UI tab and root window
//
var rootWin = Titanium.UI.createWindow({  
	//height:auto,
    title:'OpenCamp',
    backgroundImage:'images/OpenCamp_navProto01-jn.png',
    fullscreen:1,
    backgroundColor:'#FFFFFF'
});

rootWin.hideNavBar();

//define transparent buttons
var eventBtn = Titanium.UI.createView({
	top:28,
	left:-15,
	width:170,
	height:170,
	borderRadius:80
});

var socialBtn = Titanium.UI.createView({
	top:25,
	right:15,
	width:145,
	height:145,
	borderRadius:80
});

var speakersBtn = Titanium.UI.createView({
	top:173,
	left:135,
	width:170,
	height:170,
	borderRadius:80
});

var aboutBtn = Titanium.UI.createView({
	bottom:57,
//	left:10,
	width:300,
	height:64
});


// define behaviors of the above buttons
eventBtn.addEventListener("click", function(e){
	var eventWin = Titanium.UI.createWindow({
		url:"events.js",
		backgroundColor:'#FFFFFF',
		title:"OpenCamp Events"
	});
		var closeBtn = Titanium.UI.createButton({
			top:5,
			left:10,
			height:40,
			width:50,
		    title:'Back',
		    style:Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
		    backgroundColor:'#336699',
		    borderRadius:10
		});
		closeBtn.addEventListener('click', function()
		    {
		       eventWin.close();
		    });

		eventWin.add(closeBtn);
		eventWin.open();
		//Titanium.UI.currentTab.open(eventWin,{animated:true});
	});

socialBtn.addEventListener("click", function(e){
	var socWin = Titanium.UI.createWindow({
		url:"twitter.js",
		//backgroundColor:'#3366990',
		backgroundColor:'#FFFFFF',
		title:"OpenCamp Social Media"
	});
	socWin.open();
});

speakersBtn.addEventListener("click", function(e){
	var spkrWin = Titanium.UI.createWindow({
		url:"speakers.js",
		//rightNavButton:'back',
		//backgroundColor:'#3366990',
		backgroundColor:'#FFFFFF',
		title:"OpenCamp Speakers"
	});
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
		closeBtn.addEventListener('click', function()
		    {
		       spkrWin.close();
		    });
		
		spkrWin.add(closeBtn);
		
		spkrWin.open();
	
});

aboutBtn.addEventListener("click", function(e){
//alert("abtBtn was clicked");
var abtWin = Titanium.UI.createWindow({
	url:"about.js",
	title:"About OpenCamp",
	//backgroundColor:'#3366990'
	backgroundColor:'#FFFFFF'
	
});
abtWin.open();

});

//add buttons to root window
rootWin.add(eventBtn);
rootWin.add(socialBtn);
rootWin.add(speakersBtn);
rootWin.add(aboutBtn);

var tab1 = Titanium.UI.createTab({  
    //icon:'KS_nav_views.png',
    title:'OpenCamp',
    window:rootWin
});

rootWin.hideTabBar();

//  add tabs
tabGroup.addTab(tab1);  

// open tab group
tabGroup.open();