import { Stack } from "@chakra-ui/react";
import { turn } from "../constants";
import { Turn } from "./Turn";
import { useEffect, useRef } from "react";

type TurnlistProps = {
	turns: turn[]
}

export function TurnList({ turns }: TurnlistProps) {
	const ref = useRef<HTMLDivElement>(null);
	useEffect(() => {
		const turnList = ref.current!;
		if (turnList.offsetHeight < turnList.scrollHeight) {
			console.log("OFFSET: add more");
		}
		turnList.addEventListener("scrollend", handleScrollend);
		return (() => {
			turnList.removeEventListener("scrollend", handleScrollend);
		})
	});

	const handleScrollend = (event: Event) => {
		console.log("SCROLLEND: add more");
	};

	return (
		<Stack
			ref={ref}
			overflowY="auto"
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