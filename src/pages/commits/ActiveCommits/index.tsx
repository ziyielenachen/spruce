import React from "react";
import styled from "@emotion/styled";
import { ChartTypes } from "types/commits";
import { BuildVariantCard } from "./BuildVariantCard";
import { CommitChart } from "./CommitChart";
import { CommitChartLabel } from "./CommitChartLabel";
import { ColorCount } from "./utils";

interface Props {
  version: {
    id: string;
    author: string;
    createTime: Date;
    message: string;
    revision: string;
    taskStatusCounts?: {
      status: string;
      count: number;
    }[];
    buildVariants?: {
      displayName: string;
    }[];
  };
  groupedTaskStats: ColorCount[];
  max: number;
  total: number;
  chartType: ChartTypes;
}

export const ActiveCommit: React.FC<Props> = ({
  version,
  groupedTaskStats,
  max,
  total,
  chartType,
}) => (
  <Container>
    <ColumnContainer key={version.id}>
      <CommitChart
        groupedTaskStats={groupedTaskStats}
        total={total}
        max={max}
        chartType={chartType}
      />
      <CommitChartLabel
        githash={version.revision.substring(0, 5)}
        createTime={version.createTime}
        author={version.author}
        message={version.message}
      />
    </ColumnContainer>
    <ColumnContainer>
      {version.buildVariants.map(({ displayName }) => (
        <BuildVariantCard
          buildVariantDisplayName={displayName}
          key={`${version.id}_${displayName}`}
        />
      ))}
    </ColumnContainer>
  </Container>
);

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin-bottom: 15px;
`;

const Container = styled.div`
  margin-bottom: 50px;
`;
