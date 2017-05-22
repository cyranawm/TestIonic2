
//fonction de recuperation d'un cookie
function getCookie(name){
    var pattern = RegExp(name + "=.[^;]*");
    matched = document.cookie.match(pattern);
    if(matched){
        var cookie = matched[0].split('=');
        return cookie[1];
    }
    return false;
}
//fcontion de creation d'un cookie
function createCookie(name,value,min) {
  var date = new Date();
  var minutes = min;
  date.setTime(date.getTime() + (minutes * 60 * 1000));
  var expires = "; expires="+date.toGMTString();
  document.cookie = name+"="+value+expires+"; path=/";
}

var delete_cookie = function(name) {
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};