import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { Button } from "antd";
import Link from "next/link";

const ManageFacultyPage = () => {
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
      <h1>Faculty List</h1>
      <Link href="/super_admin/manage-faculty/create">
        <Button type="primary">Create</Button>
      </Link>
    </div>
  );
};

export default ManageFacultyPage;
