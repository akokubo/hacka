/*jslint devel:true, browser:true */
/*global google, $ */

window.onload = function () {
    'use strict';
    var center = new google.maps.LatLng(40.609181, 140.465338),
        options = {
            zoom: 15,
            center: center,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        },
        map = new google.maps.Map($('#map').get(0), options),
        markers = [];

    function createMarker(spot, map) {
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(spot.lat, spot.lng),
            map: map
        });
        return marker;
    }

    function attachInfoWindow(marker, content) {
        google.maps.event.addListener(marker, 'click', function () {
            new google.maps.InfoWindow({
                content: content
            }).open(marker.getMap(), marker);
        });
    }

    $.getJSON("data.json", function (spots) {
        var i;
        for (i = 0; i < spots.length; i += 1) {
            markers[i] = createMarker(spots[i], map);
            attachInfoWindow(markers[i], spots[i].id);
        }
    });
};
