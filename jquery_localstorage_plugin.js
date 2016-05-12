//  jquery plugin for using localstorge or cookies author Daniel Pfeifer
(function($){
  $.store = function(key, setData, expires, path, domain, secure) {
    if (typeof(setData) === 'undefined' && key){
      try {
       fetchData = localStorage[key];
       if (fetchData){
        return fetchData;
      } else {
        return null;
      }
    } catch(exception){
      if (navigator.cookieEnabled){
        fetchData = $.cookies(key);
        if (fetchData){
          return fetchData;
        }
      } else{
        return null;
      }
    }
  } else if (key && setData) {
      // here is where we set the data
      try {
        localStorage.setItem(key, setData);
        return true;
      } catch(exception){
        if (navigator.cookieEnabled){
          expires = expires || -1;
          path = path || window.location.pathname;
          domain = domain || window.location.host;
          secure = secure || false;

          $.cookie(key, setData, {'expires': expires, 'path': path, 'domain': domain, 'secure': secure});
          return true;
        } else{
          return false;
        }
      }
    } else {
      return false;
    }
  };
  // delete function
  $.store.delete = function(key) {
    try {
      localStorage.removeItem(key);
      $.cookie(key, null, { path: '/' });
      return true;
    } catch (exception){
      $.cookie(key, null, { path: '/' });
      return true;
    }
  };
})(jQuery);