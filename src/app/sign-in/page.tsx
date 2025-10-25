import SignIn from "@/features/users/components/sign-in";

export default function SignInPage({}: React.ComponentProps<"div">) {
  return (
    <div className="flex w-full justify-center mt-8">
      <SignIn />
    </div>
  );
}
