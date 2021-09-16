/* eslint no-await-in-loop: 'off' */
import React from 'react';
import { PathLine } from 'react-svg-pathline';
import { useSpring, animated } from 'react-spring';
import useMeasure from 'react-use-measure';
import { initTurnPoints, Pointer, createTravelPath } from './utils';
import './App.css';

function App() {
   const [box1, bound1] = useMeasure();
   const [box2, bound2] = useMeasure();
   const [box3, bound3] = useMeasure();
   const [scrollIndex, setScrollIndex] = React.useState(0);
   const [turnPoints, setTurnPoints] = React.useState<Pointer[]>([]);
   const { scroll } = useSpring({ scroll: scrollIndex });

   const travelPath = React.useMemo(
      () =>
         createTravelPath(turnPoints, document.documentElement.offsetHeight - window.innerHeight),
      [turnPoints],
   );

   const xData = travelPath.map(item => item.x);
   const yData = travelPath.map(item => item.y);
   const range = generateRange(travelPath.length);

   React.useEffect(() => {
      const initStartStopPoint: Pointer[] = [
         { x: 600, y: 100 },
         { x: 600, y: document.documentElement.offsetHeight - 100 },
      ];
      const result = initTurnPoints(initStartStopPoint, [bound1, bound2, bound3]);
      setTurnPoints(result);
   }, [bound1, bound2, bound3]);

   React.useEffect(() => {
      const onWindowScroll = () => {
         const y = Math.round(window.pageYOffset);
         const isYIndexBetweenAxisY = y >= 0 && y <= range.length - 1;
         if (isYIndexBetweenAxisY) {
            setScrollIndex(range[y]);
         } else setScrollIndex(1);
      };

      window.addEventListener('scroll', onWindowScroll);
      return () => window.removeEventListener('scroll', onWindowScroll);
   }, [range]);

   return (
      <div className="container">
         <div className="body">
            {turnPoints.length > 0 && (
               <svg
                  className="svg-container"
                  style={{
                     height: document.documentElement.offsetHeight,
                  }}
               >
                  <PathLine points={turnPoints} stroke="red" strokeWidth="6" fill="none" r={10} />
               </svg>
            )}
            <div ref={box1} className="box" />
            <div ref={box2} className="box2" />
            <div ref={box3} className="box3" />
         </div>

         <animated.div
            className="package"
            style={{
               x: scroll.to({ range, output: xData }),
               y: scroll.to({ range, output: yData }),
            }}
         />
      </div>
   );
}

export default App;

const generateRange = (numOfElement: number) => {
   const base = numOfElement - 1;
   const step = 1 / base;
   const result = [0];
   for (let i = 1; i < numOfElement; i++) {
      result.push(result[i - 1] + step);
   }
   return result;
};
