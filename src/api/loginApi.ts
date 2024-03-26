import { api } from "@/lib/axios";
import { AccessTokenResponse } from "@/types/loginResponse";

const loginUser = async (
  firstField: string,
  secondField: string,
  email_phone: string,
  password_pin: string
) => {
  const response = await api.post("/login", {
    [firstField]: email_phone,
    [secondField]: password_pin,
    fcm_token: "no_fcm",
  });

  return response.data as AccessTokenResponse;
};

export default loginUser;
