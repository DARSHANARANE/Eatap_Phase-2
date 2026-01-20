type AlertProps = {
  message: string;
  type: "error" | "success";
};

const AlertMessage = ({ message, type }: AlertProps) => {
  if (!message) return null;

  return (
    <div
      className={`p-3 mb-4 rounded border-l-4 text-sm
      ${type === "error"
        ? "bg-red-50 text-red-700 border-red-500"
        : "bg-green-50 text-green-700 border-green-500"}`}
    >
      {message}
    </div>
  );
};

export default AlertMessage;
