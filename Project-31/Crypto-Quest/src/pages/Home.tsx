//import { CryptoCard } from "@/components/UI/CryptoCard";
//import { v4 as uuidV4 } from "uuid";

import LandingHome from "@/components/features/Home/LandingHome";
import NoUser from "@/components/features/Home/NoUser";
import HomeLoading from "@/components/features/Home/HomeLoading";
import { useUserContext } from "@/components/features/UserData/useUserContext";

export default function Home() {
  const { user, loading } = useUserContext();

  if (loading) {
    return <HomeLoading />;
  }

  if (!user) {
    return <NoUser />;
  }

  return <LandingHome />;
}
