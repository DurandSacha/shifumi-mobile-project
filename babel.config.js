module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    /*
    resolve: {
      modules: [__dirname,path.join(__dirname, '../src'), 'node_modules']
    }
    */
  };
};
