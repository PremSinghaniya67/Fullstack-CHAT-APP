# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

//-------------------------------------------------------------------------------------------------------------

react-router-dom : To navigate on Client side without page get reLoading
react-host-toast : To show notification . (like - Flash for backend ) -->https://react-hot-toast.com/


tailwind for vite : to use taiwind css 
daisyUI : for tailwind pre-built components . 
zustand : for state management (like redux ) 
axios : as we not want to use fetch of react , beacuse axios provide more features.

lucide-react : for icons use inside react

Note : daisyUI also provide themes for our pages as well . 
To use : add script in tailwind.config.js , then
    1. add that them into html tag of index.html so that it can apply for entire pages. Otherwise it applied only where u add (data-theme="<theme-name>")
    or 2. add in Js file and use it.

socket.io-client : 
    where we should use : Just after the login we need to establish connection of socket server . So we should use to connection method in useAuthStore inside store folder.















code : https://github.com/burakorkmez/fullstack-chat-app 