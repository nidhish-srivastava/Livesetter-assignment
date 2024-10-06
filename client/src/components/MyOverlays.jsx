import React, { useContext, useState } from "react";
import { OverlayContext } from "../contextApi/OverlaysContextProvider";
import EachOverlay from "./EachOverlay";

const MyOverlays = () => {
	const { overlay, overlays, handleChange, addOverlay } =
		useContext(OverlayContext);

	return (
		<div className="p-5">
			<h3 className=" font-semibold mb-2">My Overlays</h3>
			<div>
				{overlays.map((ols, ind) => (
					<EachOverlay key={ind} ols={ols} ind={ind} />
				))}
			</div>
		</div>
	);
};

export default MyOverlays;
