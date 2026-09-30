import { useEffect, type FC } from "react"
import { useAntiSpam } from "./use.antispam"

type Props = {
    onEnter?: () => void
    withStopPropagation?: boolean
    withPreventDefault?: boolean
}

export const useKeyBoardEvent : FC<Props> =  ({
    onEnter,
    withStopPropagation,
    withPreventDefault
}) =>{

    const { runWithLock } = useAntiSpam();

    useEffect(()=>{

        const handlerKeyEvent = (e: KeyboardEvent ) =>{

            if(onEnter && !e.repeat && e.key === "Enter"){ 

                if( withPreventDefault ) e.preventDefault();
                if( withStopPropagation ) e.stopPropagation();

                runWithLock( onEnter );

            };

        }

        window.addEventListener("keydown", handlerKeyEvent );

        return ()=>{

            window.removeEventListener("keydown", handlerKeyEvent );
        }

    },[ onEnter ]);
}