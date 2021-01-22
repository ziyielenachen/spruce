import React, { useState } from "react";
import styled from "@emotion/styled";
import { Tooltip } from "antd";
import { useAnnotationAnalytics } from "analytics";
import { ConditionalWrapper } from "components/ConditionalWrapper";
import { PlusButton } from "components/Spawn";
import { IssueLink } from "gql/generated/types";
import { AddIssueModal } from "./AddIssueModal";
import { AnnotationTicketsTable } from "./AnnotationTicketsTable";
import { TicketsTitle, TitleAndButtons } from "./BBComponents";

interface Props {
  annotationId: string;
  taskId: string;
  execution: number;
  tickets: IssueLink[];
  isIssue: boolean;
  userCanModify: boolean;
}

export const AnnotationTickets: React.FC<Props> = ({
  annotationId,
  tickets,
  taskId,
  execution,
  isIssue,
  userCanModify,
}) => {
  const annotationAnalytics = useAnnotationAnalytics();
  const title = isIssue ? "Issues" : "Suspected Issues";
  const buttonText = isIssue ? "Add Issue" : "Add Suspected Issue";
  const [
    isAddAnnotationModalVisible,
    setIsAddAnnotationModalVisible,
  ] = useState<boolean>(false);
  const [selectedRowKey, setSelectedRowKey] = useState("");
  const onClickAdd = () => {
    setIsAddAnnotationModalVisible(true);
    const analyticsType = isIssue
      ? "Click Add Annotation Issue Button"
      : "Click Add Annotation Suspected Issue Button";
    annotationAnalytics.sendEvent({ name: analyticsType });
  };
  return (
    <>
      <TitleAndButtons>
        <TicketsTitle>{title} </TicketsTitle>
        <ConditionalWrapper
          condition={!userCanModify}
          wrapper={(children) => (
            <Tooltip title="You are not authorized to edit task annotations">
              <span>{children}</span>
            </Tooltip>
          )}
        >
          <StyledButton
            onClick={onClickAdd}
            data-cy={
              isIssue ? "add-issue-button" : "add-suspected-issue-button"
            }
            disabled={!userCanModify}
          >
            {buttonText}
          </StyledButton>
        </ConditionalWrapper>
      </TitleAndButtons>
      {tickets?.length > 0 && (
        <AnnotationTicketsTable
          jiraIssues={tickets}
          annotationId={annotationId}
          taskId={taskId}
          execution={execution}
          isIssue={isIssue}
          userCanModify={userCanModify}
          selectedRowKey={selectedRowKey}
        />
      )}
      <AddIssueModal
        dataCy="addIssueModal"
        visible={isAddAnnotationModalVisible}
        closeModal={() => setIsAddAnnotationModalVisible(false)}
        setSelectedRowKey={setSelectedRowKey}
        taskId={taskId}
        execution={execution}
        isIssue={isIssue}
      />
    </>
  );
};

const StyledButton = styled(PlusButton)`
  margin-top: 10px;
  margin-bottom: 10px;
`;
