import { atom } from "recoil";

type AuthModalState = {
  isOpen: boolean;
  type: "login" | "register" | "forgotPassword";
};

const initial_auth_modal_state: AuthModalState = {
  isOpen: false,
  type: "login",
};

export const auth_modal_state = atom<AuthModalState>({
  key: "auth_modal_state",
  default: initial_auth_modal_state,
});
