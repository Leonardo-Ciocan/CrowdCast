var getLocation = function(href) {
  var l = document.createElement("a");
  l.href = href;
  return l;
};

chrome.tabs.query({'active': true}, function(tab) {
  chrome.tabs.executeScript(null, {
    file: 'content.js'
  });
});
