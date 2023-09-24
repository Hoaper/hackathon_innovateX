import { useEffect, useState } from "react";
const TimeClock = () => {
    const [currentTime, setCurrentTime] = useState(new Date());
    const options: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false, // or false for 24-hour format
      };
    useEffect(() => {
        const intervalId = setInterval(() => {
        setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <>

            <div className="time">
                {currentTime.toLocaleTimeString(undefined, options)}
            </div>

        </>
    );
}

export default TimeClock;