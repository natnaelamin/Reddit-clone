"use client"
import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [count, setCount]= useState(0)

  function increase(){
    setCount(count + 1)
  }
  function decrease(){
    setCount(count - 1)
  }
  console.log("this one should show up  okay!")
  return (
    <>
      <p>hey there reddit people</p>
      <div className="flex gap-5 justify-center items-center text-3xl">
        <button onClick={decrease}>-</button>
        <h1>{count}</h1>
        <button onClick={increase}>+</button>
      </div>
    </>
  );
}
