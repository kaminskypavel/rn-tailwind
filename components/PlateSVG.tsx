import * as React from "react";
import Svg, { Defs, G, Ellipse, Path, Text } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: filter */

const PlateSVG: React.FC<{}> = (props) => {
  const RADIUS = 200;
  return (
    <Svg width="400" height="400" {...props}>
      <Defs></Defs>
      <G stroke="#000">
        <Ellipse
          strokeWidth={14}
          ry={RADIUS}
          rx={RADIUS}
          cy={290.20001}
          cx={200}
        />
        <Path strokeWidth={29} fill="none" d="M383 51.2L400 532.2" />
        <Path strokeWidth={27} fill="none" d="M386 286.2L649 281.2" />
        <Text
          transform="matrix(2.69643 0 0 2.42556 -329.107 -309.079)"
          xmlSpace="preserve"
          textAnchor="start"
          fontFamily="Noto Sans JP"
          fontSize={24}
          strokeWidth={0}
          y={246.85781}
          x={183.61589}
          fill="red"
        >
          {"Carbs"}
        </Text>
      </G>
    </Svg>
  );
};

export default PlateSVG;
