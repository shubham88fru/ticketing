module.exports = {
  webpackDevMiddleWare: (config) => {
    config.watchOptions.poll = 300;
    return config;
  },
};
