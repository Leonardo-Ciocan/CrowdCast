// load jquery (super hacky) TODO
function loadScript(url, callback) {
  // Adding the script tag to the head 
  var head = document.getElementsByTagName('head')[0];
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = url;
  
  // Then bind the event to the callback function.
  // There are several events for cross browser compatibility.
  script.onreadystatechange = callback;
  script.onload = callback;
  // Fire the loading
  head.appendChild(script);
}

function existsAtServer(relurl, parentelem) {
  // transform relative url to filtered fullurl
  var fullurl = "www.reddit.com" + relurl;
  var filtered = fullurl.replace(/\//g, '');
  filtered = filtered.replace(/:/g, '');
  filtered = filtered.replace(/\?/g, '');
  filtered = "/episode/" + filtered;
  // make ajax query to server.
  $.ajax({
    url: 'http://localhost:8080',
        data: filtered, 
        dataType: 'json',
        success: function(result) {
                   annotateElem(result.websiteUrl, parentelem);
                 }
  });
}

function annotateElem(sitelink, parentelem) {
  alert("annotated! : " + sitelink);
  jQuery('<a/>', {
        id: 'foo',
        href: 'http://localhost:8080/episodes' + sitelink,
        title: 'happy easter',
        rel: 'external',
        text: 'Play on CrowdCast'
  }).appendTo($(parentelem));
}

function main() {
  var pos = document.location.pathname;
  // inject on subreddit pages
  if (/^(\/|)r\/[a-zA-Z0-9]*(\/top|\/new|)(\/|)*$/.test(pos)) {
    var re = /^\/r\/([a-zA-Z0-9]*)(\/|).*$/;
    var subname = pos.match(re)[1];
    

    // inject link on subreddit frontpage
    var clientUrl = "http://example.com/";
    var imageUrl  = "https://lh3.ggpht.com/OOXV4V9YyovafA10xZhq0QgWNwFwCEhMI9kWJ2FDkjMmLa7rDWJmSmnsgOtMWdDGg3A=w300"

    var par = $( 'div' ).filter(function() {
      return $(this).attr('id') == 'header-bottom-left';
    });

    jQuery('<a/>', {
          id: 'foo',
          href: clientUrl + "?r=" + subname,
          title: 'happy easter',
          rel: 'external',
          text: 'Play on CrowdCast'
    }).appendTo($(par));
    
    
    

    // // jquery all title elements
    // var titles = $( 'p' ).filter( '.title' );
    // 
    // // get href from each 'a' element in class.
    // titles.each(function() {
    //   var children = $(this).children();
    //   var links = children.filter( 'a' );
    //   var url = links.attr("href");
    //   existsAtServer(url, this);
    //   return true;
    // });
  }
  
  // inject in comment thread
  if (/^(\/|)r\/[a-zA-Z0-9]*\/comments\/.*/.test(pos)) {
  }

}

loadScript('https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js', main);
