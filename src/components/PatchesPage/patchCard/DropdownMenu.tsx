import React, { useState } from "react";
import { ButtonDropdown } from "components/ButtonDropdown";
import { LinkToReconfigurePage } from "components/LinkToReconfigurePage";
import {
  SchedulePatchTasks,
  UnscheduleTasks,
  RestartPatch,
  EnqueuePatch,
} from "components/PatchActionButtons";
import { Patch } from "gql/generated/types";

interface Props {
  patchId: string;
  canEnqueueToCommitQueue: boolean;
  isPatchOnCommitQueue: boolean;
  patchDescription: string;
  childPatches: Partial<Patch>[];
}
export const DropdownMenu: React.FC<Props> = ({
  patchId,
  childPatches,
  canEnqueueToCommitQueue,
  isPatchOnCommitQueue,
  patchDescription,
}) => {
  const restartModalVisibilityControl = useState(false);
  const enqueueModalVisibilityControl = useState(false);
  const dropdownItems = [
    <LinkToReconfigurePage
      key="reconfigure"
      patchId={patchId}
      disabled={isPatchOnCommitQueue}
    />,
    <SchedulePatchTasks
      key="schedule"
      patchId={patchId}
      refetchQueries={refetchQueries}
    />,
    <UnscheduleTasks
      key="unschedule"
      patchId={patchId}
      refetchQueries={refetchQueries}
    />,
    <RestartPatch
      visibilityControl={restartModalVisibilityControl}
      key="restart"
      patchId={patchId}
      childPatches={childPatches}
      refetchQueries={refetchQueries}
    />,
    <EnqueuePatch
      visibilityControl={enqueueModalVisibilityControl}
      key="enqueue"
      patchId={patchId}
      commitMessage={patchDescription}
      disabled={!canEnqueueToCommitQueue}
      refetchQueries={refetchQueries}
    />,
  ];

  return (
    <ButtonDropdown
      data-cy="patch-card-dropdown"
      dropdownItems={dropdownItems}
    />
  );
};

const refetchQueries = ["PatchBuildVariants"];
