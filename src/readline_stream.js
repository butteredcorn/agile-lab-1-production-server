const fs = require("fs");

let getLines = function getLines(filename, lineCount, callback) {
  let stream = fs.createReadStream(filename, {
    flags: "r",
    encoding: "utf-8",
    fd: null,
    mode: 438, // 0666 in Octal
    bufferSize: 64 * 1024
  });

  let data = "";
  let lines = [];
  stream.on("data", function(moreData) {
    data += moreData;
    lines = data.split("\n");
    // probably that last line is "corrupt" - halfway read - why > not >=
    if (lines.length > lineCount + 1) {
      stream.destroy();
      lines = lines.slice(0, lineCount); // junk as above
      callback(false, lines);
    }
  });

  stream.on("error", function() {
    callback("Error");
  });

  stream.on("end", function() {
    callback(false, lines);
  });
};
var o;
getLines("./text.txt", 20, function(err, lines) {
  console.log(lines);
});

console.log(o);
