module.exports = {
  mount: {
    // Routes every request to the src/ directory (on dev environment)
    "public": {url: "/", static: true, resolve: false},
    "src": {url: "/dist"},
  },
  plugins: [["@snowpack/plugin-webpack"], ["@snowpack/plugin-babel"]],
  devOptions: {
    "port": parseInt(process.env.PORT) || 3000
  }
};