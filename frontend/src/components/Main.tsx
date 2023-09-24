const AppsLine = () => {
    return (
        <div className="apps-line">
            <div className="apps-items">
                <img className="apps-icon" src="./imgs/sim 1.svg" />
                <p className="apps-title">
                    SIM
                </p>
            </div>
            <div className="apps-items">
                <img className="apps-icon" src="./imgs/Sleep 2.svg" />
                <p className="apps-title">
                    Hotels
                </p>
            </div>
            <div className="apps-items">
                <img className="apps-icon" src="./imgs/coin 1.svg" />
                <p className="apps-title">
                    Converter
                </p>
            </div>
            <div className="apps-items">
                <img className="apps-icon" src="./imgs/documents 1.svg" />
                <p className="apps-title">
                    Documents
                </p>
            </div>
            <div className="apps-items">
                <img className="apps-icon" src="./imgs/traditional-dance 1.svg" />
                <p className="apps-title">
                    Traditions
                </p>
            </div>


        </div>
    );
}

const AppsBlock = () => {
    return (
        <div className="appsblock-line">

            <div className="appsblock-left">

                <div className="appblock-item flag">
                    <img className="appblock-icon" src="./imgs/Flag.svg" alt="icon" />
                    <p className="appblock-title">
                        Location
                    </p>
                </div>
                <div className="appblock-item game">
                    <img className="appblock-icon" src="./imgs/Game Controller.svg" alt="icon" />
                    <p className="appblock-title">
                        Games
                    </p>
                </div>
                <div className="appblock-item fork">
                    <img className="appblock-icon" src="./imgs/Dining Room.svg" alt="icon" />
                    <p className="appblock-title">
                        Facilities
                    </p>
                </div>
                <div className="appblock-item trees">
                    <img className="appblock-icon" src="./imgs/Park With Street Light.svg" alt="icon" />
                    <p className="appblock-title">
                        Attractions
                    </p>
                </div>

            </div>

            <div className="appsblock-right">
                <img className="map" src="./imgs/map.jpg" alt="map" />
            </div>

        </div>
    );
}

const Blocks = () => {
    return (
        <>
            <p className="headers">FOR TOURISTS</p>
            <AppsLine />
            <p className="headers">GAMES AND NAVIGARION</p>
            <AppsBlock />
        </>
    );
}

const Banner = () => {
    return (
        <>
            <img className="banner-image" src="./imgs/maxresdefault 1.jpg" alt="Banner" />
        </>
    );
};


const MainContent = () => {
    return (
        <div className="container">

            <Banner />

            <Blocks />

        </div>
    );
}

const Main = () => {
    return (
        <div id="main">
            <MainContent />
        </div>
    )
}


export default Main;