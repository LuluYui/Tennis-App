import { Circle, useFont } from '@shopify/react-native-skia';
import React, { useState } from 'react';
import { CartesianChart, Line, useChartPressState } from "victory-native";
import type { SharedValue } from "react-native-reanimated";

function ToolTip({ x, y }: { x: SharedValue<number>; y: SharedValue<number> }) {
  return <Circle cx={x} cy={y} r={8} color="black" />;
}

export default function ScoreChart() : any{
  const [DATA, setData] = useState(Array.from({ length: 31 }, (_, i) => ({
    day: i,
    highTmp: 40 + 30 * Math.random(),
  })));

  const { state, isActive } = useChartPressState({ x: 0, y: { highTmp: 0 } });

  const inter = require('@/assets/fonts/inter-medium.ttf');
  const font = useFont(inter, 12);

  return (
        <CartesianChart 
           data={DATA} 
           xKey="day" 
           yKeys={["highTmp"]}
           axisOptions={{ font }}
           chartPressState={state}
        >
          {/* 👇 render function exposes various data, such as points. */}
          {({ points }) => (
            // 👇 and we'll use the Line component to render a line path.
            <>
              <Line points={points.highTmp} color="black" strokeWidth={3} />
              {isActive ? (
              <ToolTip x={state.x.position} y={state.y.highTmp.position} />
            ) : null}
            </>
          )}
      </CartesianChart>
  );
}
