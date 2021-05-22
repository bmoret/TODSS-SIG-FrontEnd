process.env.SNOWPACK_PUBLIC_API_URL = process.env.SERVER || 'http://localhost:8080';

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