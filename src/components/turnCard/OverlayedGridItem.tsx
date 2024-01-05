import {
	useRef,
	RefObject,
	MouseEvent,
	useEffect,
	useState
} from 'react';
import {
	Box,
	Button,
	GridItem,
	GridItemProps
} from '@chakra-ui/react';

export function OverlayedGridItem(
	{
		children,
		inputRef,
		openEditButtons,
		...gridItemProps
	}: {
		children: any,
		inputRef: RefObject<HTMLInputElement>,
		openEditButtons: () => void
	} & GridItemProps) {
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
		<GridItem {...gridItemProps}>
			<Box
				height="100%"
				width="100%"
				position="relative"
				display="flex"
				alignItems="center"
				justifyContent={"center"}
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
		</GridItem>
	)
}