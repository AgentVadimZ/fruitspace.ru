import {useEffect, useRef, useState} from "react";


export default function useEffectOnce(effect) {
    const effectFn = useRef(effect)
    const destroyFn = useRef()
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
        const lang = window.navigator.language || window.navigator.browserLanguage;
        return lang.split('-')[0];
    }
    return null;
};