import React, { useEffect, useState } from 'react'
import { ToastAndroid, BackHandler } from 'react-native';

export default function usedDoubleBackAction(callback: Function) {
    let backCount = 0;

    useEffect(() => {
        const backActionHandler = () => {
            console.log(backCount);
            if (backCount > 0) {
                callback();
            }
            else {
                ToastAndroid.show('Tap back again to exit', ToastAndroid.SHORT);
                backCount++;

                setTimeout(() => {
                    backCount = 0;
                }, 2000);
            }
            return true;
        };

        const backHandler = BackHandler.addEventListener('hardwareBackPress', backActionHandler);

        return () => backHandler.remove();
    }, [callback]);
}
