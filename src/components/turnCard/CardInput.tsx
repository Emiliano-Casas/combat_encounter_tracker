import { Input, InputProps } from "@chakra-ui/react"
import { palette } from "../../constants"
import { forwardRef } from "react"

export const CardInput = forwardRef(
	({ ref, ...inputProps }: {
		ref: HTMLInputElement
	} & InputProps) => (
		<Input
			ref={ref}
			fontSize='lg'
			fontWeight="semibold"
			textAlign={"end"}
			border="none"
			variant={'unstyled'}
			borderRadius={"none"}
			borderBottom={`1px solid ${palette.edit_gray}`}
			{...inputProps}
		/>
	)
);