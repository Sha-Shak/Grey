import { PayloadAction } from "@reduxjs/toolkit";

export default function reduce(id = null, action: PayloadAction) {
  switch (action.type) {
    case 'EDIT':
      return action.payload;
    case 'EDIT_DONE':
      console.log("edit done")
      return null;
    case 'LIKE':
      return action.payload;
    default:
      return id;
  }
}