module.exports = (api, options, rootOptions) => {
  api.extendPackage({
    dependencies: {
      iview: "^3.4.1"
    }
  });
  // api.render("../ui/element");
  // api.injectImports("src/vendor/index.js", `import './iview.js'`);
  api.onCreateComplete(() => {});
};
