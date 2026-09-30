import { useRef } from "react"

export const useAntiSpam = (delay: number = 500 ) =>{

    const isLocked = useRef( false );

    const runWithLock = ( callback: Function ) =>{

        if( isLocked.current ) return;

        callback();

        isLocked.current = true;

        setTimeout(() => {
            
            isLocked.current = false;

        }, delay );

    }

    return { runWithLock };

}