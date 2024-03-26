import { useContext } from "react";
import { AuthContext } from "@/providers/AuthProvider";

const UseUser = () => {
  return useContext(AuthContext);
};

export default UseUser;
