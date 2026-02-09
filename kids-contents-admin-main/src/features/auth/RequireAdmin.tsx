import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

type Props = { children: React.ReactNode };

export default function RequireAdmin({ children }: Props) {
  const { role } = useAuth();

  if (role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
