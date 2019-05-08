var copy = require("copy");

var source = process.argv[2];
var target = process.argv[3];

copy(source, target, function(err, files) {
  if (err) throw err;
});


