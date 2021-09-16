import * as React from 'react';
import { PathLine } from 'react-svg-pathline';

export default function App() {
   return (
      <div style={{ display: 'flex', padding: 0 }}>
         <div style={{ width: '100%', backgroundColor: 'grey' }}>
            <div style={{ height: 100, width: 100, backgroundColor: 'yellow', marginTop: 100 }} />
            <div style={{ height: 100, width: 100, backgroundColor: 'red', marginTop: 100 }} />
            <div style={{ height: 100, width: 100, backgroundColor: 'blue', marginTop: 600 }} />
            <svg
               style={{
                  height: document.documentElement.offsetHeight,
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
               }}
            >
               <PathLine
                  points={[
                     { x: 200, y: 100 },
                     { x: 200, y: 1000 },
                  ]}
                  stroke="red"
                  strokeWidth="6"
                  fill="none"
                  r={10}
               />
            </svg>
         </div>
      </div>
   );
}
