// vite.config.js
import { defineConfig } from "file:///C:/Users/HAYAT%20TRADERS/Desktop/React/pexels-clone/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/HAYAT%20TRADERS/Desktop/React/pexels-clone/node_modules/@vitejs/plugin-react/dist/index.mjs";
import dotenv from "file:///C:/Users/HAYAT%20TRADERS/Desktop/React/pexels-clone/node_modules/dotenv/lib/main.js";
var vite_config_default = defineConfig({
  plugins: [react()],
  define: {
    // env variable from .env file
    "process.env.AUTH_CODE": JSON.stringify(process.env.AUTH_CODE)
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxIQVlBVCBUUkFERVJTXFxcXERlc2t0b3BcXFxcUmVhY3RcXFxccGV4ZWxzLWNsb25lXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxIQVlBVCBUUkFERVJTXFxcXERlc2t0b3BcXFxcUmVhY3RcXFxccGV4ZWxzLWNsb25lXFxcXHZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9IQVlBVCUyMFRSQURFUlMvRGVza3RvcC9SZWFjdC9wZXhlbHMtY2xvbmUvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0J1xuaW1wb3J0IGRvdGVudiBmcm9tICdkb3RlbnYnO1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW3JlYWN0KCldLFxuICBkZWZpbmU6e1xuICAgIC8vIGVudiB2YXJpYWJsZSBmcm9tIC5lbnYgZmlsZVxuICAgICdwcm9jZXNzLmVudi5BVVRIX0NPREUnOkpTT04uc3RyaW5naWZ5KHByb2Nlc3MuZW52LkFVVEhfQ09ERSlcbiAgfVxufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBbVYsU0FBUyxvQkFBb0I7QUFDaFgsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sWUFBWTtBQUduQixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTLENBQUMsTUFBTSxDQUFDO0FBQUEsRUFDakIsUUFBTztBQUFBO0FBQUEsSUFFTCx5QkFBd0IsS0FBSyxVQUFVLFFBQVEsSUFBSSxTQUFTO0FBQUEsRUFDOUQ7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
