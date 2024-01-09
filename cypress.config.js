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
  projectId: "a7bq2k",
});

// module.exports = {
//   projectId: "xkm1h4",
// };
