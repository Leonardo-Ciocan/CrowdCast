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

function existsAtServer(relurl) {
  // transform relative url to filtered fullurl
  var fullurl = "www.reddit.com" + relurl;
  var filtered = fullurl.replace('/', '');
  filtered = filtered.replace(':', '');
  // make ajax query to server. 202 found, 404 not found
  
  return 'http://example.com/';
  // return null on not-extist
}

function main() {
  // only inject on subreddit pages
  var pos = document.location.pathname;
    
  if (/^(\/|)r\/[a-zA-Z0-9]*(\/|)$/.test(pos)) {
    // jquery all title elements
    var titles = $( 'p' ).filter( '.title' );

    // get href from each 'a' element in class.
    titles.each(function() {
      var children = $(this).children();
      var links = children.filter( 'a' );
      var url = links.attr("href");
      var sitelink = existsAtServer(url);
      if (sitelink) {
        // annotate elem
        jQuery('<a/>', {
              id: 'foo',
              href: sitelink,
              title: 'hey :P',
              rel: 'external',
              text: 'Play on CrowdCast'
        }).appendTo($(this));
      }
      return true;
    });

    // create element to be inserted
    var node = document.createElement('div');
    node.style.position = 'fixed';
    node.style.top = 0;
    node.style.left = 0;
    node.textContent = 'Injection!';
    
    document.body.appendChild(node);
  }
}


loadScript('https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js', main);
