import { auth } from "@/auth";
import ThemeToggle from "@/components/them-toggle";
import { UserMenu } from "@/features/users/components/user-menu";

export async function Navbar() {
  const session = await auth();

  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b">
      <div className="flex items-baseline gap-1">
        <h1 className="text-3xl font-medium -scale-100">E</h1>
        <h1 className="text-3xl font-medium tracking-widest">LITE</h1>
        <h1 className="text-xl text-primary font-medium ml-1">ai</h1>
      </div>

      {/* Right Side: Theme Toggle and User Logo */}
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <UserMenu
          userName={session?.user?.name || session?.user?.email || ""}
          userImage={session?.user?.image || undefined}
        />
      </div>
    </nav>
  );
}

export default Navbar;
