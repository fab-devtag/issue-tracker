import { Box, Flex } from "@radix-ui/themes";
import { Pagination } from "./components";
import LastestIssues from "./LastestIssues";
import IssueSummary from "./IssueSummary";
import prisma from "@/prisma/client";

export default async function Home() {
  const open = await prisma.issue.count({ where: { status: "OPEN" } });
  const inProgress = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });
  const closed = await prisma.issue.count({ where: { status: "CLOSED" } });

  return (
    <Flex direction="column" gap="4">
      <IssueSummary open={open} inProgress={inProgress} closed={closed} />
      <LastestIssues />
    </Flex>
  );
}
