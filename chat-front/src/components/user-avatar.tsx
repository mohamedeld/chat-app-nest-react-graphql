import { LogOut } from "lucide-react";
import { useNavigate } from "react-router";
import { useGetMe } from "@/hooks/use-get-me";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { toast } from "./ui/toast";
import { useLogout } from "@/hooks/use-logout";
export const UserAvatar = () => {
  const { data: user } = useGetMe();
  const navigate = useNavigate();
  const { logout } = useLogout();
  const handleLogout = async () => {
    try {
      const res = await logout();

      if (res?.ok) {
        toast.add({
          title: "Success",
          description: "Logout Successfully",
        });
        navigate("/login");
      }
    } catch (error) {
      toast.add({
        title: "Error",
        description: `${error}`,
      });
    }
  };

  if (!user) return null;

  const email = user.me?.email ?? "";
  const initials = email.slice(0, 2).toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          <Avatar className="h-9 w-9 cursor-pointer">
            <AvatarImage src="https://github.com/shadcn.png" alt={email} />

            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
