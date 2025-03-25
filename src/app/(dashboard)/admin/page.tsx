import { authOptions } from "@/lib/auth"; // Assure-toi que ce fichier contient bien ta config NextAuth
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);

  // Vérifier si l'utilisateur est bien l'admin
  if (!session || session.user.email !== "marketing.3alla9ni@gmail.com") {
    redirect("/sign-in");
  }

  return (
    <div className="mx-4 lg:mx-0">
      <h2 className="text-3xl lg:text-4xl font-bold text-background mt-6 mb-4">
        Welcome, Admin!
      </h2>
    </div>
  );
}
