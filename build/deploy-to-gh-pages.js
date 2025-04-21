const fs = require("fs");
const dir = "dist/frescolist/browser";

if (!fs.existsSync(dir)) {
  console.error("Directory does not exist:", dir);
  process.exit(1);
}

const path = require("path");

const indexHtml = path.join(dir, "index.html");
const notFoundFile = path.join(dir, "404.html");

fs.copyFile(indexHtml, notFoundFile, err => { });

const ghpages = require('gh-pages');

ghpages.publish(dir, {
  nojekyll: true,
  cname: "frescolist.frw.ai",
  push: true,
  message: "Auto-generated commit"
}, err => { console.log(err) }).then(() => {
  console.log("Published to gh-pages");
});
