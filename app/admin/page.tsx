import type { Metadata } from "next";
import { AdminDashboard } from "../components/AdminDashboard";

export const metadata: Metadata = {
  title: "Panel admin | Telesev Group",
};

export default function AdminPage() {
  return <AdminDashboard />;
}
