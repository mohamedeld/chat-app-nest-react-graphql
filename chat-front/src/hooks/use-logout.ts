import { client } from "@/constants/apollo-client";
import { API_URL } from "@/constants/urls";

export const useLogout = () => {
  const logout = async () => {
    const res = await fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
    await client.clearStore();
    return res;
  };
  return { logout };
};
