import UMBreadCrumb from "@/components/ui/UMBreadCrumb";

const SuperAdminPage = () => {
  return (
    <div>
      <UMBreadCrumb
        items={[
          {
            label: "super_admin",
            link: "/super_admin",
          },
        ]}
      />
      <h1>This page is for super admin</h1>
    </div>
  );
};

export default SuperAdminPage;
