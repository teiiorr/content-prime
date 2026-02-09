import { supabaseAdmin } from "./supabaseAdmin";

export const DEFAULT_ADMIN_EMAIL = "bekhruz.m@jafton.com";
const DEFAULT_ADMIN_PASSWORD = "123456789";
export const DEFAULT_ADMIN_ROLE = "admin";

export function isDefaultAdminEmail(email: string | null | undefined): boolean {
  if (!email) {
    return false;
  }
  return email.toLowerCase() === DEFAULT_ADMIN_EMAIL;
}

const hasAdminCredentials = Boolean(
  import.meta.env.VITE_SUPABASE_URL &&
    import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY
);

let ensurePromise: Promise<void> | null = null;

async function createDefaultAdminUser() {
  if (!DEFAULT_ADMIN_EMAIL || !DEFAULT_ADMIN_PASSWORD) {
    return;
  }

  try {
    const { error } = await supabaseAdmin.auth.admin.createUser({
      email: DEFAULT_ADMIN_EMAIL,
      password: DEFAULT_ADMIN_PASSWORD,
      email_confirm: true,
      user_metadata: { role: DEFAULT_ADMIN_ROLE },
      app_metadata: { role: DEFAULT_ADMIN_ROLE },
    });

    if (
      error &&
      error.status !== 422 &&
      !/already exists|already registered/i.test(error.message)
    ) {
      console.error("Failed to ensure default admin user", error);
    }
  } catch (error) {
    console.error("Failed to ensure default admin user", error);
  }
}

export function ensureDefaultAdminUser() {
  if (!hasAdminCredentials) {
    return Promise.resolve();
  }

  if (!ensurePromise) {
    ensurePromise = createDefaultAdminUser();
  }

  return ensurePromise;
}
