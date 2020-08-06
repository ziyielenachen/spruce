import React from "react";
import { ApolloError } from "apollo-client";
import { Divider, StyledLink } from "components/styles";
import { H3, P2 } from "components/Typography";
import { MetadataCard } from "components/MetadataCard";
import { msToDuration, getDateCopy } from "utils/string";
import { v4 as uuid } from "uuid";
import { GetTaskQuery } from "gql/generated/types";
import { DependsOn } from "pages/task/metadata/DependsOn";
import { useTaskAnalytics } from "analytics";
import { getUiUrl } from "utils/getEnvironmentVariables";

export const Metadata: React.FC<{
  loading: boolean;
  data: GetTaskQuery;
  error: ApolloError;
}> = ({ loading, data, error }) => {
  const task = data ? data.task : null;
  const taskAnalytics = useTaskAnalytics();

  const spawnHostLink = task?.spawnHostLink;
  const createTime = task?.createTime;
  const finishTime = task?.finishTime;
  const hostId = task?.hostId;
  const hostLink = task?.hostLink;
  const startTime = task?.startTime;
  const estimatedStart = task?.estimatedStart;
  const timeTaken = task?.timeTaken;
  const revision = task?.revision ?? "";
  const baseCommit = revision.slice(0, 10);
  const reliesOn = task?.reliesOn;
  const baseTaskMetadata = task?.baseTaskMetadata;
  const ami = task?.ami;
  const distroId = task?.distroId;
  const baseTaskDuration = baseTaskMetadata?.baseTaskDuration;
  const baseTaskLink = baseTaskMetadata?.baseTaskLink;

  const patchMetadata = task?.patchMetadata;
  const author = patchMetadata?.author;

  const distroLink = `${getUiUrl()}/distros##${distroId}`;
  return (
    <MetadataCard error={error} loading={loading} title="Task Metadata">
      <P2>Submitted by: {author}</P2>
      <P2 data-cy="task-metadata-submitted-at">
        Submitted at: {getDateCopy(createTime)}
      </P2>
      <P2>
        Estimated time to start:{" "}
        <span data-cy="task-metadata-estimated_start">
          {msToDuration(estimatedStart)}
        </span>
      </P2>
      <P2>
        Started:{" "}
        <span data-cy="task-metadata-started">{getDateCopy(startTime)}</span>
      </P2>
      <P2 data-cy="task-metadata-finished">
        Finished:{" "}
        <span data-cy="task-metadata-started">{getDateCopy(finishTime)}</span>
      </P2>
      <P2 data-cy="task-metadata-duration">
        Duration: {msToDuration(timeTaken)}{" "}
      </P2>
      {baseTaskDuration !== undefined && (
        <P2 data-cy="task-metadata-base-commit-duration">
          Base commit duration: {msToDuration(baseTaskDuration)}
        </P2>
      )}
      {baseTaskLink && (
        <P2>
          Base commit:{" "}
          <StyledLink
            data-cy="base-task-link"
            href={baseTaskLink}
            onClick={() =>
              taskAnalytics.sendEvent({ name: "Click Base Commit" })
            }
          >
            {baseCommit}
          </StyledLink>
        </P2>
      )}
      <P2>
        Distro:{" "}
        <StyledLink
          data-cy="task-distro-link"
          href={distroLink}
          onClick={() => taskAnalytics.sendEvent({ name: "Click Distro Link" })}
        >
          {distroId}
        </StyledLink>
      </P2>
      {ami && <P2 data-cy="task-metadata-ami">AMI: {ami}</P2>}
      <P2>
        Host:{" "}
        <StyledLink
          data-cy="task-host-link"
          href={hostLink}
          onClick={() => taskAnalytics.sendEvent({ name: "Click Host Link" })}
        >
          {hostId}
        </StyledLink>
      </P2>
      {spawnHostLink && (
        <P2>
          <StyledLink
            data-cy="task-spawn-host-link"
            href={spawnHostLink}
            onClick={() =>
              taskAnalytics.sendEvent({ name: "Click Spawn Host" })
            }
          >
            Spawn host
          </StyledLink>
        </P2>
      )}
      {reliesOn && reliesOn.length ? (
        <span data-cy="depends-on-container">
          <H3>Depends On</H3>
          <Divider />
          {reliesOn.map((props) => (
            <DependsOn key={uuid()} {...props} />
          ))}
        </span>
      ) : null}
    </MetadataCard>
  );
};
