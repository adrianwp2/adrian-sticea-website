import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function AdminDashboard() {
    const session = await auth();
    
    if (!session) {
        redirect("/auth/signin");
    }
    
    const allowedEmail = process.env.ADMIN_EMAIL;
    if (session.user?.email !== allowedEmail) {
        redirect("/"); // or redirect to an unauthorized page
    }
    
    return (
        <div className="min-h-screen flex bg-white">
            <div className="max-w-6xl mx-auto p-10 w-full">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                </div>
                <div className="mt-6">
                    <a href="/" className="btn btn-primary mr-4">Visit Website</a>
                    <a href="/admin/projects" className="btn btn-accent">Go To Projects</a>
                    
                </div>
            </div>
        </div>
    );
} 