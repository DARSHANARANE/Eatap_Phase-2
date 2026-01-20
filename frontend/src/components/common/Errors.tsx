import { Snackbar, Alert } from "@mui/material";

/* ✅ Inline Error Component */
type Props = {
  message?: string;
};

export const InlineError = ({ message }: Props) => {
  if (!message) return null;

  return (
    <p className="text-sm text-red-500 mt-1 font-medium">
      {message}
    </p>
  );
};

/* ✅ Toast Component */
type ToastProps = {
  open: boolean;
  message: string;
  type: "success" | "error";
  onClose: () => void;
};

export const Toast = ({ open, message, type, onClose }: ToastProps) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert severity={type} onClose={onClose} variant="filled">
        {message}
      </Alert>
    </Snackbar>
  );
};
