import UMBreadCrumb from "@/components/ui/UMBreadCrumb";

const ManageUsersPage = () => {
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
      <h1>User List</h1>
    </div>
  );
};

export default ManageUsersPage;
