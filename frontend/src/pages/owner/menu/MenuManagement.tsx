
import MessMenuManager from "../../../components/menu/MessMenuManager";
import { useOwner } from "../../../hooks/useOwner";


const OwnerMenuPage = () => {
  const { owner, loading } = useOwner();

  if (loading) return <p>Loading...</p>;
  if (!owner) return null;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Menu</h1>

      <MessMenuManager
        messId={owner.messId}
        canDelete={false} // optional rule
      />
    </div>
  );
};

export default OwnerMenuPage;
