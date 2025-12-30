import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function Home() {
  // redirect("/admin");
  return (
    <>
      <div className="h-screen w-scree justify-center items-center flex text-4xl">
        <Link href="/admin">
          <h1>Admin</h1>
        </Link>
      </div>
    </>
  );
}
