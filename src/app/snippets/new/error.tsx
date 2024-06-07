'use client';

interface ErrorpageProps{
    error: Error,
    reset: () => void;
}
export default function Errorpage(props:ErrorpageProps){
    return (
        <div>{props.error.message} </div>
    )
}