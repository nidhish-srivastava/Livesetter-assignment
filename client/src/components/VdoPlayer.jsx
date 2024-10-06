import React, { useContext, useEffect, useRef, useState } from "react";
import { OverlayContext } from "../contextApi/OverlaysContextProvider";
import { Rnd } from "react-rnd";

const VdoPlayer = ({ videoUrl }) => {
	const videoRef = useRef(null);

	const { overlays, updateOverlaySize, updateOverlayPosition } =
		useContext(OverlayContext);

	const [ispaused, setIsPaused] = useState(false);

	useEffect(() => {
		setIsPaused(videoRef.current.paused);
	}, []);

	// Handle play/pause
	const togglePlayback = () => {
		if (videoRef.current.paused) {
			setIsPaused(false);
			videoRef.current.play();
		} else {
			setIsPaused(true);
			videoRef.current.pause();
		}
	};

	const handleResizeStop = (e, direction, ref, delta, position, index) => {
		e.preventDefault();
		console.log("Hi");
		updateOverlaySize({
			index: index,
			width: ref.style.width,
			height: ref.style.height,
			...position,
		});
	};

	const handleDragStop = (e, data, index) => {
		e.preventDefault();
		console.log(index, data.y);
		updateOverlayPosition({
			index: index,
			y: data.y,
			x: data.x,
		});
	};

	console.log(overlays);
	console.log(ispaused);

	return (
		<div className=" flex flex-col items-center justify-center p-5 bg-red-100">
			<div className="p-1 shadow-custom rounded-sm">
				<div className=" h-[480px] w-[640px] relative">
					<video
						className=" h-full w-full"
						ref={videoRef}
						src={videoUrl}
						controls
						autoPlay
					/>
					{overlays.map((oly, index) => (
						<Rnd
							size={{ width: oly.width, height: oly.height }}
							position={{ x: oly.x, y: oly.y }}
							maxWidth="480px"
							minWidth="50px"
							minHeight="50px"
							maxHeight="320px"
							bounds="parent"
							onDragStop={(e, data) =>
								handleDragStop(e, data, index)
							}
							onResizeStop={(
								e,
								direction,
								ref,
								delta,
								position
							) =>
								handleResizeStop(
									e,
									direction,
									ref,
									delta,
									position,
									index
								)
							}
							className=" hover:border cursor-default overflow-hidden"
							key={index}
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
						</Rnd>
					))}
				</div>
			</div>
			<button
				onClick={togglePlayback}
				className="mt-2 flex items-center justify-center hover:scale-105 active:scale-95 transition-all"
			>
				{ispaused ? (
					<span className=" text-4xl">&#9654;</span>
				) : (
					<span className=" text-4xl">&#9208;</span>
				)}
			</button>
		</div>
	);
};

export default VdoPlayer;
