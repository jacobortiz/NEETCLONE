import { FiLogOut } from "react-icons/fi";
import { useSignOut } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/firebase";

export function Logout() {
  const [signOut, loading, error] = useSignOut(auth);
  const handleLogout = () => {
    signOut();
  };

  return (
    <button
      className="bg-dark-fill-3 py-1.5 px-3 cursor-pointer rounded text-brand-orange"
      onClick={handleLogout}
    >
      <FiLogOut />
    </button>
  );
}
