"use client";
import { Card } from "@radix-ui/themes";
import { ResponsiveContainer, BarChart, XAxis, YAxis, Bar } from "recharts";
import React from "react";

interface Props {
  statusesCount: {
    open: number;
    inProgress: number;
    closed: number;
  };
}

const IssueChart = ({ statusesCount }: Props) => {
  const data = [
    { label: "Open", value: statusesCount.open },
    { label: "In Progress", value: statusesCount.inProgress },
    { label: "Closed", value: statusesCount.closed },
  ];

  return (
    <Card>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="label" />
          <YAxis />
          <Bar
            dataKey="value"
            barSize={60}
            style={{ fill: "var(--accent-9)" }}
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default IssueChart;
