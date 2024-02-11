import { Login } from "@/app/components/modals/login";
import { SignUp } from "@/app/components/modals/signup";
import { IoClose } from "react-icons/io5";
import { ResetPassword } from "@/app/components/modals/resetpassword";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { auth_modal_state } from "@/app/atoms/auth_atom";
import { useEffect } from "react";

export function AuthModal() {
  const auth_modal = useRecoilValue(auth_modal_state);
  const closeModal = useCloseModal();

  return (
    <>
      <div
        className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-60"
        onClick={closeModal}
      ></div>
      <div className="w-full sm:w-[450px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex justify-center items-center">
        <div className="relative w-full h-full mx-auto flex items-center justify-center">
          <div className="bg-white rounded-lg shadow relative w-full bg-gradient-to-b from-brand-orange to-slate-900 mx-6">
            <div className="flex justify-end p-2">
              <button
                type="button"
                className="bg-transparent rounded-lg text-sm p-1.5 ml auto inline-flex items-center hover:bg-gray-800 hover:text-white text-white"
                onClick={closeModal}
              >
                <IoClose className="h-5 w-5" />
              </button>
            </div>
            {auth_modal.type === "login" ? (
              <Login />
            ) : auth_modal.type === "register" ? (
              <SignUp />
            ) : (
              <ResetPassword />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function useCloseModal() {
  const set_auth_modal_state = useSetRecoilState(auth_modal_state);

  const closeModal = () => {
    set_auth_modal_state((prev) => ({ ...prev, isOpen: false, type: "login" }));
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return closeModal;
}
