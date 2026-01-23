import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";

interface MenuDialogProps {
  open: boolean;
  initialData?: {
    date: string;
    lunch: string[];
    dinner: string[];
  };
  onClose: () => void;
  onSubmit: (data: {
    date: string;
    lunch: string[];
    dinner: string[];
  }) => void;
}

const MenuDialog = ({
  open,
  initialData,
  onClose,
  onSubmit,
}: MenuDialogProps) => {
  const [date, setDate] = useState("");
  const [lunch, setLunch] = useState("");
  const [dinner, setDinner] = useState("");

  useEffect(() => {
    if (initialData) {
      setDate(initialData.date.split("T")[0]);
      setLunch(initialData.lunch.join(", "));
      setDinner(initialData.dinner.join(", "));
    } else {
      setDate(new Date().toISOString().split("T")[0]);
      setLunch("");
      setDinner("");
    }
  }, [initialData]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {initialData ? "Edit Menu" : "Add Menu"}
      </DialogTitle>

      <DialogContent sx={{ mt: 1 }}>
        <TextField
          label="Date"
          type="date"
          fullWidth
          value={date}
          onChange={(e) => setDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          margin="normal"
        />

        <TextField
          label="Lunch Items"
          placeholder="Rice, Dal, Sabji"
          fullWidth
          value={lunch}
          onChange={(e) => setLunch(e.target.value)}
          margin="normal"
        />

        <TextField
          label="Dinner Items"
          placeholder="Roti, Paneer"
          fullWidth
          value={dinner}
          onChange={(e) => setDinner(e.target.value)}
          margin="normal"
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          variant="contained"
          onClick={() =>
            onSubmit({
              date,
              lunch: lunch.split(",").map((i) => i.trim()),
              dinner: dinner.split(",").map((i) => i.trim()),
            })
          }
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MenuDialog;
