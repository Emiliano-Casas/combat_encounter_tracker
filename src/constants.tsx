export const palette = {
	lion1: "#C9A368",
	oxford_blue: "#0F1E43",
	lion2: "#B9935D",
	drab_brown: "#483B24",
	seal_brown: "#5E3116",
	slate_gray: "#758394",
	bistre: "#2C201B",
	gray: "#7f7464",
	ecru: "#c4a575",
	space_cadet: "#263046",
	khaki: "#BCAD98",
	khaki_light: "#C9BCAB",
	light_blue: "#199CEF",
	onyx: "#3B3B41",
	rosewood: "#671C17",
	wenge: "#594A4B",
	cinereous: "#998888",
	dark_green: "#16302B",
	timberwold: "#EADEDA",
	cadet_gray: "#94999D",
	dim_gray: "#69686e"
}

type Condition = {
	name: string,
	roundCounter?: number
}

export type Turn = {
	initiative: number,
	name: string,
	id?: string
	hp?: number | null,
	conditions: Condition[]
	initMod?: number
}

export type Round = {
	id?: string,
	turns: Turn[]
}

export const listWidth = "540px"