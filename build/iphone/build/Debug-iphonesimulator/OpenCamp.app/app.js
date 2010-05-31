// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

// create tab group
var tabGroup = Titanium.UI.createTabGroup();


//
// create base UI tab and root window
//
var rootWin = Titanium.UI.createWindow({  
	//height:auto,
    title:'OpenCamp',
    titleImage:'images/OpenCampLogoHeader.png',
    fullscreen:1,
    //backgroundColor:'#fff'
    backgroundColor:'#6e84a2'
   // backgroundGradient:{
     //   type:'linear',
        //colors:[{color:'#d4d4d4',position:0.0},{color:'#c4c4c4',position:0.50},{color:'#b4b4b4',position:1.0}]
        //}
    /*    
	backgroundGradient:{
        type:'linear',
        colors:['#111','#444'],
        startPoint:{x:0,y:0},
        endPoint:{x:0,y:300},
        backFillStart:true
 	}
 	*/
});

//add buttons
var eventBtn = Titanium.UI.createButton({
	//backgroundImage:"images/arcade-button.png",
	//backgroundSelectedImage:"images/arcade-button-over.png",
	top:10,
	left:10,
	width:145,
	height:110,
	//title:"Events",
	borderRadius:10,
	backgroundImage:'images/events_button_off.png'
});

var eventLabel = Titanium.UI.createLabel({
    text:'Events',
    height:20,
    width:90,
    //shadowColor:'#aaa',
    //shadowOffset:{x:5,y:5},
    //color:'#900',
    font:{fontSize:18, fontStyle:'bold'},
    bottom:5,
    right:5,
    backgroundColor:'#6b6b6b',
    opacity:0.75,
    textAlign:'center',
    borderRadius:10
});
	
eventBtn.add(eventLabel);

	


var mapBtn = Titanium.UI.createButton({
	//backgroundImage:"images/arcade-button.png",
	//backgroundSelectedImage:"images/arcade-button-over.png",
	top:10,
	left:165,
	width:145,
	height:110,
	borderRadius:10,
	backgroundImage:'images/maps_button_off.png'
});

var mapLabel = Titanium.UI.createLabel({
    text:'Maps',
    height:20,
    width:65,
    //shadowColor:'#aaa',
    //shadowOffset:{x:5,y:5},
    //color:'#900',
    font:{fontSize:18, fontStyle:'bold'},
    bottom:5,
    left:5,
    backgroundColor:'#6b6b6b',
    opacity:0.75,
    textAlign:'center',
    borderRadius:10
});
	
mapBtn.add(mapLabel);


var socialBtn = Titanium.UI.createButton({
	top:130,
	left:10,
	width:145,
	height:110,
	borderRadius:10,
	backgroundImage:'images/social_button_off.png'
});

var socialLabel = Titanium.UI.createLabel({
    text:'Social',
    height:20,
    width:70,
    //shadowColor:'#aaa',
    //shadowOffset:{x:5,y:5},
    //color:'#900',
    font:{fontSize:18, fontStyle:'bold'},
    bottom:5,
    right:5,
    backgroundColor:'#6b6b6b',
    opacity:0.75,
    textAlign:'center',
    borderRadius:10
});
	
socialBtn.add(socialLabel);


var speakersBtn = Titanium.UI.createButton({
	top:130,
	left:165,
	width:145,
	height:110,
	borderRadius:10,
	backgroundImage:'images/speakers_button_off.png'
});

var speakersLabel = Titanium.UI.createLabel({
    text:'Speakers',
    height:20,
    width:110,
    //shadowColor:'#aaa',
    //shadowOffset:{x:5,y:5},
    //color:'#900',
    font:{fontSize:18, fontStyle:'bold'},
    bottom:5,
    left:5,
    backgroundColor:'#6b6b6b',
    opacity:0.75,
    textAlign:'center',
    borderRadius:10
});
	
speakersBtn.add(speakersLabel);


var miscBtn = Titanium.UI.createButton({
	top:250,
	left:5,
	width:145,
	height:110,
	borderRadius:10,
	backgroundImage:'images/misc_button_off.png'
});


var miscLabel = Titanium.UI.createLabel({
    text:'Misc',
    height:20,
    width:65,
    //shadowColor:'#aaa',
    //shadowOffset:{x:5,y:5},
    //color:'#900',
    font:{fontSize:18, fontStyle:'bold'},
    bottom:5,
    right:5,
    backgroundColor:'#6b6b6b',
    opacity:0.75,
    textAlign:'center',
    borderRadius:10
});
	
miscBtn.add(miscLabel);
	

var aboutBtn = Titanium.UI.createButton({
	top:250,
	left:165,
	width:145,
	height:110,
	borderRadius:10,
	backgroundImage:'images/about_button_off.png'
});

var aboutLabel = Titanium.UI.createLabel({
    text:'About',
    height:20,
    width:70,
    //shadowColor:'#aaa',
    //shadowOffset:{x:5,y:5},
    //color:'#900',
    font:{fontSize:18, fontStyle:'bold'},
    bottom:5,
    left:5,
    backgroundColor:'#6b6b6b',
    opacity:0.75,
    textAlign:'center',
    borderRadius:10
});
	
aboutBtn.add(aboutLabel);

var footer = Titanium.UI.createView({
	bottom:10,
	height:35,
	width:300,
	backgroundColor:'#000000',
	borderRadius:10
});

rootWin.add(footer);



eventBtn.addEventListener("click", function(e){
	var eventWin = Titanium.UI.createWindow({
		url:"events.js",
		backgroundColor:'#3366990',		
		title:"OpenCamp Events"
	});
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
		       eventWin.close();
		    });
		
		eventWin.add(closeBtn);
		
		eventWin.open();
		//Titanium.UI.currentTab.open(eventWin,{animated:true});
	});
	
	mapBtn.addEventListener("click", function(e){
		var mapWin = Titanium.UI.createWindow({
			url:"maps.js",
			//url:"map_view.js",
			title:"OpenCamp Maps",
			barColor:'#111'
		
		});
		var bb1 = Titanium.UI.createButtonBar({
		    labels:['One', 'Two', 'Three'],
		    backgroundColor:'#336699',
		    top:50,
		    style:Titanium.UI.iPhone.SystemButtonStyle.BAR,
		    height:25
		    //width:200
		});
		mapWin.add(bb1);
/*		var closeBtn = Titanium.UI.createButton({
		   title:'Close',
		   style:Titanium.UI.iPhone.SystemButtonStyle.PLAIN
		});
		var b = Titanium.UI.createButton({title:'Left Nav'});
		mapWin.leftNavButton = b;
  */
  		mapWin.open();
  
   });
   
   /*
   b7.addEventListener('click', function()
   {
           if (!leftnav)
           {
                   var b = Titanium.UI.createButton({title:'Left Nav'});
                   win.leftNavButton = b;
                   leftnav = true;
           }
           else
           {
                   win.setLeftNavButton(null);
                   leftnav = false;
           }
   });
   
   win.add(b7);
   
   */

socialBtn.addEventListener("click", function(e){
	var socWin = Titanium.UI.createWindow({
		url:"twitter.js",
		title:"OpenCamp Social Media"
	});
	//var backBtn = Titanium.UI.createButton({title:'Back'});
	//socWin.leftNavButton = backBtn;
	socWin.open();  
//	var socButtonBar = Titanium.UI.createButtonBar({
//	    labels:['OCDFW', 'Committee', 'Attendees', 'Sponsors'],
//	    backgroundColor:'#336699',
//	    backgroundColor:'#13386c',
//	    bottom:0,
//	    style:Titanium.UI.iPhone.SystemButtonStyle.BAR.BORDERED,
//		width:auto,
//	    height:25
//	    font:{fontSize:10}
//	    width:200
//	});
//	socButtonBar.addEventListener('click', function(e)
//   {
//
//		if (e.index == 0)
//		{
//			alert("OCDFW");
//			Titanium.API.info('OCDFW');
//		}
//		else if (e.index == 1)
//		{
//			alert("Committee");
//		}
//		else if (e.index == 2)
//		{
//			alert("Attendees");
//		}
//		else if (e.index == 3)
//		{
//			alert("Sponsors");
//		}
//    });
//socWin.add(socButtonBar);
socWin.open();
});

speakersBtn.addEventListener("click", function(e){
	alert("OpenCamp Speakers");
});

miscBtn.addEventListener("click", function(e){
	alert("OpenCamp Miscellaneous");
});

aboutBtn.addEventListener("click", function(e){
	alert("About OpenCamp app");
});


rootWin.add(eventBtn);
rootWin.add(mapBtn);
rootWin.add(socialBtn);
rootWin.add(speakersBtn);
rootWin.add(miscBtn);
rootWin.add(aboutBtn);

var tab1 = Titanium.UI.createTab({  
    icon:'KS_nav_views.png',
    title:'OpenCamp',
    window:rootWin
});

rootWin.hideTabBar();
/*
var label1 = Titanium.UI.createLabel({
	color:'#999',
	text:'Welcome to OpenCamp 2010',
	font:{fontSize:20,fontFamily:'Helvetica Neue'},
	textAlign:'center',
	width:'auto'
});

rootWin.add(label1);
*/

//  add tabs
tabGroup.addTab(tab1);  
//tabGroup.addTab(tab2);  




// open tab group
tabGroup.open();


/*var view = Titanium.UI.createView({
   borderRadius:10,
   backgroundColor:'red',
   width:50,
   height:50
});
rootWin.add(view);
*/
/*
var win = Titanium.UI.createWindow({
        height:30,
        width:250,
        bottom:110,
        borderRadius:10
});


var view = Titanium.UI.createView({
        backgroundColor:'#000',
        opacity:0.7,
        height:30,
        width:250,
        borderRadius:10
});

var label = Titanium.UI.createLabel({
        color:'#fff',
        font:{fontSize:13},
        textAlign:'center',
        width:'auto',
        height:'auto'
});
win.add(view);
win.add(label);

Titanium.App.addEventListener('event_one', function(e)
{
        label.text = 'base_ui.js: event one, array length = ' + e.data.length;
        win.open();
        setTimeout(function()
        {
                win.close({opacity:0,duration:500});
        },1000);
});

Titanium.App.addEventListener('event_two', function(e)
{
        label.text = 'base_ui.js: event two, name = ' + e.name;
        win.open();
        setTimeout(function()
        {
                win.close({opacity:0,duration:500});
        },1000);
        
});
*/
