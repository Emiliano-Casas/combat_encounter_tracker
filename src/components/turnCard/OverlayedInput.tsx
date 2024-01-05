import {
	useRef,
	RefObject,
	MouseEvent,
	useEffect,
	useState
} from 'react';
import {
	Box,
	BoxProps,
	Button,
} from '@chakra-ui/react';

export function OverlayedInput(
	{
		children,
		inputRef,
		openEditButtons,
		...boxProps
	}: {
		children: any,
		inputRef: RefObject<HTMLInputElement>,
		openEditButtons: () => void
	} & BoxProps) {
	const [overlayHidden, setOverlayHidden] = useState(false);

	const overlay = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		if (inputRef.current !== null) {
			inputRef.current.addEventListener("blur", onBlurNameInput)
		}
	})

	const onClickOverlay = (e: MouseEvent<HTMLButtonElement>) => {
		openEditButtons();
		if (inputRef.current !== null) {
			inputRef.current.focus();
		}
		setOverlayHidden(true)
	}
	const onBlurNameInput = () => {
		setOverlayHidden(false)
	}

	return (
		<Box
			position="relative"
			display="flex"
			alignItems="center"
			justifyContent={"center"}
			{...boxProps}
		>
			<Button
				zIndex={1}
				borderRadius={"none"}
				position={"absolute"}
				height="100%"
				width="100%"
				cursor="pointer"
				variant={'unstyled'}
				ref={overlay}
				onClick={onClickOverlay}
				hidden={overlayHidden}
			/>
			{children}
		</Box>
	)
}