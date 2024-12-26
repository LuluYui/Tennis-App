import { Circle, useFont } from '@shopify/react-native-skia';
import React, { useState } from 'react';
import { CartesianChart, Pie, Line, useChartPressState } from "victory-native";
import type { SharedValue } from "react-native-reanimated";
import { callStats } from '../callfunction';
import inter from '@/assets/fonts/inter-medium.ttf'

interface DualStat {
  [key: string]: any;
}

function ToolTip({ x, y }: { x: SharedValue<number>; y: SharedValue<number> }) {
  return (
    <>
        <Circle cx={x} cy={y} r={8} color="black" />
    </>
  ) ;
}

export default function ScoreChart() : any{
  const [statData, setStatData] = useState(Array.from({ length: 1 }, (_, i) => ({
    players: i,
    score: 40 + 30 * Math.random(),
    gameWinRate: 40 + 30 * Math.random(),
    gameLoseRate:40 + 30 * Math.random(),
    setWinRate:  40 + 30 * Math.random(),
    setLoseRate: 40 + 30 * Math.random(),
  })));

  // const { state, isActive } = useChartPressState({ x: 0, y: { setWinRate: 0, setLoseRate: 0, gameWinRate: 0, gameLoseRate: 0} });
  const { state, isActive } = useChartPressState({ x: 0, y: { setWinRate: 0, setLoseRate: 0, gameWinRate: 0, gameLoseRate: 0} });

  const font = useFont(inter, 12);

  callStats().then((result: DualStat) => {
    const tmp: any = [];
    Object.entries(result).forEach(([key, values]) => {
      const item = {
        players: key,
        gameWinRate:  values.gameWinRate,
        gameLoseRate: values.gameLoseRate,
        setWinRate:   values.setWinRate,
        setLoseRate:  values.setLoseRate,
      }
      tmp.push(item);
    })
    tmp.sort((a:any , b:any) => a.gameWinRate - b.gameLoseRate);
    setStatData(tmp);
  });

  return (
        <CartesianChart 
           data={statData} 
           xKey="players" 
           yKeys={["gameWinRate", "gameLoseRate", "setWinRate", "setLoseRate"]}
           axisOptions={{ font }}
           chartPressState={state}
        >
          {/* 👇 render function exposes various data, such as points. */}
          {({ chartBounds, points }) => (
            // 👇 and we'll use the Line component to render a line path.
            <>
              {/* {console.log(`win: ${points.gameWinRate.toString()}, lose: ${points.gameLoseRate.toString()}`)} */}
              <Line points={points.setWinRate} color="black" strokeWidth={3} />
              <Line points={points.setLoseRate} color="red" strokeWidth={1} />
              <Line points={points.gameWinRate} color="red" strokeWidth={3} />
              <Line points={points.gameLoseRate} color="black" strokeWidth={1} />
              {isActive ? (
              <ToolTip x={state.x.position} y={state.y.setWinRate.position} />
              ) : null}
            </>
          )}
      </CartesianChart>
  );
}
