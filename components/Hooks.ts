import {useEffect, useRef, useState} from "react";
import {isObject} from "lodash";


export default function useEffectOnce(effect: ()=>any) {
    const effectFn = useRef(effect)
    const destroyFn = useRef<() => any>()
    const effectCalled = useRef(false)
    const rendered = useRef(false)
    const [, refresh] = useState(0)

    if (effectCalled.current) {
        rendered.current = true
    }

    useEffect(() => {
        if (!effectCalled.current) {
            destroyFn.current = effectFn.current()
            effectCalled.current = true
        }

        refresh(1)

        return () => {
            if (rendered.current === false) return
            if (destroyFn.current) destroyFn.current()
        }
    }, [])
}


export const getBrowserLocale = () => {
    if (typeof window !== 'undefined' && window.navigator) {
        const lang = window.navigator.language /* @@ Deprecated @@ */ //|| window.navigator.browserLanguage;
        return lang.split('-')[0];
    }
    return null;
};

export const useTraceUpdate = (props: any)=>{
    const prev = useRef(props);
    useEffect(() => {
        const changedProps = Object.entries(props).reduce((ps, [k, v]) => {
            if (prev.current[k] !== v) {
                ps[k] = [prev.current[k], v];
            }
            return ps;
        }, {});
        if (Object.keys(changedProps).length > 0) {
            console.log('Changed props:', changedProps);
        }
        prev.current = props;
    });
}

export function deepEqual(object1: any, object2: any) {
    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);

    if (keys1.length !== keys2.length) {
        return false;
    }

    for (const key of keys1) {
        const val1 = object1[key];
        const val2 = object2[key];
        const areObjects = isObject(val1) && isObject(val2);
        if (
            areObjects && !deepEqual(val1, val2) ||
            !areObjects && val1 !== val2
        ) {
            return false;
        }
    }

    return true;
}