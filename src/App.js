import { React, useEffect } from "react";
import { App as CapacitorApp } from "@capacitor/app";
import { Preferences } from "@capacitor/preferences"; // ✅ Import Preferences
import { StatusBar, Style } from "@capacitor/status-bar";
import { Capacitor } from "@capacitor/core";
import Cookies from "js-cookie";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { mainRoutes } from "./router/router";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'; // ✅ Import here


import "./App.css";

const router = createBrowserRouter(mainRoutes);

const restorePreferenceskey = async (key) => {
  const { value } = await Preferences.get({ key: key });

  if (value) {
    await Preferences.set({ key: key, value: String(value) });

    Cookies.set(key, value, {
      secure: true,
      sameSite: "None",
      path: "/",
    });
    console.log("Value restored from Preferences to Cookies:", value);
  }
};

function App() {
  useEffect(() => {
    restorePreferenceskey("authToken");
    restorePreferenceskey("user_id");
    restorePreferenceskey("expiryTimestamp");
    const adjustStatusBar = async () => {
      if (Capacitor.getPlatform() !== "web") {
        // ✅ Prevents errors on web
        await StatusBar.setOverlaysWebView({ overlay: false });
        await StatusBar.setStyle({ style: Style.Light });
        await StatusBar.show();
        // await StatusBar.setBackgroundColor()
      }
    };
    adjustStatusBar();
  }, []);

  return (
    <>
      <RouterProvider router={router} />
      {/* {process.env.NODE_ENV === "development" && (
        <ReactQueryDevtools initialIsOpen={false} />
      )} */}
    </>
  );
}

export default App;