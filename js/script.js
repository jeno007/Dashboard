(function ( $ ){
  "use strict";

  var feedID = 1526458792;

  // SET API KEY
  
  xively.setKey( "zMuZgPlBvuCe5KzspjnyuQ7mHiBC7dEJpQd4our5gznuxQhz" ); // do not use this one, create your own at xively.com

  // get all feed data in one shot

  xively.feed.get (feedID, function (data) {
    // this code is executed when we get data back from Xively

    var feed = data,
        datastream,
        value,
        // function for setting up the toggle inputs
        handleToggle = function ( datastreamID, value ) {
          var $toggle = $(".js-"+ datastreamID +"-toggle");
        };

    // loop through datastreams

    for (var x = 0, len = feed.datastreams.length; x < len; x++) {
      datastream = feed.datastreams[x];
      value = parseInt(datastream["current_value"]);

      // TEMPERATURE

      if ( datastream.id === "Sensor2" ) {
        var $temperature = $(".js-temperature1");

        $temperature.html( datastream["at"] );

        // make it live
        xively.datastream.subscribe( feedID, "Sensor2", function ( event , data ) {
          ui.fakeLoad();
          $temperature.html( data["current_value"] );
        });
      }

      if ( datastream.id === "Sensor1" ) {
        var $temperature = $(".js-temperature");

        $temperature.html( datastream["current_value"] );

        // make it live
        xively.datastream.subscribe( feedID, "Sensor1", function ( event , data ) {
          ui.fakeLoad();
          $temperature.html( data["current_value"] );
        });
      }

      if ( datastream.id === "Battery" ) {

        var $battery = $(".js-battery");
	var $battery_last_update = $(".js-battery-last-update");

	var $print_date = new Date( datastream["at"] );
        $battery.html( datastream["current_value"] );
	$battery_last_update.html( $print_date.toLocaleDateString("hu-HU").concat($print_date.toLocaleTimeString("hu-HU") ));

        // make it live
        xively.datastream.subscribe( feedID, "Battery", function ( event , data ) {
          ui.fakeLoad();
          $battery.html( data["current_value"] );
	  $battery_last_update.html( data["at"] );
        });
      }
    }

    // SHOW UI

    $(".app-loading").fadeOut(200, function(){
     $(".app-content-inner").addClass("open");
    });
  });


})( jQuery );
