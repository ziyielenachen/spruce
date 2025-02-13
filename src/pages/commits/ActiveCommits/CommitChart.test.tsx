import userEvent from "@testing-library/user-event";
import { render, act } from "test_utils/test-utils";
import { ChartTypes } from "types/commits";
import { CommitChart } from "./CommitChart";
import {
  findMaxGroupedTaskStats,
  getAllTaskStatsGroupedByColor,
} from "./utils";

afterEach(() => {
  jest.clearAllTimers();
  jest.clearAllMocks();
});
describe("CommitChart", () => {
  test("Display right amount of bars", () => {
    const { queryAllByDataCy } = render(
      <CommitChart
        key={versions[0].version.id}
        groupedTaskStats={groupedTaskData[versions[0].version.id].stats}
        total={groupedTaskData[versions[0].version.id].total}
        max={max}
        chartType={ChartTypes.Absolute}
      />
    );
    expect(queryAllByDataCy("commit-chart-bar")).toHaveLength(4);
  });

  test("Hovering over the chart should open a tooltip", async () => {
    const { queryByDataCy } = render(
      <CommitChart
        key={versions[0].version.id}
        groupedTaskStats={groupedTaskData[versions[0].version.id].stats}
        total={groupedTaskData[versions[0].version.id].total}
        max={max}
        chartType={ChartTypes.Absolute}
      />
    );
    jest.useFakeTimers();

    expect(queryByDataCy("commit-chart-tooltip")).toBeNull();
    userEvent.hover(queryByDataCy("commit-chart-container"));
    //   Need to use fake timers to get around @leafygreen-ui/tooltip debounce
    act(() => {
      jest.runAllTimers();
    });
    expect(queryByDataCy("commit-chart-tooltip")).toBeInTheDocument();
  });

  test("Should show all umbrella statuses (normal and dimmed) and their counts ", async () => {
    const { queryByDataCy, queryAllByDataCy } = render(
      <CommitChart
        key={versions[0].version.id}
        groupedTaskStats={groupedTaskData[versions[0].version.id].stats}
        total={groupedTaskData[versions[0].version.id].total}
        max={max}
        chartType={ChartTypes.Absolute}
      />
    );
    jest.useFakeTimers();

    expect(queryByDataCy("commit-chart-tooltip")).toBeNull();
    userEvent.hover(queryByDataCy("commit-chart-container"));
    //   Need to use fake timers to get around @leafygreen-ui/tooltip debounce
    act(() => {
      jest.runAllTimers();
    });
    expect(queryByDataCy("commit-chart-tooltip")).toBeInTheDocument();
    expect(queryAllByDataCy("current-status-count")).toHaveLength(4);
    expect(queryByDataCy("commit-chart-tooltip")).toHaveTextContent("6");
    expect(queryByDataCy("commit-chart-tooltip")).toHaveTextContent("2");
    expect(queryByDataCy("commit-chart-tooltip")).toHaveTextContent("5");
    expect(queryByDataCy("commit-chart-tooltip")).toHaveTextContent("0");
  });
});

const versions = [
  {
    version: {
      id: "123",
      createTime: new Date("2021-06-16T23:38:13Z"),
      message: "SERVER-57332 Create skeleton InternalDocumentSourceDensify",
      revision: "4337c33fa4a0d5c747a1115f0853b5f70e46f112",
      author: "Mohamed Khelif",
      taskStatusCounts: [
        { status: "success", count: 6 },
        { status: "failed", count: 2 },
        { status: "dispatched", count: 4 },
        { status: "started", count: 5 },
        { status: "will-run", count: 2 },
      ],
    },
    rolledUpVersions: null,
  },
];

const groupedTaskData = getAllTaskStatsGroupedByColor(versions);
const { max } = findMaxGroupedTaskStats(groupedTaskData);
