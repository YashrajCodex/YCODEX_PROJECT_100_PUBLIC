import ChallengesProvider from "@/components/features/Challenges/ChallengesProvider";
import { NavBar } from "@/components/UI/NavBar";
import React from "react";
import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <>
      <ChallengesProvider>
        <NavBar />
        <Outlet />
      </ChallengesProvider>
    </>
  );
}
