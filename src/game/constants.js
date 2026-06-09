export const W = 3072;
export const H = 2044;
export const PAD = 80;
export const LEFT_W = 400;
export const RIGHT_W = 390;
export const GAP = 24;

export const ROOM_X = PAD + LEFT_W + GAP;
export const ROOM_Y = PAD;
export const ROOM_W = W - PAD * 2 - LEFT_W - RIGHT_W - GAP * 2;
export const ROOM_H = 1408;

export const DIAL_X = ROOM_X;
export const DIAL_Y = ROOM_Y + ROOM_H + GAP;
export const DIAL_W = ROOM_W;
export const DIAL_H = H - PAD - DIAL_Y;

export const RIGHT_X = W - PAD - RIGHT_W;
export const RIGHT_Y = PAD;

export const FONT = "Reddit Mono Variable";