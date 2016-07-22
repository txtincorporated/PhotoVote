var x =10;
localStorage.x = x;
console.log('x (from RAM) = ' + x);
console.log('x (from localStorage) = ' localStorage.x);

Number.prototype.bee = 'buzzzzzz!!!!';
console.log('x.bee ' + x.bee);

var y = {}
y.bee = 'I make honey!';
console.log('y.beee ' + y.bee);
