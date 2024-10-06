import React, { useContext, useState } from "react";
import { OverlayContext } from "../contextApi/OverlaysContextProvider";

const OverlayEditor = ({}) => {
	const { overlay, overlays, handleChange, addOverlay } =
		useContext(OverlayContext);

	console.log(overlay);

	return (
		<div className=" border bg-green-50 p-5">
			<h3 className=" font-semibold mb-3">Overlay Editor</h3>
			<div className=" flex gap-2 items-center justify-center">
				<input
					className=" p-2 outline-1 outline-lime-500 mr-4"
					type="text"
					placeholder="Image URL"
					name="imgURL"
					value={overlay.imgURL}
					onChange={handleChange}
				/>
				<input
					className=" p-2 outline-1 outline-lime-500 mx-4"
					type="text"
					placeholder="Text"
					name="text"
					value={overlay.text}
					onChange={handleChange}
				/>
				<input
					className=" p-2 w-20 outline-lime-500 mx-4"
					type="number"
					placeholder="Height"
					name="height"
					value={overlay.height}
					onChange={handleChange}
				/>
				<input
					className=" p-2 w-20 outline-lime-500 mx-4"
					type="number"
					placeholder="Width"
					name="width"
					value={overlay.width}
					onChange={handleChange}
				/>
				<button
					className="ml-3 py-2 px-4 bg-lime-600 font-semibold border shadow hover:scale-110 active:scale-90 transition-all"
					onClick={addOverlay}
				>
					Add Overlay
				</button>
			</div>
		</div>
	);
};

export default OverlayEditor;
