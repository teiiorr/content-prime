import { FormEvent, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

type LocationState = { from?: { pathname?: string } };

export default function Login() {
  const { signIn, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const state = (location.state || {}) as LocationState;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const redirectTarget = state.from?.pathname || "/";

  useEffect(() => {
    if (user) {
      navigate(redirectTarget, { replace: true });
    }
  }, [user, navigate, redirectTarget]);

  if (user) {
    return null;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await signIn(email, password);
    if (error) {
      setError(error);
      setLoading(false);
      return;
    }

    navigate(redirectTarget, { replace: true });
  }

  return (
    <div className="auth-wrapper">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h1 className="auth-title">Admin panelga kirish</h1>
        <p className="auth-subtitle">Email va parol orqali tizimga kiring.</p>

        <label className="field">
          <span className="label">Email</span>
          <input
            type="email"
            className="input"
            placeholder="email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
        </label>

        <label className="field">
          <span className="label">Parol</span>
          <input
            type="password"
            className="input"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
        </label>

        {error && <div className="auth-error">{error}</div>}

        <button className="btn primary" type="submit" disabled={loading}>
          {loading ? "Kirilmoqda..." : "Kirish"}
        </button>
      </form>
    </div>
  );
}
