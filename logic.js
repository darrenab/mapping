const newLocal = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojson";
var APILink = newLocal


var myMap = L.map("map", {
  center: [0.7128, 114.0059],
  zoom: 4
  });



// Define streetmap and darkmap layers
var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
});

var darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.dark",
    accessToken: API_KEY
  }).addTo(myMap);

d3.json(APILink, function(d){
  
  d.features.forEach(function(data){

    // console.log(data.properties.mag)

    L.circle([data.geometry.coordinates[1],data.geometry.coordinates[0]],{
      radius: ((data.properties.mag)*20000),
      stroke:'white',
      color:'lightblue'      
    }).addTo(myMap)
  })
})

// Define a baseMaps object to hold our base layers
var baseMaps = {
  "Street Map": streetmap,
  "Dark Map": darkmap
};
// 
// Create overlay object to hold our overlay layer
// var overlayMaps = {
//   Earthquakes: earthquakes
// };

L.control.layers(baseMaps, {
  collapsed: false
}).addTo(myMap);




