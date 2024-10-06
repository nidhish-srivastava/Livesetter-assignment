import React, { useContext, useRef } from "react";
import Draggable from "react-draggable";
import { ResizableBox } from "react-resizable";
import { OverlayContext } from "../contextApi/OverlaysContextProvider";

const Videoplayer = ({ videoUrl }) => {
	const videoRef = useRef(null);

	const { overlays, updateOverlay } = useContext(OverlayContext);

	// Handle play/pause
	const togglePlayback = () => {
		if (videoRef.current.paused) {
			videoRef.current.play();
		} else {
			videoRef.current.pause();
		}
	};

	const handleResizeStop = (e, data, index) => {
		console.log(data.size);
		const { size } = data;
	};

	const handleDragStop = (e, data, index) => {
		e.preventDefault();
		// console.log(index);
		updateOverlay({
			id: index,
			name: "top",
			value: Math.max(0, parseInt(data.y)),
		});
		updateOverlay({
			id: index,
			name: "left",
			value: Math.max(0, parseInt(data.x)),
		});
	};

	console.log(overlays);

	return (
		<div className=" flex flex-col items-center justify-center p-5 bg-red-100">
			<div className="p-1 shadow-custom rounded-sm">
				<div className=" h-[480px] w-[640px] relative z-10">
					<video
						className=" h-full w-full"
						ref={videoRef}
						src={videoUrl}
						controls
					/>
					{overlays.map((oly, index) => (
						<Draggable
							bounds="parent"
							key={index}
							// onStop={(e, data) => handleDragStop(e, data, index)}
							onDrag={(e, data) => handleDragStop(e, data, index)}
						>
							<ResizableBox
								className=" hover:border box hover-handles overflow-hidden"
								width={oly.width}
								height={oly.height}
								minConstraints={[50, 50]}
								maxConstraints={[480, 320]}
								onResizeStop={(e, data) =>
									handleResizeStop(e, data, index)
								}
								style={{
									position: "absolute",
									left: parseInt(oly.left),
									top: parseInt(oly.top),
									backgroundColor: "gray",
								}}
							>
								<div className="  bg-red-200">
									<img
										src={oly.imgURL}
										alt="Overlay"
										className="z-[-1] w-full max-h-full object-cover"
										draggable={false}
									/>
									<div>{oly.text}</div>
								</div>
							</ResizableBox>
						</Draggable>
					))}
				</div>
			</div>
			<button
				onClick={togglePlayback}
				className="mt-2 bg-red-200 flex items-center justify-center"
			>
				{videoRef.current && videoRef.current.paused ? (
					<span className=" text-4xl">&#9654;</span>
				) : (
					<span className=" text-4xl">&#9208;</span>
				)}
			</button>
		</div>
	);
};

export default Videoplayer;
