import { useMemo, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  InputLabel,
  Stack,
  Typography,
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import {
  DEFAULT_ADMIN_ROLE,
  isDefaultAdminEmail,
} from "../../lib/ensureDefaultAdmin";
import { supabaseAdmin } from "../../lib/supabaseAdmin";
import { useAuth } from "./AuthContext";

type RoleOption = "admin" | "moderator";

export default function RoleSelfService() {
  const { user, role } = useAuth();
  const [open, setOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<RoleOption>("moderator");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const serviceKeyConfigured = useMemo(
    () => Boolean(import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY),
    []
  );

  const userId = user?.id;
  const isDefaultAdmin = isDefaultAdminEmail(user?.email ?? null);
  if (!userId) {
    return null;
  }

  const ensuredUserId: string = userId;
  const hasAssignedRole = role === "admin" || role === "moderator";

  function handleOpen() {
    if (isDefaultAdmin) {
      setSelectedRole(DEFAULT_ADMIN_ROLE);
    } else {
      setSelectedRole(hasAssignedRole ? (role as RoleOption) : "moderator");
    }
    setError(null);
    setOpen(true);
  }

  function handleClose() {
    if (saving) return;
    setOpen(false);
  }

  async function handleSubmit() {
    if (!serviceKeyConfigured || saving) {
      return;
    }

    setSaving(true);
    setError(null);

    try {
      const nextRole = isDefaultAdmin ? DEFAULT_ADMIN_ROLE : selectedRole;
      const { error: updateError } =
        await supabaseAdmin.auth.admin.updateUserById(ensuredUserId, {
          app_metadata: { role: nextRole },
        });

      if (updateError) {
        throw updateError;
      }

      window.location.reload();
    } catch (err: any) {
      console.error(err);
      setError(err?.message ?? "Rolni yangilab bo'lmadi");
      setSaving(false);
    }
  }

  function onSelectRole(event: SelectChangeEvent<RoleOption>) {
    setSelectedRole(event.target.value as RoleOption);
  }

  const triggerLabel = hasAssignedRole ? "Rolni o'zgartirish" : "Rolni tanlash";

  return (
    <>
      <Button
        variant="outlined"
        onClick={handleOpen}
        disabled={saving}
        fullWidth
      >
        {triggerLabel}
      </Button>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Rolni o'zgartirish</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={3}>
            {!serviceKeyConfigured && (
              <Alert severity="warning">
                VITE_SUPABASE_SERVICE_ROLE_KEY sozlanmagan. Rolni o'zgartirib
                bo'lmaydi.
              </Alert>
            )}

            <FormControl
              fullWidth
              disabled={saving || !serviceKeyConfigured || isDefaultAdmin}
            >
              <InputLabel id="self-role-select">Rol</InputLabel>
              <Select
                labelId="self-role-select"
                label="Rol"
                value={isDefaultAdmin ? DEFAULT_ADMIN_ROLE : selectedRole}
                onChange={onSelectRole}
              >
                <MenuItem value="admin">Administrator</MenuItem>
                <MenuItem value="moderator">Moderator</MenuItem>
              </Select>
              {isDefaultAdmin && (
                <FormHelperText>
                  Super administrator rolini o'zgartirib bo'lmaydi.
                </FormHelperText>
              )}
            </FormControl>

            {error && <Alert severity="error">{error}</Alert>}

            {isDefaultAdmin && (
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Bekhruz super administrator sifatida doimiy ravishda
                  administrator rolida qoladi.
                </Typography>
              </Box>
            )}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={saving}>
            Bekor qilish
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            disabled={saving || !serviceKeyConfigured}
          >
            {saving ? "Saqlanmoqda..." : "Saqlash"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
