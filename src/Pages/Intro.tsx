import "./Intro.css"

export default ({onClick, clickSound}: {onClick: any, clickSound: any}) => {
    return <div className="Intro" onClick={() => {clickSound(); onClick()}}>
        <span></span>
        <div className="VideoWrapper"><video src="assets/intro.mp4" autoPlay={true} muted={true} loop={true}/></div>
        <h3>Press any key to start</h3>
    </div>
}