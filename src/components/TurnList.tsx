import { Stack } from "@chakra-ui/react";
import { turn } from "../constants";
import { Turn } from "./Turn";
import { useEffect, useRef } from "react";

export function TurnList(turns:turn[]) {
	const ref = useRef<HTMLDivElement>(null);
	useEffect(() => {
		ref.current!.addEventListener("scrollend", handleScrollend);
		console.log("added");
		return (() => {
			ref.current!.removeEventListener("scrollend", handleScrollend);
			console.log("removed");
		})
	});

	const handleScrollend = (event: Event) => {
		console.log("handleScrollend");
	};
	return (
		<Stack
			ref={ref}
			overflowY="auto"
			// onScrollCapture={(event) => {console.log("scrollCapture: "); console.log(event)}}
			sx={{
				'&::-webkit-scrollbar': { display: "none" }
			}}>
			{
				turns.map((turn, idx) => (
					<Turn key={idx} {...turn}></Turn>
				))
			}
		</Stack >
	)
}