import { redirect } from "next/navigation";

const HomePage = () => {
  return redirect("/profile");
};

export default HomePage;
