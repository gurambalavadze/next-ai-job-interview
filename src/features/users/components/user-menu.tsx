import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UserAvatar from "./user-avatar";

interface UserMenuProps {
  userName: string;
  userImage?: string;
}

export function UserMenu({ userName, userImage }: UserMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <UserAvatar userName={userName} userImage={userImage} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <form
          action={async () => {
            "use server";
            const { signOut } = await import("@/auth");
            await signOut();
          }}
        >
          <DropdownMenuItem asChild>
            <button type="submit" className="cursor-pointer w-full">
              Sign Out
            </button>
          </DropdownMenuItem>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserMenu;
