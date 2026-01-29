import { Link } from "react-router-dom";
import { LogOut, UserCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu.jsx";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../components/ui/avatar.jsx";
import { Skeleton } from "../../../components/ui/skeleton.jsx";

const HeaderProfileMenu = ({ user, isLoading, onLogout = () => {} }) => {
  const displayName = user?.name || "Your account";
  const email = user?.email || "";
  const initials = user?.name
    ? user.name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="flex items-center gap-2 rounded-full border border-[#d6c7b0] bg-white px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:border-[#1f2933] cursor-pointer"
        >
          {isLoading ? (
            <Skeleton className="h-9 w-9 rounded-full" />
          ) : (
            <Avatar className="h-9 w-9">
              <AvatarImage src="" alt={displayName} />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
          )}
          {isLoading ? (
            <Skeleton className="hidden h-4 w-24 rounded sm:inline" />
          ) : (
            <span className="hidden sm:inline">{displayName}</span>
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-56 rounded-xl border border-[#e6dccd] bg-white/95 p-2 shadow-xl"
      >
        <DropdownMenuLabel className="text-[0.7rem] uppercase tracking-[0.2em] text-slate-500">
          Signed in as
        </DropdownMenuLabel>
        <div className="px-2 pb-1 text-sm font-medium text-slate-800">
          {email}
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className="gap-2">
          <Link to="/profile" className="flex items-center gap-2">
            <UserCircle className="h-4 w-4 text-slate-500" />
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={onLogout}
          className="gap-2 text-red-600 data-highlighted:bg-red-50 data-highlighted:text-red-700"
        >
          <LogOut className="h-4 w-4 text-red-600 data-highlighted:text-red-700" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default HeaderProfileMenu;
