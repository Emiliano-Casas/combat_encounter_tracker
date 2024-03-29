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
	dim_gray: "#69686e",
	edit_gray: "#4A5568",
	health_red: "#F0D0D0",
	light_purple: "#E7D0F0",
	input_red: "#E7B1B1",
	input_purple: "#e7b1e6"
}

export type Round = {
	id?: string,
	roundNum: number,
	turns: Turn[]
}

export type Turn = {
	initiative: number,
	name: string,
	id?: string
	hp?: number,
	maxHP: number
	conditions: Condition[]
	initMod?: number
}

export type Condition = {
	name: string,
	roundCounter?: number,
	checked?: boolean
}

export const listWidth = "540px";
export const savedRound1: Round = {
	id: "asdf",
	roundNum: 1,
	turns: [
		{ initiative: 1, name: "name_2", conditions: [], maxHP: 0 },
		{
			initiative: 7, name: "name_3", maxHP: 0, conditions: [
				{ name: "condition_1", roundCounter: 3 },
				{ name: "condition_2", roundCounter: 2 },
				{ name: "condition_3" }]
		},
		{
			initiative: 33, name: "Volothamp Geddharm", maxHP: 999, hp: 999, conditions: [
				{ name: "Volothamp Geddharm", roundCounter: 3 },
				{ name: "condition_2", roundCounter: 2 },
				{ name: "condition_3" },
				{ name: "condition_4" },
				{ name: "condition_5" },
				{ name: "condition_6" },
				{ name: "condition_7" },
				{ name: "condition_8" },
				{ name: "condition_9" }
			]
		},
		{ initiative: 2, name: "name_4", maxHP: 14, hp: 14, conditions: [] },
		{
			initiative: 33, name: "name_1", maxHP: 14, hp: 14, conditions: [
				{ name: "condition_1", roundCounter: 3 },
				{ name: "condition_2", roundCounter: 2 },
				{ name: "condition_3" }
			]
		},
		{ initiative: 1, name: "name_2", maxHP: 0, conditions: [] },
		{
			initiative: 7, name: "name_3", maxHP: 0, conditions: [
				{ name: "condition_1", roundCounter: 3 },
				{ name: "condition_2", roundCounter: 2 },
				{ name: "condition_3" }]
		},
		{ initiative: 2, name: "name_4", maxHP: 14, hp: 14, conditions: [] },
		{
			initiative: 33, name: "name_1", maxHP: 14, hp: 14, conditions: [
				{ name: "condition_1", roundCounter: 3 },
				{ name: "condition_2", roundCounter: 2 },
				{ name: "condition_3" }
			]
		},
		{ initiative: 1, name: "name_2", maxHP: 0, conditions: [] },
		{
			initiative: 7, name: "name_3", maxHP: 0, conditions: [
				{ name: "condition_1", roundCounter: 3 },
				{ name: "condition_2", roundCounter: 2 },
				{ name: "condition_3" }]
		},
		{ initiative: 2, name: "name_4", maxHP: 14, hp: 14, conditions: [] }
	]
};