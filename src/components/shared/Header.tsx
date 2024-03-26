import UseUser from "@/hooks/use-user";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Header = () => {
  const { setToken } = UseUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    setToken(null);
    toast.success("Successfully logged out");
    navigate("/login");
  };
  return (
    <div className="w-full bg-primary text-white p-5 flex items-center justify-between">
      <h1>Memory Game</h1>

      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
};

export default Header;
