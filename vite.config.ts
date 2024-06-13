import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  console.log(env.VITE_BACKEND_URL);
  return {
    // dev specific config
    base: "/",
    server: {
      host: "0.0.0.0",
      proxy: {
        "/api": {
          target: env.VITE_BACKEND_URL,
          changeOrigin: true,
          secure: false,
        },
      },
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    plugins: [react()],
  };
});

// // https://vitejs.dev/config/
// export default defineConfig({
//   server: {
//     host: "0.0.0.0",
//     proxy: {
//       "/api": {
//         target: loadEnv(),
//         secure: false,
//       },
//     },
//   },
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "./src"),
//     },
//   },
//   plugins: [react()],
// });
