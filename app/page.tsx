import { Box } from "@radix-ui/themes";
import { Pagination } from "./components";
import LastestIssues from "./LastestIssues";

export default function Home({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  return <LastestIssues />;
}
