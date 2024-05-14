const withMT = require("@material-tailwind/react/utils/withMT");

export default withMT({
 content: ["./index.html", "./src/**/*.{js,jsx,ts,vue,tsx}"],
 theme: {
  extend: {},
 },
 plugins: [],
});
