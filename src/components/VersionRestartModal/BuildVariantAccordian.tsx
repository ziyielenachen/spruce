import React from "react";
import styled from "@emotion/styled";
import Checkbox from "@leafygreen-ui/checkbox";
import { Accordion } from "components/Accordion";
import Badge from "components/Badge";
import { selectedStrings } from "hooks/usePatchStatusSelect";
import { TaskStatusCheckboxContainer } from "./TaskStatusCheckboxContainer";

interface BuildVariantAccordianProps {
  tasks: {
    id: string;
    status: string;
    baseStatus?: string;
    displayName: string;
  }[];
  displayName: string;
  selectedTasks: selectedStrings;
  toggleSelectedTask: (id: string | string[]) => void;
}
export const BuildVariantAccordian: React.FC<BuildVariantAccordianProps> = ({
  tasks,
  displayName,
  selectedTasks,
  toggleSelectedTask,
}) => {
  const taskLength = tasks.length;
  const matchingTasks = countMatchingTasks(tasks, selectedTasks);
  const variantTitle = (
    <>
      <Checkbox
        data-cy="variant-checkbox-select-all"
        onChange={() => toggleSelectedTask(tasks.map((task) => task.id))}
        label={displayName}
        checked={matchingTasks === taskLength}
        indeterminate={matchingTasks > 0 && matchingTasks !== taskLength}
        bold
      />
      <BadgeWrapper>
        <Badge data-cy="task-status-badge">
          {matchingTasks} of {taskLength} Selected
        </Badge>
      </BadgeWrapper>
    </>
  );
  return (
    <AccordionWrapper data-cy="variant-accordion">
      <Accordion
        title={variantTitle}
        contents={
          <TaskStatusCheckboxContainer
            tasks={tasks}
            selectedTasks={selectedTasks}
            toggleSelectedTask={toggleSelectedTask}
          />
        }
      />
    </AccordionWrapper>
  );
};

const countMatchingTasks = (
  tasks: { id: string }[],
  selectedTasks: selectedStrings
): number => {
  let matchingTasks = 0;
  tasks.forEach((task) => {
    if (selectedTasks[task.id]) {
      matchingTasks += 1;
    }
  });
  return matchingTasks;
};

const AccordionWrapper = styled("div")`
  padding-bottom: 12px;
  padding-top: 12px;
`;

const BadgeWrapper = styled("div")`
  padding-left: 10px;
`;
