import { defineConfig } from "cypress";

export default defineConfig({
  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },

  e2e: {
    baseUrl: "http://localhost:5173",
  },
  projectId: "xkm1h4",
});

// module.exports = {
//   projectId: "xkm1h4",
// };
