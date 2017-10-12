/*Test : */
module.exports = () => {
<<<<<<< HEAD
  const data = { markers : []}
  data.markers.push({
=======
  const data = {posts: []}
  data.posts.push({
>>>>>>> parent of a99b1006... Affichage des cluster avec les données en ligne fonctionnel
    id : 10,
    title: "Coucou",
    author : "Lucas",
  })
  return data
}

/*Emplacements choisis : */
  // var S1 = ["Statio'Pass",8 ,49];
  var S1 = ["Statio'Minute",8.1 ,49];
  var S2 = ["Statio'Minute",7.1, 48];
  // var S3 = ["Statio'Pass",8, 49];
  var S3 = ["Statio'Minute",8, 49];
  var S4 = ["Statio'Minute",7, 48];

/*Implémentation de 10 spots dans la BDD */
module.exports = () => {
  const data_2 = { spots: [] }
  data_2.spots.push({
    id:1,
    spot_type:S1[0],
    libre : 0,
    comments:"STP.0001.FR.10/03/05",
    location:{
      id:19,
      gps:{
        longitude:S1[1],
        latitude:S1[2]
      },
      address:"non installé",
      zip_code:"",
      town:"Strasbourg",
      country:"France",
    },
    customs:null,
    cal_active_is_dirty:null,
    plug_type:null,
    plug_power:null,
    type:"spot", 
    links:{
      self:{
        href: "https://api.technolia.fr/spots/1",
      },
      device:{
        title:"the device owning this spot",
        href: "https://api.technolia.fr/devices/1"
      },
      master_device:{
        title:"the master device this spot is connected to",
        href: "https://api.technolia.fr/devices/5"
      },
    }
  })

  data_2.spots.push({
    id:2,
    spot_type:S2[0],
    comments:"STP.0001.FR.10/03/05",
    libre : 1,
    location:{
      id:19,
      gps:{
        longitude:S2[1],
        latitude:S2[2]
      },
      address:"non installé",
      zip_code:"",
      town:"Strasbourg",
      country:"France",
    },
    customs:null,
    cal_active_is_dirty:null,
    plug_type:null,
    plug_power:null,
    type:"spot", 
    links:{
      self:{
        href: "https://api.technolia.fr/spots/2",
      },
      device:{
        title:"the device owning this spot",
        href: "https://api.technolia.fr/devices/1"
      },
      master_device:{
        title:"the master device this spot is connected to",
        href: "https://api.technolia.fr/devices/5"
      },
    }
  })

  data_2.spots.push({
    id:3,
    spot_type:S3[0],
    comments:"STP.0001.FR.10/03/05",
    libre : 0,
    location:{
      id:19,
      gps:{
        longitude:S3[1],
        latitude:S3[2],
      },
      address:"non installé",
      zip_code:"",
      town:"Strasbourg",
      country:"France",
    },
    customs:null,
    cal_active_is_dirty:null,
    plug_type:null,
    plug_power:null,
    type:"spot", 
    links:{
      self:{
        href: "https://api.technolia.fr/spots/3",
      },
      device:{
        title:"the device owning this spot",
        href: "https://api.technolia.fr/devices/1"
      },
      master_device:{
        title:"the master device this spot is connected to",
        href: "https://api.technolia.fr/devices/5"
      },
    }
  })

  data_2.spots.push({
    id:4,
    spot_type:S4[0],
    comments:"STP.0001.FR.10/03/05",
    libre : 1,
    location:{
      id:19,
      gps:{
        longitude:S4[1],
        latitude:S4[2]
      },
      address:"non installé",
      zip_code:"",
      town:"Strasbourg",
      country:"France",
    },
    customs:null,
    cal_active_is_dirty:null,
    plug_type:null,
    plug_power:null,
    type:"spot", 
    links:{
      self:{
        href: "https://api.technolia.fr/spots/4",
      },
      device:{
        title:"the device owning this spot",
        href: "https://api.technolia.fr/devices/1"
      },
      master_device:{
        title:"the master device this spot is connected to",
        href: "https://api.technolia.fr/devices/5"
      },
    }
  })

  return data_2
}

