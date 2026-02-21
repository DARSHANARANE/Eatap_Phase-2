import MenuManager from "../../../components/menu/MenuManager";
import { useOwner } from "../../../hooks/useOwner";

const MenuManagement = () => {
  const { owner, loading } = useOwner();

  console.log("owner:", owner);

  if (loading) return <p>Loading...</p>;

  // FIX HERE
  if (!owner?.messId) return <p>No mess assigned</p>;

  return (
    <MenuManager
      messId={owner.messId}
      title="Manage Menu"
    />
  );
};

export default MenuManagement;