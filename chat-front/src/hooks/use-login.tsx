import { client } from "@/constants/apollo-client";
import { API_URL } from "@/constants/urls";
import { LoginFormValues } from "@/schema/login.schema";

export const useLogin = () => {
  const login = async (values: LoginFormValues) => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
      credentials: "include",
    });
    console.log("res", res?.ok);
    if (!res?.ok) {
      throw new Error("Invalid Credentials");
    }
    await client.refetchQueries({ include: "active" });
    return res;
  };
  return { login };
};
