import { cn } from "@/lib/utils";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../components/ui/avatar";

interface UserAvatarProps {
  userName: string;
  userImage?: string;
  className?: string;
}

export default function UserAvatar({
  userName,
  userImage,
  className,
}: UserAvatarProps) {
  let firstLetter = userName
    .split(" ")
    .slice(0, 2)
    .map((w) => w.charAt(0))
    .join("")
    .toUpperCase();
  if (firstLetter.length === 1)
    firstLetter = firstLetter.concat(userName.charAt(1));

  return (
    <Avatar className={cn("cursor-pointer", className)}>
      <AvatarImage alt={userName} src={userImage} />
      <AvatarFallback className="font-bold">{firstLetter}</AvatarFallback>
    </Avatar>
  );
}
