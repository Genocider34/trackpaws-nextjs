import React from "react";

type Props = {
  text: string;
  onClick?: () => void;
  size: "small" | "regular";
};

export default function Button({ text, onClick, size = "regular" }: Props) {
  return (
    <button
      className={
        size === "regular"
          ? "rounded-xl uppercase bg-[#3B82F6] text-white px-4 py-2"
          : "rounded-xl font-bold bg-[#3B82F6] text-white px-3 py-2"
      }
      onClick={onClick}
    >
      {text}
    </button>
  );
}
