import logo from "./logo.svg";
import "./App.css";
import Timer from "./Timer";
import SettingTime from "./SettingTime";

import { useState } from "react";
import SettingsContext from "./SettingContext";

function App() {
  /* 这里用了几个hook 1. 隐藏settingpage 2.focusMin的initial 3.RestMin的initial */
  const [showSetting, setShowSetting] = useState( false);
  const [focusMinutes, setFocusMinutes] = useState( 45);
  const [restMinutes, setRestMinutes] = useState(15);

  return (
    <main>
      <SettingsContext.Provider value={{
        /* pass in showSetting and setShowSetting 让setting button work */
        showSetting,
        setShowSetting,
        workMinutes: focusMinutes,
        breakMinutes: restMinutes,

        setFocusMinutes,
        setRestMinutes,
      }}>
        {/* /* hiding setting page */ }
        {/* init showSetting is false if it's True show SettingTime or show Timer */}
        {showSetting ? <SettingTime /> : <Timer />}{" "}
      </SettingsContext.Provider>
    </main>
  );
}

export default App;
