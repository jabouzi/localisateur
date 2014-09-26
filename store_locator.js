var directionDisplay = null;
var directionsService = null;
var map = null;
var geocoder = null;
var origin = null;
var destination = null;
var el_id = null;
var mode = null;
var allmarkers = [];
var hewittEquipement = null;
var atlanticCat = null;
var locationHewitt = null;
var shadow = null;
var shape = null;
var directionsVisible = false;
var circle = null;
var waypoints = [];
var userImage = null;
var infobox = null;
jQuery(document).ready(function()
{
	initializeMap();
    var triggers = jQuery(".directionInput").overlay({
      // some mask tweaks suitable for modal dialogs
      mask: {
        color: '#ebecff',
        loadSpeed: 200,
        opacity: 0.9
      },
      closeOnClick: false
   });
    jQuery('.directionInput').click(function()
    {
        el_id = jQuery(this).attr('id');
    });
});
function initializeMap()
{
    var montreal = new google.maps.LatLng(jsonSettings.latitude, jsonSettings.longitude);
    myOptions = {
        zoom:parseInt(jsonSettings.zoom),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        center: montreal
    }
    setMap(myOptions);
}
function setMap(myOptions)
{
    map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
    geocoder = new google.maps.Geocoder();
    directionsService = new google.maps.DirectionsService();
    directionsDisplay = new google.maps.DirectionsRenderer({suppressMarkers: true});
    directionsDisplay.setMap(map);
    directionsDisplay.setPanel(document.getElementById("directionsPanel"));
    userImage = new google.maps.MarkerImage('http://locationhewitt/skins/default/media/images/'+jsonSettings.icon,
            new google.maps.Size(26, 29),
            new google.maps.Point(0,0),
            new google.maps.Point(0, 29)
    );
    shape = {
        coord: [1, 1, 1, 20, 18, 20, 18 , 1],
        type: 'poly'
    };
    infobox = new InfoBox({
        content: document.getElementById("infobox"),
        disableAutoPan: false,
        maxWidth: 150,
        pixelOffset: new google.maps.Size(-135, -7),
        zIndex: null,
        boxStyle: {
            background: "url('http://google-maps-utility-library-v3.googlecode.com/svn/trunk/infobox/examples/tipbox.gif') no-repeat",
            opacity: 0.75,
            width: "280px"
        },
        closeBoxMargin: "12px 4px 2px 2px",
        closeBoxURL: "http://www.google.com/intl/en_us/mapfiles/close.gif",
        infoBoxClearance: new google.maps.Size(1, 1)
    });
    //infowindow = new google.maps.InfoWindow({
            //content: "loading..."
    //});
    //~ downloadUrl('/xml/stores.xml', function(data) {
        //~ var markers = data.documentElement.getElementsByTagName("marker");
        //~ setXmlMarkers(map, markers);
    //~ });
    setJsonMarkers(map);
}
function setWindowInfo(content)
{
    var infoWindowContent = '';
    infoWindowContent += '<div>';
    infoWindowContent += '<p id="infoAddress">';
    infoWindowContent += '    <h3 style="color:#fff">'+content.name+'</h3>';
    infoWindowContent += '    '+content.address+'<br>';
    infoWindowContent += '    '+content.city+', '+content.province+', '+content.cp+'<br>';
    infoWindowContent += '    '+content.phone+'<br>';			
    infoWindowContent += '</p>';
    infoWindowContent += '<b>Tapez votre adresse</b><br />';
    infoWindowContent += '<input type="text" name="from_address" id="from_address" value="" style="width:250px;"  /><br />';
    infoWindowContent += '<input type="button" class="close" value="Obtenir les directions" onclick="getDirections('+content.id+');" />';
    infoWindowContent += '</div>';
    return infoWindowContent;
}
function setJsonMarkers(map)
{
    jQuery.each(jsonObject, function(i, item) {
        var latlng = new google.maps.LatLng(parseFloat(item.lat), parseFloat(item.lng));
        var image = hewittEquipement;
        var marker = new google.maps.Marker({
            position: latlng,
            map: map,
            html: setWindowInfo(item),
            shadow: shadow,
            icon: userImage,
            shape: shape,
            id: item.id,
            city: item.city.replace(' ', '-'),
            province: item.province,
            name:item.name
        });
        allmarkers[item.id] = marker;
        //google.maps.event.addListener(marker, "click", function () {
            //infowindow.setContent(this.html);
            //infowindow.open(map, this);
        //});
        google.maps.event.addListener(marker, "click", function () {
            var str = this.html;
            infobox.setContent('<div id="infobox">'+str+'</div>');
            infobox.open(map, this);
            map.panTo(latlng);
        });
    });
    var url = window.location.pathname.split('/');
    var id = parseInt(url[url.length - 2]);
    if (id) showStoreMarkerOnly(id);
}
function showByName()
{
    clearMarkers();
    var selected = jQuery("#brand_name option:selected");
    if ('all' == selected.val())
    {
        showAll();
    }
    else
    {
        clearMarkers();
        jQuery('.'+selected.val()).show();
        displayMarkers(selected, 'name', 4);
    }
}
function showAll()
{
    clearMarkers();
    jQuery('.store_hlt_td').show();
    //jQuery('.separateur').show();
    clearCircle();
    var marker;
    var index = 0;
    for (marker in allmarkers)
    {
        index++;
        allmarkers[marker].setVisible(true);
    }
    var montreal = new google.maps.LatLng(45.5454, -73.6391);
    map.setCenter(montreal);
    map.setZoom(10);
    display_count(index);
}
function clearMarkers()
{
    jQuery('.store_hlt_td').hide();
    //jQuery('.separateur').hide();
    var marker;
    var index = 0;
    for (marker in allmarkers)
    {
        index++;
        //if (marker.toLowerCase() != 'indexof')  
        allmarkers[marker].setVisible(false);
    }
}
function zipCodeSearch()
{
    geocoder.geocode({ 'address': jQuery('#pc_1').val()+jQuery('#pc_2').val(), 'language' : 'fr'}, showResults);
}
function citySearch()
{
    var selected = jQuery("#city option:selected");
    if ('all' == selected.val())
    {
        showAll();
    }
    else
    {
        geocoder.geocode({ 'address': selected.html()+' '+selected.parent()[0].id, 'language' : 'fr'}, getCityCenter);
        clearMarkers();
        jQuery('.'+jQuery('#city').val()).show();
        displayMarkers(selected, 'city', 10);
    }
}
function displayMarkers(selected, type, zoom)
{    
    var marker;
    var item;
    var index = 0;
    for (marker in allmarkers)
    {
        if (type == 'city') item = allmarkers[marker].city;
        else item = allmarkers[marker].type;
        if (item == selected.val())
        {
            index++;
            allmarkers[marker].setVisible(true);
        }
    }
    map.setZoom(zoom);
    display_count(index);
}
function display_count(count)
{
    if (parseInt(count) > 1)
    {
        jQuery('#counts').html(count);
        jQuery('#result').hide();
        jQuery('#results').show();
    }
    else
    {
        jQuery('#count').html(count);
        jQuery('#result').show();
        jQuery('#results').hide();
    }
}
function showResults(results, status)
{
    if (! results)
    {
        alert("Geocoder did not return a valid response");
    }
    else
    {
        if (status == google.maps.GeocoderStatus.OK)
        {
            clearCircle();
            map.setCenter(results[0].geometry.location);
            circle = new google.maps.Circle({
                center: results[0].geometry.location,
                map: map,
                radius: parseInt(jQuery('#distance').val())*1000,
                fillOpacity : 0.1,
                strokeOpacity : 1
            });
            reset();
        }
    }
}
function getCityCenter(results, status)
{
    map.setCenter(results[0].geometry.location);
}
function reset()
{
    clearMarkers();
    var marker;
    var index = 0;
    for (marker in allmarkers)
    {
        if (circle.getBounds().contains( allmarkers[marker].position ))
        {
            index++;
            jQuery('#store_hlt_td_'+allmarkers[marker].id).show();
            //jQuery('#separateur_'+allmarkers[marker].id).show();
            allmarkers[marker].setVisible(true);
        }
    }
    display_count(index);
}
function getDirections(element)
{
    //reset();
    //showAll();
    //console.log(el_id);
    origin = jQuery("#from_address").val();
    destination = new google.maps.LatLng(jQuery("#latitude_"+el_id).val(), jQuery("#longitude_"+el_id).val());
    if (el_id == null)
    {
        //destination = jQuery("#address_"+element).val();
        destination = new google.maps.LatLng(jQuery("#latitude_"+element).val(), jQuery("#longitude_"+element).val());
    }      
    mode = google.maps.DirectionsTravelMode.DRIVING;
    var request = {
        origin: origin,
        destination: destination,
        travelMode: google.maps.DirectionsTravelMode.DRIVING,
        unitSystem: google.maps.DirectionsUnitSystem.METRIC,
        optimizeWaypoints: true
    };
    directionsService.route(request, function(response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
            var leg = response.routes[ 0 ].legs[ 0 ];
            new google.maps.Marker({
                position: leg.start_location,
                map: map,
                icon: userImage,
                shadow: shadow
                //title: title
            });
        }
    });
    directionsVisible = true;
    scrollToMap();
    el_id = null;
}
function showStoreMarker(id)
{
    scrollToMap();
    google.maps.event.trigger(allmarkers[id], 'click');
}
function showStoreMarkerOnly(id)
{
    //clearMarkers();
    //allmarkers[id].setVisible(true);
    scrollToMap();
    google.maps.event.trigger(allmarkers[id], 'click');
    jQuery('#store_hlt_td_'+allmarkers[id].id).show();
    //display_count(1);
}
function scrollToMap()
{
    jQuery('html, body').animate({
        scrollTop: jQuery("#map_canvas_top").offset().top
    }, 2000);
}
function clearCircle()
{
    if (null != circle)
    {
        circle.setMap(null);
    }
}
