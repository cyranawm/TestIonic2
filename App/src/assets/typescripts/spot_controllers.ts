export function getAllSpots(data){
  var spots = Array<{id,lat,lng,type_spot,address,city,links}>();
  for(let index in data){
    spots.push({
      lat : data[index]["location"]["gps"]["latitude"],
      lng : data[index]["location"]["gps"]["longitude"],
      id : data[index]["id"],
      type_spot : data[index]["spot_type"],
      address : data[index]["location"]["address"],
      city : data[index]["location"]["town"],
      links : data[index]["links"]["device"]["href"],
    });        
  }
  return spots
};