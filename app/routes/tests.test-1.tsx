import React, { useEffect, useState } from "react";
const MIN_WIDTH = 40;
const MIN_HEIGHT = 20;
const MAX_WIDTH = 200;
const MAX_HEIGHT = 100;
const STEP = 10;

export default function TestOne() {
  return (
    <>
      <h1 className={"text-xl font-bold justify-center"}>Test 1</h1>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <PulsatingButton />
      </div>
    </>
  );
}
const PulsatingButton = () => {
  // write your code here
  const [height, setHeight] = useState(MIN_HEIGHT);
  const [width, setWidth] = useState(MIN_WIDTH);
  const [isGrowing, setIsGrowing] = useState(true);

  useEffect(() => {
    // The button size updates every second
    const intervalId = setInterval(() => {
      setHeight((prevHeight) => {
        const grow = prevHeight + STEP;
        const shrink = prevHeight - STEP;
        // If growing, increase size by STEP, otherwise decrease by STEP
        if (isGrowing) {
          return grow <= MAX_HEIGHT ? grow : prevHeight;
        } else {
          return shrink >= MIN_HEIGHT ? shrink : prevHeight;
        }
      });
      setWidth((prevWidth) => {
        const grow = prevWidth + STEP;
        const shrink = prevWidth - STEP;
        // If growing, increase size, otherwise decrease
        if (isGrowing) {
          return grow <= MAX_WIDTH ? grow : prevWidth;
        } else {
          return shrink >= MIN_WIDTH ? shrink : prevWidth;
        }
      });
    }, 1000);
    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [isGrowing]);

  // The button reverses direction automatically when max height or max width is reached (whichever first)
  useEffect(() => {
    if (isGrowing) {
      if (height >= MAX_HEIGHT || width >= MAX_WIDTH) {
        setIsGrowing(false);
      }
    } else {
      if (height <= MIN_HEIGHT || width <= MIN_WIDTH) {
        setIsGrowing(true);
      }
    }
  }, [height, width, isGrowing]);

  // User can click the button to change the direction at any time(if it was growing, after click
  // it will be shrinking and the other way around)
  const handleClick = () => {
    setIsGrowing((prevIsGrowing) => !prevIsGrowing);
  };

  // Opposite direction to what the button is doing must be displayed in the button as an indicator
  const buttonText = isGrowing ? "Shrink" : "Grow";

  return (
    <button
      onClick={handleClick}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        transition: "width 1s, height 1s",
        backgroundColor: "lightblue",
        border: "1.5px solid black",
        borderRadius: "5px",
        fontSize: `${height / 2.5}px`,
        fontWeight: 100,
      }}
    >
      {buttonText}
    </button>
  );
};
