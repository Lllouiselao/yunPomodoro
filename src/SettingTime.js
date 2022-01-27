import { useContext } from "react";
import ReactSlider from "react-slider";
import BackButton from "./BackButton";
import SettingsContext from "./SettingContext";
import './slider.css'


function SettingTime() {
  /* settingContext 从App.js 的provider里传入 再传到这里 */
  const settingInfo = useContext(SettingsContext);

  return (
    <div style={{ textAlign: "left" }}>
      <label >Focus Time: {settingInfo.workMinutes} : 00</label>
      <ReactSlider className={"slider"} 
        thumbClassName={"thumb"}
        trackClassName={"track"}
        value={settingInfo.workMinutes}
        /* app.js中 settingConext Provider导入的setFoucusMin */
        onChange={ newValue => settingInfo.setFocusMinutes(newValue)}
        min={1}
        max={120} />
      <label>Break Time: {settingInfo.breakMinutes}: 00</label>
      <ReactSlider className={"slider"} 
        thumbClassName={"thumb"}
        trackClassName={"track"}
        value={settingInfo.breakMinutes}
        onChange={ newValue => settingInfo.setRestMinutes(newValue)}
        min={1}
        max={120} />

      <div style={{textAlign:'center', marginTop:'20px'}}>
           {/* 传进来的 settingInfo 我们onclick showSetting false 返回到Timer页面 */}
        <BackButton className="with-text" onClick={()=>{
          settingInfo.setShowSetting(false)
        }} />
      </div>
    </div>
  );
}

export default SettingTime;
