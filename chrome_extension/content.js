// Content injection, called by backround.js
alert("Hello, im working");
//  create element to be inserted
var node = document.createElement('div');
node.style.position = 'fixed';
node.style.top = 0;
node.style.left = 0;
node.textContent = 'Injection!';

document.body.appendChild(node);

