var wrench = require("wrench")

var source = process.argv[2];
var target = process.argv[3];

wrench.copyDirSyncRecursive(source, target, {
  forceDelete: true
});


