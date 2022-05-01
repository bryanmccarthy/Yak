import './App.css';
import React, { useState, useEffect } from 'react';
import Button from './Components/Button/Button';
import DisplayPrompt from './Components/Prompt/DisplayPrompt';
import { prompts } from './Components/Prompt/prompts';

function App() {

  const [prompt, setPrompt] = useState([]);
  const [darkMode, setDarkMode] = useState(true);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  function toggle() {
    setIsActive(!isActive);
  }

  function reset() {
    setSeconds(0);
    setIsActive(false);
  }

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  function displayPromptVisible() {
    setPrompt([fetchPrompt()]);
  }

  function fetchPrompt() {

    let min = 0;
    let max = prompts.length - 1;
    let index = Math.floor(Math.random() * (max - min + 1) + min);

    return prompts[index];
  }

  function toggleMode() {
    if (darkMode)
      setDarkMode(false);
    else
      setDarkMode(true)
  }

  return (
    <div className={ darkMode ? "Dark-App" : "App" }>
      <div className="Header">
        <div className="info-div">
          <Button text="Info" mode={ darkMode ? true : false}/>
          <span className="info-text">
            press yak and begin practicing the most popular interview questions
          </span>
        </div>
        <Button onClick={toggleMode} text={ darkMode ? "Light" : "Dark" } mode={ darkMode ? true : false}/>
      </div>
      <div className="yak">
        <Button className="yak-button" onClick={displayPromptVisible} text="Yak" mode={ darkMode ? true : false}/>
        <span className="yak-helper-text">Get an Interview Question</span>
      </div>
        <div className="App-Prompt">
          { <DisplayPrompt text={prompt} key={Math.random()} /> }
        </div>
        <div className="Seconds">{seconds}s</div>
      <div>
        <Button onClick={toggle} text= {isActive ? 'Pause' : 'Start'} mode={ darkMode ? true : false}/>
        <Button onClick={reset} text="reset" mode={ darkMode ? true : false}/>
      </div>
    </div>
  );
}

export default App;
