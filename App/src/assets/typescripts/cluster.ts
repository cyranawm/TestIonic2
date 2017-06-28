/* Fonction de mise en cluster des markers */

export function create_cluster():L.MarkerClusterGroup{
    var cluster = L.markerClusterGroup({
        polygonOptions: {
            fillColor: '#3887be',
            color: '#3887be',
            weight: 2,
            opacity: 1,
            fillOpacity: 0.5
        },disableClusteringAtZoom: 18,
        
    iconCreateFunction: function (cluster) {
        var childMarkers = cluster.getChildCount();
        var CN = "marker-cluster marker-cluster-green";
        return L.divIcon({ html: "<p>" +"x / " + childMarkers +  "</p>",className: CN, iconSize: L.point(40, 40)});
    }
    /* Partie js du site a traduire */
    /* Seul problème : le _.countBy 
    var counts = _.countBy(childMarkers, function(marker) {
      return marker.options.statecluster;
    });
    if (counts.libre&&counts.occupe) {
        if (!counts.indisponibles) {
         var total= counts.libre+counts.occupe;
        }
        else{
          var total= counts.libre+counts.occupe+counts.indisponibles;
        }
    }
    else if (counts.indisponibles&&!counts.occupe&&!counts.libre){
        var total= counts.indisponibles;
         counts.libre=0;
    }
    else if (counts.libre&&!counts.occupe){
        var total=counts.libre;
         counts.occupe=0;
    }
    else if (!counts.libre&&counts.occupe){
        var total= counts.occupe;
         counts.libre=0;
    }
    if (counts.occupe =="0") {
      var classname="marker-cluster marker-cluster-green";
    }
   else  if (counts.indisponibles==total){
      var classname="marker-cluster marker-cluster-disconnected";
    }
    else if (counts.occupe==counts.libre){
      var classname="marker-cluster marker-cluster-orange";
    }
    else if (counts.occupe==total){
      var classname="marker-cluster marker-cluster-red";
    }
    else if (counts.occupe > (total/2)){
      var classname="marker-cluster marker-cluster-orange";
    }
    else{
       var classname="marker-cluster marker-cluster-orange";
    }
 
    return L.divIcon({ html: "<p>"+counts.libre+" / "+total+"</p>",className: classname, iconSize: L.point(40, 40)});
  },
 
});

}
*/
    });
return cluster;
}