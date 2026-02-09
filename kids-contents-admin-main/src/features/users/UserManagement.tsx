import { useEffect, useMemo, useState } from "react";
import type { User } from "@supabase/supabase-js";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import PersonAddAlt1RoundedIcon from "@mui/icons-material/PersonAddAlt1Rounded";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import LockResetRoundedIcon from "@mui/icons-material/LockResetRounded";
import {
  DEFAULT_ADMIN_ROLE,
  isDefaultAdminEmail,
} from "../../lib/ensureDefaultAdmin";
import { supabaseAdmin } from "../../lib/supabaseAdmin";
import { useAuth } from "../auth/AuthContext";

type EditableUser = Pick<User, "id" | "email" | "app_metadata">;

type RoleOption = "admin" | "moderator";

type FormState = {
  email: string;
  password: string;
  role: RoleOption;
};

const defaultForm: FormState = {
  email: "",
  password: "",
  role: "moderator",
};

export default function UserManagement() {
  const serviceKeyConfigured = useMemo(
    () => Boolean(import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY),
    []
  );
  const { user } = useAuth();
  const [users, setUsers] = useState<EditableUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(defaultForm);
  const [createOpen, setCreateOpen] = useState(false);
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);
  const [savingUserId, setSavingUserId] = useState<string | null>(null);

  const sortedUsers = useMemo(() => {
    return [...users].sort((a, b) => {
      const emailA = (a.email ?? "").toLowerCase();
      const emailB = (b.email ?? "").toLowerCase();
      return emailA.localeCompare(emailB);
    });
  }, [users]);

  useEffect(() => {
    if (!serviceKeyConfigured) {
      setError(
        "VITE_SUPABASE_SERVICE_ROLE_KEY sozlanmagan. Foydalanuvchilar ro'yxati ishlamaydi."
      );
      setLoading(false);
      return;
    }
    loadUsers();
  }, [serviceKeyConfigured]);

  async function loadUsers() {
    if (!serviceKeyConfigured) {
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabaseAdmin.auth.admin.listUsers({
        page: 1,
        perPage: 200,
      });
      if (error) throw error;
      setUsers(data.users as EditableUser[]);
    } catch (err: any) {
      console.error(err);
      setError(err?.message ?? "Foydalanuvchilarni yuklab bo'lmadi");
    } finally {
      setLoading(false);
    }
  }

  function resetForm() {
    setForm(defaultForm);
  }

  function openCreateDialog() {
    resetForm();
    setCreateError(null);
    setCreateOpen(true);
  }

  function closeCreateDialog() {
    if (creating) return;
    setCreateOpen(false);
  }

  async function handleCreate() {
    if (!serviceKeyConfigured || creating) return;
    if (!form.email.trim() || !form.password.trim()) {
      setCreateError("Email va parol talab qilinadi");
      return;
    }

    setCreating(true);
    setCreateError(null);
    setError(null);

    try {
      const { error } = await supabaseAdmin.auth.admin.createUser({
        email: form.email.trim(),
        password: form.password,
        email_confirm: true,
        app_metadata: { role: form.role },
      });
      if (error) throw error;
      resetForm();
      setCreateOpen(false);
      await loadUsers();
    } catch (err: any) {
      console.error(err);
      const message = err?.message ?? "Foydalanuvchini yaratib bo'lmadi";
      setCreateError(message);
      setError(message);
    } finally {
      setCreating(false);
    }
  }

  async function handleRoleChange(userId: string, role: RoleOption) {
    if (!serviceKeyConfigured) return;
    const target = users.find((candidate) => candidate.id === userId);
    if (isDefaultAdminEmail(target?.email)) {
      alert("Super administrator rolini o'zgartirib bo'lmaydi");
      return;
    }
    setSavingUserId(userId);
    setError(null);
    try {
      const { error } = await supabaseAdmin.auth.admin.updateUserById(userId, {
        app_metadata: { role },
      });
      if (error) throw error;
      await loadUsers();
    } catch (err: any) {
      console.error(err);
      setError(err?.message ?? "Rolni yangilab bo'lmadi");
    } finally {
      setSavingUserId(null);
    }
  }

  async function handlePasswordReset(userId: string) {
    if (!serviceKeyConfigured) return;
    const password = prompt("Yangi parolni kiriting");
    if (!password) return;
    setSavingUserId(userId);
    setError(null);
    try {
      const { error } = await supabaseAdmin.auth.admin.updateUserById(userId, {
        password,
      });
      if (error) throw error;
      alert("Parol yangilandi");
    } catch (err: any) {
      console.error(err);
      setError(err?.message ?? "Parolni yangilab bo'lmadi");
    } finally {
      setSavingUserId(null);
    }
  }

  async function handleDelete(userId: string) {
    if (!serviceKeyConfigured) return;
    if (userId === user?.id) {
      alert("O'zingizni o'chira olmaysiz");
      return;
    }
    const target = users.find((candidate) => candidate.id === userId);
    if (isDefaultAdminEmail(target?.email)) {
      alert("Super administratorni o'chirib bo'lmaydi");
      return;
    }
    if (!confirm("Haqiqatan ham ushbu foydalanuvchini o'chirmoqchimisiz?")) {
      return;
    }
    setSavingUserId(userId);
    setError(null);
    try {
      const { error } = await supabaseAdmin.auth.admin.deleteUser(userId);
      if (error) throw error;
      await loadUsers();
    } catch (err: any) {
      console.error(err);
      setError(err?.message ?? "Foydalanuvchini o'chirib bo'lmadi");
    } finally {
      setSavingUserId(null);
    }
  }

  const totalUsers = sortedUsers.length;

  return (
    <Stack spacing={3}>
      <Paper sx={{ p: 3, display: "flex", flexDirection: "column", gap: 3 }}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          alignItems={{ xs: "flex-start", md: "center" }}
          justifyContent="space-between"
          spacing={2}
        >
          <Box>
            <Typography variant="h5" fontWeight={600} gutterBottom>
              Foydalanuvchilar
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Administratorlar foydalanuvchilarni yaratishi va ularning
              rollarini boshqarishi mumkin.
            </Typography>
          </Box>
          <Stack direction="row" spacing={1} flexWrap="wrap">
            <Button
              variant="outlined"
              onClick={loadUsers}
              startIcon={<RefreshRoundedIcon />}
              disabled={loading || !serviceKeyConfigured}
            >
              Yangilash
            </Button>
            <Button
              variant="contained"
              startIcon={<PersonAddAlt1RoundedIcon />}
              onClick={openCreateDialog}
              disabled={!serviceKeyConfigured}
            >
              Yangi foydalanuvchi
            </Button>
          </Stack>
        </Stack>

        {!serviceKeyConfigured && (
          <Alert severity="warning">
            VITE_SUPABASE_SERVICE_ROLE_KEY sozlanmagan. Foydalanuvchilarni
            boshqarish uchun ushbu kalitni qo'shing.
          </Alert>
        )}

        {error && <Alert severity="error">{error}</Alert>}

        <TableContainer
          sx={{ borderRadius: 2, border: "1px solid", borderColor: "divider" }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Email</TableCell>
                <TableCell>Rol</TableCell>
                <TableCell align="right">Amallar</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={3} align="center" sx={{ py: 6 }}>
                    <CircularProgress size={28} />
                  </TableCell>
                </TableRow>
              ) : totalUsers === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} align="center" sx={{ py: 4 }}>
                    Hozircha foydalanuvchilar topilmadi
                  </TableCell>
                </TableRow>
              ) : (
                sortedUsers.map((item) => {
                  const isDefaultAdmin = isDefaultAdminEmail(item.email);
                  const role = isDefaultAdmin
                    ? DEFAULT_ADMIN_ROLE
                    : (item.app_metadata?.role as RoleOption | undefined) ??
                      "moderator";

                  return (
                    <TableRow key={item.id} hover>
                      <TableCell>{item.email}</TableCell>
                      <TableCell sx={{ maxWidth: 200 }}>
                        <FormControl fullWidth size="small">
                          <InputLabel id={`role-${item.id}`}>Rol</InputLabel>
                          <Select
                            labelId={`role-${item.id}`}
                            label="Rol"
                            value={role}
                            disabled={
                              savingUserId === item.id ||
                              !serviceKeyConfigured ||
                              isDefaultAdmin
                            }
                            onChange={(e: SelectChangeEvent<RoleOption>) =>
                              handleRoleChange(
                                item.id,
                                e.target.value as RoleOption
                              )
                            }
                          >
                            <MenuItem value="admin">Administrator</MenuItem>
                            <MenuItem value="moderator">Moderator</MenuItem>
                          </Select>
                        </FormControl>
                      </TableCell>
                      <TableCell align="right">
                        <Tooltip title="Parolni yangilash">
                          <span>
                            <IconButton
                              color="primary"
                              onClick={() => handlePasswordReset(item.id)}
                              disabled={
                                savingUserId === item.id ||
                                !serviceKeyConfigured
                              }
                            >
                              <LockResetRoundedIcon />
                            </IconButton>
                          </span>
                        </Tooltip>
                        <Tooltip title="O'chirish">
                          <span>
                            <IconButton
                              color="error"
                              onClick={() => handleDelete(item.id)}
                              disabled={
                                savingUserId === item.id ||
                                !serviceKeyConfigured ||
                                isDefaultAdmin
                              }
                            >
                              <DeleteOutlineRoundedIcon />
                            </IconButton>
                          </span>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Dialog
        open={createOpen}
        onClose={closeCreateDialog}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Yangi foydalanuvchi</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={3}>
            {createError && <Alert severity="error">{createError}</Alert>}

            <TextField
              label="Email"
              type="email"
              required
              value={form.email}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, email: event.target.value }))
              }
              autoFocus
            />

            <TextField
              label="Parol"
              type="password"
              required
              value={form.password}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, password: event.target.value }))
              }
              helperText="Kamida 6 ta belgi"
            />

            <FormControl fullWidth>
              <InputLabel id="create-role-select">Rol</InputLabel>
              <Select
                labelId="create-role-select"
                label="Rol"
                value={form.role}
                onChange={(event: SelectChangeEvent<RoleOption>) =>
                  setForm((prev) => ({
                    ...prev,
                    role: event.target.value as RoleOption,
                  }))
                }
              >
                <MenuItem value="admin">Administrator</MenuItem>
                <MenuItem value="moderator">Moderator</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeCreateDialog} disabled={creating}>
            Bekor qilish
          </Button>
          <Button
            onClick={handleCreate}
            variant="contained"
            disabled={creating || !serviceKeyConfigured}
          >
            {creating ? "Saqlanmoqda..." : "Foydalanuvchi qo'shish"}
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}
