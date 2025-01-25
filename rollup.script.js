const fs = require('fs');
const util = require('util');

const readdir = util.promisify(fs.readdir);
const stat = util.promisify(fs.stat);

const getDirectories = (path, files) => {
  const promises = files.map((i) => new Promise((resolve) => stat(`${path}/${i}`).then((file) => {
    resolve({
      name: i,
      isDir: file.isDirectory(),
    });
  })));

  return Promise.all(promises);
};

const isDir = (fileObj) => !!fileObj.isDir;

export const getVariantsFoldersNames = () => readdir('src/variants')
  .then((files) => getDirectories('src/variants', files))
  .then((files) => files.filter(isDir))
  .then((dirs) => dirs.map((i) => i.name));

export const getCampaignName = (dirName) => {
  const res = dirName.match(/[^\/]*$/);
  let cname = res && res[0] ? res[0] : 'campaign';

  console.log("CNAME", cname, dirName)
  return cname;
};
