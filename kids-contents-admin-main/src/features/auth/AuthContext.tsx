import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "../../lib/supabase";
import {
  DEFAULT_ADMIN_ROLE,
  ensureDefaultAdminUser,
  isDefaultAdminEmail,
} from "../../lib/ensureDefaultAdmin";

type Role = "admin" | "moderator" | null;

type AuthContextValue = {
  session: Session | null;
  user: User | null;
  role: Role;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    ensureDefaultAdminUser();
  }, []);

  useEffect(() => {
    let isMounted = true;

    supabase.auth.getSession().then(({ data }) => {
      if (isMounted) {
        setSession(data.session);
        setLoading(false);
      }
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, nextSession) => {
        setSession(nextSession);
      }
    );

    return () => {
      isMounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  const role: Role = useMemo(() => {
    const email = session?.user?.email ?? null;
    if (isDefaultAdminEmail(email)) {
      return DEFAULT_ADMIN_ROLE;
    }

    const value =
      session?.user?.app_metadata?.role ?? session?.user?.user_metadata?.role;
    if (value === "admin" || value === "moderator") {
      return value;
    }
    return null;
  }, [session?.user]);

  async function signIn(email: string, password: string) {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      return { error: error.message };
    }
    return {};
  }

  async function signOut() {
    await supabase.auth.signOut();
  }

  const value: AuthContextValue = {
    session,
    user: session?.user ?? null,
    role,
    loading,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
