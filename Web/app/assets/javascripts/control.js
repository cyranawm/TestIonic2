 
   var minute = new L.LayerGroup();
   var pass = new L.LayerGroup();
   var elec = new L.LayerGroup();
   var aine = new L.LayerGroup();
  
  $('#minute').change(function() {
      var $checkbox = $(this);
      if ($checkbox.prop('checked')) {
          clusters.removeLayer(elec);
          clusters.removeLayer(pass);
          clusters.removeLayer(aine);
      } else {
          clusters.addLayer(elec);
          clusters.addLayer(pass);
          clusters.addLayer(aine);
      }
  });
  $('#elec').change(function() {
      var $checkbox = $(this);
      if ($checkbox.prop('checked')) {
         clusters.removeLayer(minute);
         clusters.removeLayer(pass);
         clusters.removeLayer(aine);
      } else {
          clusters.addLayer(minute);
          clusters.addLayer(pass);
          clusters.addLayer(aine);
      }
  });
  $('#pass').change(function() {
      var $checkbox = $(this);
      if ($checkbox.prop('checked')) {
         clusters.removeLayer(minute);
         clusters.removeLayer(elec);
         clusters.removeLayer(aine);
      } else {
          clusters.addLayer(elec);
          clusters.addLayer(minute);
          clusters.addLayer(aine);
      }
  });



  document.getElementById('close').onclick = function(){
        $('#message').hide();
        return false;
    };