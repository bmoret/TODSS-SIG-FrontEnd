module.exports = {
  mount: {
    // Routes every request to the src/ directory (on dev environment)
    "public": "/",
    "src": "/dist",
  },
  plugins: [["@snowpack/plugin-webpack"], ["@snowpack/plugin-optimize"]],
};