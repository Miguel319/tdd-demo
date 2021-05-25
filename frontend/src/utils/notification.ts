import { Notyf } from "notyf";

export const notification = new Notyf({
  duration: 1000,
  position: {
    x: "right",
    y: "top",
  },
  types: [
    {
      type: "error",
      background: "indianred",
      duration: 2000,
      dismissible: true,
    },
    {
      type: "success",
      duration: 2000,
      dismissible: true,
    },
  ],
});
