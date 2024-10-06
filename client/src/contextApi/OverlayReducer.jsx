export const InitialState = {
	overlay: {
		imgURL: "",
		text: "",
		height: 125,
		width: 125,
		y: 0,
		x: 0,
	},
	overlays: [],
};

export const OverlayReducer = (state, action) => {
	let newOverlay;
	let newOverlays;
	switch (action.type) {
		case "SET_OVERLAYS": {
			newOverlays = [...action.payload.overlays];
			return { ...state, overlays: newOverlays };
		}
		case "CHANGE_INPUT": {
			newOverlay = {
				...state.overlay,
				[action.payload.name]: action.payload.value,
			};
			return { ...state, overlay: newOverlay };
		}
		case "UPDATE_OVERLAY": {
			const { index, ...oly } = action.payload;
			newOverlays = [...state.overlays];
			newOverlays[index] = { ...oly };
			return { ...state, overlays: newOverlays };
		}
		case "UPDATE_OVERLAY_POSITION": {
			const index = action.payload.index;
			newOverlays = [...state.overlays];
			newOverlay = {
				...newOverlays[index],
				y: action.payload.y,
				x: action.payload.x,
			};
			newOverlays[index] = newOverlay;
			return { ...state, overlays: newOverlays };
		}
		case "UPDATE_OVERLAY_SIZE": {
			const index = action.payload.index;
			newOverlays = [...state.overlays];
			newOverlay = {
				...newOverlays[index],
				width: action.payload.width,
				height: action.payload.height,
			};
			newOverlays[index] = newOverlay;
			return { ...state, overlays: newOverlays };
		}
		case "ADD_OVERLAY": {
			newOverlays = [...state.overlays, state.overlay];
			newOverlay = InitialState.overlay;
			return { overlay: newOverlay, overlays: newOverlays };
		}
		default:
			break;
	}
};
