import { Status } from "@prisma/client";
import { Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import { IssueStatusBadge } from "./components";

interface Props {
  statusesCount: {
    open: number;
    inProgress: number;
    closed: number;
  };
}

const IssueSummary = ({ statusesCount }: Props) => {
  const statuses: { label: string; value: number; status: Status }[] = [
    {
      label: "Open Issues",
      value: statusesCount.open,
      status: "OPEN",
    },
    {
      label: "In Progress Issues",
      value: statusesCount.inProgress,
      status: "IN_PROGRESS",
    },
    {
      label: "Closed Issues",
      value: statusesCount.closed,
      status: "CLOSED",
    },
  ];
  return (
    <Flex gap="4">
      {statuses.map((status) => (
        <Card key={status.label}>
          <Flex direction="column" align="start" gap="1">
            <Link
              href={`/issues/list?status=${status.status}`}
              className="text-sm font-medium"
            >
              {status.label}
            </Link>
            <Text size="5" className="font-bold">
              {status.value}
            </Text>
            <IssueStatusBadge status={status.status} />
          </Flex>
        </Card>
      ))}
    </Flex>
  );
};

export default IssueSummary;
