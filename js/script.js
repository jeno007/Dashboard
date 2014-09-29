(function recname ( ){
  "use strict";

  var feedID1 = 1526458792;
  var feedID2 = 72161;
  var feedID3 = 78658;
  var warn_limit = 360000;
  var error_limit = 600000;

  // SET API KEY
  
  xively.setKey( "zMuZgPlBvuCe5KzspjnyuQ7mHiBC7dEJpQd4our5gznuxQhz" ); // do not use this one, create your own at xively.com


 
  function d_line ( type, name, feed_id, metric ) { 
  if ($(".js-" + feed_id).length == 0) {
  	$(".app-content-inner").append('\
		<section class="dashboard-monitor clearfix">\
          	  <div class="monitor clearfix">\
            	    <span class="monitor-label icon-' + type + '">' + name + '</span>\
            	    <span class="monitor-value"><strong class="js-' + feed_id + '">--</strong> ' + metric + '</span>\
          	  </div>\
          	  <div class="monitor-sub clearfix">\
            	    <span class="monitor-label-sub">Frissítve:</span>\
            	    <span class="monitor-label-sub js-' + feed_id + '-last-update">--</span>\
          	  </div>\
        	</section>');
	}
  }

//  function d_line ( type, name, feed_id, metric )
  d_line("lamp","Aktuális fogyasztás","Power", "W");
  d_line("lamp","Aktuális fogyasztás","Gas", "l/min");
  d_line("lamp","Számláló","Gas-counter", "m3");
  d_line("temperature","Dolgozó szoba","Temperature", "°C");
  d_line("temperature","Konyha","Kitchen-tem", "°C");
  d_line("temperature","Gyerek szoba","Living-room-temp", "°C");
  d_line("temperature","Gyerek szoba pára","Living-room-humidity", "%");
  d_line("battery","Nap érzékelő","Battery", "V");
  d_line("battery","Konyha","Emon-kitchen-battery", "V");
  d_line("battery","Gyerek szoba","Living-room-emon-battery", "V");
  d_line("temperature","1-es szenzor","Sensor1", "°C");
  d_line("temperature","2-es szenzor","Sensor2", "°C");
  d_line("temperature","3-es szenzor","Sensor3", "°C");
  d_line("temperature","4-es szenzor","Sensor4", "°C");
  d_line("temperature","5-es szenzor","Sensor5", "°C");

  function main_func (data) {

    var feed = data,
        datastream,
        value;

    // loop through datastreams
    for (var x = 0, len = feed.datastreams.length; x < len; x++) {
      datastream = feed.datastreams[x];

      if ($(".js-" + datastream.id).length != 0) {
	var $atdate1 = new Date( datastream["at"] );
	var $utcdate = new Date(Date.now());
	var $diff = new Date($utcdate - $atdate1);
	if (($utcdate-$atdate1) > warn_limit) {
		$(".js-" + datastream.id + "-last-update").toggleClass("warn", true );
	}
        $(".js-" + datastream.id).html( datastream["current_value"] );
	$(".js-" + datastream.id + "-last-update").html(
		$atdate1.
		toLocaleDateString("hu-HU").
		concat(" ").
		concat($atdate1.toLocaleTimeString("hu-HU") ));

        // make it live
        xively.datastream.subscribe( feed.id, datastream.id, function ( did ) {
		return function (event, data) {
          		ui.fakeLoad();
	  
	  		var $atdate1 = new Date( data["at"] );
	  		var $utcdate = new Date(Date.now());
	  		if (($utcdate-$atdate1) < warn_limit) {
				$(".js-" + did + "-last-update").toggleClass("warn", false );
	  		}
          		$(".js-" + did).html( data["current_value"] );
	  		$(".js-" + did + "-last-update").html(
				$atdate1.
				toLocaleDateString("hu-HU").
				concat(" ").
				concat($atdate1.toLocaleTimeString("hu-HU") ));
		};
        }(datastream.id));
      };
    };
  };

    // SHOW UI

  $(".app-loading").fadeOut(200, function(){
   $(".app-content-inner").addClass("open");
  });
  xively.feed.get (feedID1, main_func );
  xively.feed.get (feedID2, main_func );
  xively.feed.get (feedID3, main_func );
  setTimeout(recname, 600000);

})( );
