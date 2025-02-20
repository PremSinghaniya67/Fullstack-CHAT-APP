import { create } from "zustand";

export const useThemeStore=create((set)=>({ //return object
    // 1. Method 1st......
    // theme:"coffee",
    // setTheme:(theme)=>set({theme:theme}),

// 2nd Method ..... using localStorage
    theme : localStorage.getItem("chat-theme")||"coffee",
    setTheme :(theme)=>{
        localStorage.setItem("chat-theme",theme);
        set({theme});
    },
}))