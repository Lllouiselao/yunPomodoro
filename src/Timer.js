import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import RestartButton from "./RestartButton";
import PlayButton from "./PlayButton";
import PauseButton from "./PauseButton";
import SettingButton from "./SettingButton";
import { useContext, useState, useEffect, useRef } from "react";
import SettingsContext from "./SettingContext";

/* color for the Circular Pgrs Bar */
const focus = "#F3F9FD";
const rest = "#487FB3";

function Timer() {
  /* 从App.js传过来 SettingsContext的值 我们放在settingInfo 传onClick */
  const settingInfo = useContext(SettingsContext);
  /* 显示 开始暂定按钮 / focus和break的转换 / 记录还有多少时间剩余*/
  const [isPaused, setIsPaused] = useState(true);
  const [mode, setMode] = useState("work");
  const [secondsLeft, setSecondsLeft] = useState(0);

  const secondsLeftRef = useRef(secondsLeft);
  const isPausedRef = useRef(isPaused);
  const modeRef = useRef(mode);

  /* 刷新页面 */
  function refreshPage(){
    window.location.reload(false);
  }

  function tick() {
    secondsLeftRef.current--;
    /* setSecondsLeft(secondsLeft - 1); */
    setSecondsLeft(secondsLeftRef.current);
  }

  /* want to know how many sec we left */
  function initTimer() {
    setSecondsLeft(settingInfo.workMinutes * 60);
  }

  useEffect(() => {
    function switchMode() {
      const nextMode = modeRef.current === "work" ? "break" : "work";
      const nextSeconds =
        nextMode === "work"
          ? settingInfo.workMinutes * 60
          : settingInfo.breakMinutes * 60;
      setMode(nextMode);
      modeRef.current = nextMode;
  
      setSecondsLeft(nextSeconds);
      secondsLeftRef.current = nextSeconds;
    }

    secondsLeftRef.current = settingInfo.workMinutes * 60;
    setSecondsLeft(secondsLeftRef.current);


    initTimer();
    /* setInterval 里面需要ref 所以需要改变所有值去ref */
    const interval = setInterval(() => {
      if (isPausedRef.current) {
        return;
      }
      if (secondsLeftRef.current === 0) {
        return switchMode();
      }

      tick();
    }, 1000);

    return () => clearInterval(interval);
  }, [settingInfo]);

  const totalSeconds =
    mode === "work"
      ? settingInfo.workMinutes * 60
      : settingInfo.breakMinutes * 60;
  const percentage = Math.round((secondsLeft / totalSeconds) * 100);

  const minutes = Math.floor(secondsLeft / 60);
  /* 我们需要让个位数的时候 个位也有两位 */
  let seconds = secondsLeft % 60;
  if (seconds < 10) {
    seconds = "0" + seconds;
  }

  return (
    <div>
      {/* Circular Progress Bar and Progress checking */}
      <div style={{ marginBottom: "20px" }} className="name">
        {" "}
        云 Pomodoro Clock{" "}
      </div>
      <CircularProgressbar
        styles={{ marginTop: "20px" }}
        value={percentage}
        text={minutes + ":" + seconds}
        styles={buildStyles({
          textColor: rest,
          pathColor: rest,

          trailColor: focus,
        })}
      />
      {/* Three buttons: start, pause, restart */}
      <div style={{ marginTop: "20px" }}>
        {/* 只显示一个button 一开始隐藏掉PauseButton*/}
        {isPaused ? (
          <PlayButton
            onClick={() => {
              setIsPaused(false);
              isPausedRef.current = false;
            }}
          />
        ) : (
          <PauseButton onClick={()=>{
            setIsPaused(true);
            isPausedRef.current = true;
          }} />
        )}
        <RestartButton onClick={refreshPage} />
      </div>
      {/* Setting button(for setting times) */}
      <div style={{ marginTop: "20px" }}>
        {/* SettingButton change to setting Time Page */}
        <SettingButton
          onClick={() => {
            settingInfo.setShowSetting(true);
          }}
        />
      </div>
    </div>
  );
}

export default Timer;
