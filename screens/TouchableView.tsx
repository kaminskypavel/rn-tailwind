import BottomSheet from '@gorhom/bottom-sheet';
import { AnimatePresence, MotiView } from 'moti';
import React, { useCallback, useEffect, useMemo, useReducer, useRef, useState } from 'react';
import { Text, View } from 'react-native';

import tw from '../lib/tailwind';

type Position = {
  x: number;
  y: number;
};

function Shape(props: any) {
  const { x, y, radius } = props;
  return (
    <MotiView
      from={{
        translateX: 0,
        translateY: 0,
      }}
      animate={{
        translateX: x - radius * 2,
        translateY: y - radius * 2,
      }}
      style={tw`justify-center h-${radius} w-${radius} rounded-xl bg-white`}
    />
  );
}

export default function TouchableView() {
  const [touchPosition, setTouchPosition] = useState<Position>({ x: 0, y: 0 });
  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => ["0%", "50%"], []);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  return (
    <View
      style={tw`w-full bg-purple-600 h-full`}
      onTouchStart={(e) => {
        console.log("touchMove", e.nativeEvent);
        const { locationX: x, locationY: y } = e.nativeEvent;
        setTouchPosition({ x, y });
      }}
    >
      <AnimatePresence>
        <Shape x={touchPosition.x} y={touchPosition.y} radius={16} />
      </AnimatePresence>

      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
      >
        <Text>hello!</Text>
      </BottomSheet>
    </View>
  );
}
