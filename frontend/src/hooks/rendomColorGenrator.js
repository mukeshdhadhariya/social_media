import { useRef } from "react";
export const getRandomColor=()=>{
  let color= useRef('#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0'));
  return color.current
}
