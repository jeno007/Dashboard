(function recname ( ){
  "use strict";

  var feedID = 1526458792;
  var warn_limit = 360000;
  var error_limit = 600000;

  // SET API KEY
  
  xively.setKey( "zMuZgPlBvuCe5KzspjnyuQ7mHiBC7dEJpQd4our5gznuxQhz" ); // do not use this one, create your own at xively.com

  // get all feed data in one shot

  var $app-content = $("app-content-inner");
  $app-content.append('
	<section class="dashboard-monitor clearfix">
          <div class="monitor clearfix">
            <span class="monitor-label icon-battery">Akkumulátor2</span>
            <span class="monitor-value"><strong class="js-battery2">--</strong> V</span>
          </div>
          <div class="monitor-sub clearfix">
            <span class="monitor-label-sub">Frissítve:</span>
            <span class="monitor-label-sub js-battery2-last-update">--</span>
          </div>
        </section>');

  function main_func (data) {
//  xively.feed.get (feedID, function (data) {
    // this code is executed when we get data back from Xively

    var feed = data,
        datastream,
        value;

    // loop through datastreams

    for (var x = 0, len = feed.datastreams.length; x < len; x++) {
      datastream = feed.datastreams[x];
      value = parseInt(datastream["current_value"]);

      // TEMPERATURE

      if ( datastream.id === "Sensor2" ) {

        var $temperature1 = $(".js-temperature1"),
	    $temperature1_last_update = $(".js-temperature1-last-update"),
	    $atdate1 = new Date( datastream["at"] ),
	    $utcdate = new Date(Date.now()),
	    $diff = new Date($utcdate - $atdate1);

	if (($utcdate-$atdate1) > warn_limit) {
		$temperature1_last_update.toggleClass("warn", true );
	}

        $temperature1.html( datastream["current_value"] );
	$temperature1_last_update.html( 
		$atdate1.
		toLocaleDateString("hu-HU").
		concat(" ").
		concat($atdate1.toLocaleTimeString("hu-HU") ));

        // make it live
        xively.datastream.subscribe( feedID, "Sensor2", function ( event , data ) {
          ui.fakeLoad();
	  
	  $atdate1 = new Date( data["at"] );
	  $utcdate = new Date(Date.now());
	  if (($utcdate-$atdate1) < warn_limit) {
		$temperature1_last_update.toggleClass("warn", false );
	  }
          $temperature1.html( data["current_value"] );
	  $temperature1_last_update.html(
		$atdate1.
		toLocaleDateString("hu-HU").
		concat(" ").
		concat($atdate1.toLocaleTimeString("hu-HU") ));
        });
      }

      if ( datastream.id === "Sensor1" ) {
        var $temperature = $(".js-temperature"),
	    $temperature_last_update = $(".js-temperature-last-update"),
	    $atdate = new Date( datastream["at"] ),
	    $utcdate = new Date(Date.now()),
	    $diff = new Date($utcdate - $atdate);

	if (($utcdate-$atdate) > warn_limit) {
		$temperature_last_update.toggleClass("warn", true );
	}

        $temperature.html( datastream["current_value"] );
	$temperature_last_update.html(
		$atdate
		.toLocaleDateString("hu-HU")
		.concat(" ")
		.concat($atdate.toLocaleTimeString("hu-HU") ));

        // make it live
        xively.datastream.subscribe( feedID, "Sensor1", function ( event , data ) {
          ui.fakeLoad();
	  $atdate = new Date( data["at"] );
	  $utcdate = new Date(Date.now());
	  if (($utcdate-$atdate) < warn_limit) {
		$temperature_last_update.toggleClass("warn", false );
	  }
          $temperature.html( data["current_value"] );
	  $temperature_last_update.html(
		$atdate
		.toLocaleDateString("hu-HU")
		.concat(" ")
		.concat($atdate.toLocaleTimeString("hu-HU") ));
        });
      }

      if ( datastream.id === "Battery" ) {

        var $battery = $(".js-battery"),
	    $battery_last_update = $(".js-battery-last-update"),
	    $atdateb = new Date( datastream["at"] ),
	    $utcdate = new Date(Date.now()),
	    $diff = new Date($utcdate - $atdateb);

	if (($utcdate-$atdateb) > warn_limit) {
		$battery_last_update.toggleClass("warn", true );
	}

        $battery.html( datastream["current_value"] );
	$battery_last_update.html(
		$atdateb
		.toLocaleDateString("hu-HU")
		.concat(" ")
		.concat($atdateb.toLocaleTimeString("hu-HU") ));

        // make it live
        xively.datastream.subscribe( feedID, "Battery", function ( event , data ) {
          ui.fakeLoad();
	  $atdateb = new Date( data["at"] );
	  $utcdate = new Date(Date.now());
	  if (($utcdate-$atdateb) < warn_limit) {
		$battery_last_update.toggleClass("warn", false );
	  }
          $battery.html( data["current_value"] );
	  $battery_last_update.html(
		$atdateb
		.toLocaleDateString("hu-HU")
		.concat(" ")
		.concat($atdateb.toLocaleTimeString("hu-HU") ));
        });
      }
    }

    // SHOW UI

    $(".app-loading").fadeOut(200, function(){
     $(".app-content-inner").addClass("open");
    });
  };
  xively.feed.get (feedID, main_func );
  setTimeout(recname, 600000);

})( );
