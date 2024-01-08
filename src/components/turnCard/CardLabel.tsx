import { Text, TextProps } from "@chakra-ui/react"
import { palette } from "../../constants"

export function CardLabel({ text, ...textProps }: {
	text: string
} & TextProps
) {
	return (
		<Text
			display="flex"
			justifyContent={"end"}
			flexDir="column"
			fontSize="md"
			whiteSpace={"nowrap"}
			color={palette.edit_gray}
			{...textProps}>
			{text}
		</Text>
	)
}
