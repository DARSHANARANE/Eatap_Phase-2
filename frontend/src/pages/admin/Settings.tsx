import TopNav from "../../layouts/TopNav";
// frontend/src/pages/admin/Settings.tsx
const Settings = () => {
  return (
    <div className="">
      <TopNav title="Settings" 
       subtitle="Manage system settings"
       showBackButton={true}
       />   
      <div className="p-6 bg-white-100 min-h-screen">
        <p className="text-gray-600 mb-4">
          Here you can manage various system settings and configurations.
        </p>
        {/* Add your settings components and forms here */}
      </div>
    </div>
  );
};

export default Settings;
