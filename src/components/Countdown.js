import React, { useEffect, useState } from "react";

const Countdown = () => {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  //const [display, setDisplay] = useState("00:00");
  const [active, setActive] = useState(false);

  const totalSeconds = parseInt(minutes) * 60 + parseInt(seconds);
  useEffect(() => {
    let interval = null;
    let timer = totalSeconds;
    if (active) {
      interval = setInterval(() => {
        let newminutes = Math.floor(parseInt(timer / 60, 10));
        let newseconds = Math.floor(parseInt(timer % 60, 10));

        setMinutes(newminutes);
        setSeconds(newseconds);

        timer = timer - 1;
      }, 1000);
    } else if (!active && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [active]);

  const formatTimer = (t) => {
    let m = Math.floor(parseInt(t / 60, 10));
    let s = Math.floor(parseInt(t % 60, 10));
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;
    return `${m}:${s}`;
  };

  const handleStart = () => {
    setActive(true);
    //let interval = setInterval(() => {});
  };

  const togglePause = () => {
    setActive(!active);
  };

  const handleReset = () => {
    setMinutes(0);
    setSeconds(0);
    setActive(false);
  };

  return (
    <>
      <input
        type="number"
        value={minutes}
        onChange={(e) => setMinutes(e.target.value)}
      />
      Minutes
      <input
        type="number"
        value={seconds}
        onChange={(e) => setSeconds(e.target.value)}
      />
      Seconds
      <br />
      <button onClick={handleStart} disabled={active}>
        Start
      </button>
      <button onClick={togglePause}>Pause/Resume</button>
      <button onClick={handleReset} disabled={active}>
        Reset
      </button>
      <h1>{formatTimer(totalSeconds)}</h1>
    </>
  );
};

export default Countdown;
