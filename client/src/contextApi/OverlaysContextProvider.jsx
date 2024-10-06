import { createContext, useEffect, useReducer, useState } from "react";
import { InitialState, OverlayReducer } from "./OverlayReducer";

export const OverlayContext = createContext({
	overlay: {},
	overlays: [],
	addOverlay: () => {},
	handleChange: () => {},
	updateOverlaySize: () => {},
	updateOverlayPosition: () => {},
	updateOverlay: () => {},
});

const OverlaysContextProvider = ({ children }) => {
	const [overlayState, dispatchOverlay] = useReducer(
		OverlayReducer,
		InitialState
	);

	// useEffect(() => {
	// 	async function fetchData() {
	// 		try {
	// 			const response = await axios.get(
	// 				"https://api.example.com/data"
	// 			);
	// 			dispatchOverlay({
	// 				type: "SET_OVERLAYS",
	// 				payload: {
	// 					overlays: response.data,
	// 				},
	// 			});
	// 		} catch (error) {
	// 			if (axios.isAxiosError(error)) {
	// 				console.error("Axios Error:", error.message);
	// 			} else {
	// 				console.error("Network Error:", error.message);
	// 			}
	// 		}
	// 	}

	// 	fetchData();
	// }, []);

	const handleChange = (e) => {
		dispatchOverlay({
			type: "CHANGE_INPUT",
			payload: {
				name: e.target.name,
				value: e.target.value,
			},
		});
	};

	const handleAddOverlay = () => {
		dispatchOverlay({
			type: "ADD_OVERLAY",
		});
	};

	const handleUpdateOverlay = (payload) => {
		console.log("hi", payload);
		dispatchOverlay({
			type: "UPDATE_OVERLAY",
			payload: payload,
		});
	};
	const handleUpdateOverlaySize = (payload) => {
		console.log("hi", payload);
		dispatchOverlay({
			type: "UPDATE_OVERLAY_SIZE",
			payload: payload,
		});
	};
	const handleUpdateOverlayPosition = (payload) => {
		console.log("hi", payload);
		dispatchOverlay({
			type: "UPDATE_OVERLAY_POSITION",
			payload: payload,
		});
	};

	return (
		<OverlayContext.Provider
			value={{
				...overlayState,
				addOverlay: handleAddOverlay,
				handleChange: handleChange,
				updateOverlaySize: (payload) =>
					handleUpdateOverlaySize(payload),
				updateOverlayPosition: (payload) =>
					handleUpdateOverlayPosition(payload),
				updateOverlay: (payload) => handleUpdateOverlay(payload),
			}}
		>
			{children}
		</OverlayContext.Provider>
	);
};

export default OverlaysContextProvider;
