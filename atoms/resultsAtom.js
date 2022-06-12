import { atom } from "recoil";

export const currentFuelStationAtom = atom({
  key: "currentFuelStationAtom",
  default: [],
});

export const selectedStationAtom = atom({
  key: "selectedStationAtom",
  default: null,
});

export const isFuelChangeTriggerAtom = atom({
  key: "isFuelChangeTriggerAtom",
  default: false,
});
