'use client'

import PageTitleName from "@components/Text/PageTitleName.jsx";
import React, { useEffect, useState } from "react";

export default function HomePage() {
const [screenHeight, setScreenHeight] = useState(0);

useEffect(() => {
  setScreenHeight(window.innerHeight);
}, [])


  return (
      <PageTitleName>HomePage</PageTitleName>
  );
}
