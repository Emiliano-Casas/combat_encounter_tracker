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
  khaki_light: "#C9BCAB"
}

type condition = {
  name: string,
  roundCounter?: number
}

export type turn = {
  initiative: number,
  name: string,
  hp?: number,
  conditions: condition[]
  initMod?: number
}