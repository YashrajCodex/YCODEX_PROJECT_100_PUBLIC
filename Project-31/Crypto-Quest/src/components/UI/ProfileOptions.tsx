import { useStoredChallenges } from "../features/Challenges/useStoredChallenges";
import { useUserContext } from "../features/UserData/useUserContext";

export default function ProfileOptions() {
  const { LogoutUser, delUser } = useUserContext();
  const { setNewChallenges, delChallenges} = useStoredChallenges();

  async function DelUser () {
    const con = confirm("Are you sure to delete the account.");
    if (con) {
      delUser();
      delChallenges();
      setNewChallenges(null);
    }
  }

  return (
    <div className="flex flex-col gap-6 p-6 w-1/2 ml-[25%]">
      <button
        className="bg-gradient-to-r from-red-400 to-red-900 font-semibold p-4 rounded-lg"
        onClick={() => {LogoutUser(); setNewChallenges(null)}}
      >
        Logout
      </button>
      <button
        className="bg-gradient-to-r from-red-400 to-red-900 font-semibold p-4 rounded-lg"
        onClick={() =>  DelUser()}
      >
        Delete A/c
      </button>
    </div>
  );
}
