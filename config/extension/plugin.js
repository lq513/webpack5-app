class Plugin {
  apply(compiler) {
    compiler.hooks.make.tap('SomePlugin', (compilation) => {
      // console.log(compilation, 3333);
    });
  }
}

module.exports = Plugin;