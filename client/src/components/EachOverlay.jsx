import { useContext, useState } from "react";
import { OverlayContext } from "../contextApi/OverlaysContextProvider";

const EachOverlay = ({ ols, ind }) => {
	const { overlays, updateOverlay } = useContext(OverlayContext);
	const [edit, setEdit] = useState(false);
	const [state, setState] = useState({
		...overlays[ind],
	});

	const handleChange = (e) => {
		e.preventDefault();
		setState({
			...state,
			[e.target.name]: e.target.value,
		});
	};

	const handleSave = () => {
		setEdit(false);
		const payload = {
			index: ind,
			...state,
		};
		updateOverlay(payload);
	};

	console.log(overlays);

	return (
		<div key={ind} className=" flex gap-5 items-center border p-3">
			<input
				className=" p-2 outline-1 outline-lime-500 bg-slate-100 w-72"
				type="text"
				placeholder="Image URL"
				name="imgURL"
				value={state.imgURL}
				disabled={!edit}
				style={edit ? { backgroundColor: `#d5d3f0` } : {}}
				onChange={handleChange}
			/>
			<input
				className=" p-2 outline-1 outline-lime-500 bg-slate-100"
				type="text"
				placeholder="Text"
				name="text"
				value={state.text}
				disabled={!edit}
				style={edit ? { backgroundColor: `#d5d3f0` } : {}}
				onChange={handleChange}
			/>
			<input
				className=" p-2 w-20 outline-lime-500 bg-slate-100"
				type="number"
				placeholder="Height"
				name="height"
				value={parseInt(ols.height)}
				disabled
				// disabled={!edit}
				// style={edit ? { backgroundColor: `#d5d3f0` } : {}}
				// onChange={handleChange}
			/>
			<input
				className=" p-2 w-20 outline-lime-500 bg-slate-100 "
				type="number"
				placeholder="Width"
				name="width"
				value={parseInt(ols.width)}
				disabled
				// disabled={!edit}
				// style={edit ? { backgroundColor: `#d5d3f0` } : {}}
				// onChange={handleChange}
			/>
			<input
				className=" p-2 w-20 outline-lime-500 bg-slate-100"
				type="number"
				placeholder="x"
				name="x"
				value={ols.x}
				disabled
				// disabled={!edit}
				// style={edit ? { backgroundColor: `#d5d3f0` } : {}}
				// onChange={handleChange}
			/>
			<input
				className=" p-2 w-20 outline-lime-500 bg-slate-100 "
				type="number"
				placeholder="y"
				name="y"
				value={ols.y}
				disabled
				// disabled={!edit}
				// style={edit ? { backgroundColor: `#d5d3f0` } : {}}
				// onChange={handleChange}
			/>
			<button
				onClick={() => setEdit(true)}
				style={edit ? { transform: `scale(0.9)` } : {}}
				className=" mx-3 py-2 px-4 bg-blue-400 font-semibold border shadow hover:scale-110 active:scale-90 transition-all "
			>
				Edit
			</button>
			<button
				onClick={handleSave}
				className=" mx-3 py-2 px-4 bg-purple-400 font-semibold border shadow hover:scale-110 active:scale-90 transition-all "
			>
				Save
			</button>
		</div>
	);
};
export default EachOverlay;
