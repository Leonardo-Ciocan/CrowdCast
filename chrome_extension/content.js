// only inject on subreddit pages
var pos = document.location.pathname;

if (/^(\/|)r\/[a-zA-Z0-9]*(\/|)$/.test(pos)) {
  //  create element to be inserted
  var node = document.createElement('div');
  node.style.position = 'fixed';
  node.style.top = 0;
  node.style.left = 0;
  node.textContent = 'Injection!';
  
  document.body.appendChild(node);
}

