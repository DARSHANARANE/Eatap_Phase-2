import { useParams } from "react-router-dom";
import MenuManager from "../../../components/menu/MenuManager";

const MessDetails = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) return null;

  return (
    <MenuManager
      messId={id}
      title="Mess Details"
      showBackButton={true}
    />
  );
};

export default MessDetails;