import TimeClock from "./TimeClock";
import WiFi from "./WiFi";
import LanguageStatus from "./LanguageStatus";

const MainHeader = () => {
    return (
        <>
            <header id="main-header">

                <div className="container">
                    
                    <div className="header-holder">
                        <WiFi />
                        <TimeClock />
                        <LanguageStatus />
                    </div>

                </div>

            </header>
        </>
    )
}


export default MainHeader;
