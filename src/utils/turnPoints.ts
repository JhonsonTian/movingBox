import type { RectReadOnly } from 'react-use-measure';
import { Pointer } from './types';

const getAdjusted = (curWidth: number, turnPoints: Pointer[]) => {
   const referenceWidth = 1425;
   return turnPoints.map(item => ({
      x: item.x * (curWidth / referenceWidth),
      y: item.y,
   }));
};

export const initTurnPoints = (startStopPoint: Pointer[], box: RectReadOnly[]) => {
   const adjustedPoint = getAdjusted(document.documentElement.offsetWidth, startStopPoint);
   const points = [adjustedPoint[0]];

   for (let i = 0; i < box.length; i++) {
      const { height, left, width, top } = box[i];
      const lastPoint = points[points.length - 1];
      const adjustedTop = top + window.pageYOffset;
      const childWidth = left + width;

      if (i === 0) {
         const restWidth = childWidth - lastPoint.x;
         const box2Top = box[1].top + window.pageYOffset;
         points.push({ x: lastPoint.x, y: adjustedTop - 25 });
         points.push({ x: lastPoint.x + restWidth + 25, y: adjustedTop - 25 });
         points.push({
            x: lastPoint.x + restWidth + 25,
            y: box2Top - 25,
         });
      } else if (i === 1) {
         const restWidth = lastPoint.x - left;
         const box3Top = box[2].top + window.pageYOffset;
         points.push({ x: lastPoint.x - restWidth - 25, y: adjustedTop - 25 });
         points.push({ x: lastPoint.x - restWidth - 25, y: box3Top - 25 });
      } else {
         const restWidth = childWidth - lastPoint.x;
         points.push({ x: lastPoint.x + restWidth + 25, y: adjustedTop - 25 });
         points.push({ x: lastPoint.x + restWidth + 25, y: adjustedTop + height + 25 });
         points.push({ x: points[0].x, y: adjustedTop + height + 25 });
      }
   }
   points.push(adjustedPoint[1]);
   return points;
};
