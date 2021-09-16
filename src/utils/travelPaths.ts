import { Pointer, Move } from './types';

const getTotalTravelinPX = (data: Pointer[]) => {
   let total = 0;
   for (let i = 1; i < data.length; i++) {
      total += Math.abs(data[i].x - data[i - 1].x) + Math.abs(data[i].y - data[i - 1].y);
   }
   return total;
};

const checkMove = (curPoint: Pointer, nextCorner: Pointer) => {
   if (curPoint.x < nextCorner?.x) {
      return Move.RIGHT;
   }
   if (curPoint.x > nextCorner?.x) {
      return Move.LEFT;
   }
   return Move.DOWN;
};

export const createTravelPath = (data: Pointer[], verticalTravel: number) => {
   if (data.length === 0) return [];
   const travelPx = getTotalTravelinPX(data);
   const stepMove = travelPx / verticalTravel;
   const path = [data[0]];
   let curTPoint = 0;
   for (let i = 0; i < verticalTravel; i++) {
      const { x, y } = path[i];
      if (checkMove(data[curTPoint], data[curTPoint + 1]) === Move.DOWN) {
         const moveDownTo = y + stepMove;
         const moveDownIsGreaterThanTpoint = moveDownTo > data[curTPoint + 1]?.y;
         if (moveDownIsGreaterThanTpoint) {
            curTPoint++;
            const restMove = moveDownTo - data[curTPoint].y;
            const nextMoveDirection = checkMove(data[curTPoint], data[curTPoint + 1]);
            const xMove =
               nextMoveDirection === Move.LEFT
                  ? data[curTPoint].x - restMove
                  : data[curTPoint].x + restMove;
            path.push({ x: xMove, y: data[curTPoint].y });
         } else {
            path.push({ x, y: moveDownTo });
         }
      } else if (checkMove(data[curTPoint], data[curTPoint + 1]) === Move.RIGHT) {
         const moveRightTo = x + stepMove;
         const moveRightIsGreaterThanTpoint = moveRightTo > data[curTPoint + 1].x;
         if (moveRightIsGreaterThanTpoint) {
            curTPoint++;
            const restMove = moveRightTo - data[curTPoint].x;
            path.push({ x: data[curTPoint].x, y: data[curTPoint].y + restMove });
         } else {
            path.push({ x: moveRightTo, y });
         }
      } else {
         const moveLeftTo = x - stepMove;
         const moveLefttIsLessThanTpoint = moveLeftTo < data[curTPoint + 1].x;
         if (moveLefttIsLessThanTpoint) {
            curTPoint++;
            const restMove = data[curTPoint].x - moveLeftTo;
            path.push({ x: data[curTPoint].x, y: data[curTPoint].y + restMove });
         } else {
            path.push({ x: moveLeftTo, y });
         }
      }
   }
   return path.map(item => ({ x: item.x - 10, y: item.y - 10 }));
};
