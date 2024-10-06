// src/App.js
import React, { useState } from "react";
import Videoplayer from "./components/Videoplayer";
import OverlayEditor from "./components/OverlayEditor";
import "react-resizable/css/styles.css";
import OverlaysContextProvider from "./contextApi/OverlaysContextProvider";
import VdoPlayer from "./components/VdoPlayer";
import MyOverlays from "./components/MyOverlays";

function App() {
	const [overlays, setOverlays] = useState([]);
	const videoUrl = "http://streams.videolan.org/samples/360VR/180.mp4";
	// const videoUrl = "http://localhost:4000/api/video";

	const addOverlay = (overlay) => {
		setOverlays([...overlays, overlay]);
	};

	return (
		<OverlaysContextProvider>
			<div>
				{/* <Videoplayer videoUrl={videoUrl} overlays={overlays} /> */}
				<div className=" sticky top-0">
					<VdoPlayer videoUrl={videoUrl} />
					<OverlayEditor
						overlays={overlays}
						addOverlay={addOverlay}
					/>
				</div>
				<MyOverlays />
			</div>
		</OverlaysContextProvider>
	);
}

export default App;
