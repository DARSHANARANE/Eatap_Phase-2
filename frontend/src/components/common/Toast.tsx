import { Snackbar, Alert } from "@mui/material";

type ToastProps = {
  open: boolean;
  message: string;
  onClose: () => void;
  severity?: "success" | "error" | "warning" | "info"; // ✅ dynamic type
};

export const Toast = ({
  open,
  message,
  onClose,
  severity = "success", // ✅ default
}: ToastProps) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert severity={severity} onClose={onClose} variant="filled">
        {message}
      </Alert>
    </Snackbar>
  );
};
