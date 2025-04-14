// CSS
import table from "@/styles/common/table.module.css";

const GroupLevelTable = () => {
  const groupLevels = [
    [1, 0, 22, 77060, 43, 604980],
    [2, 20, 23, 88440, 44, 648940],
    [3, 80, 24, 100920, 45, 694960],
    [4, 260, 25, 114500, 46, 743120],
    [5, 600, 26, 129260, 47, 793460],
    [6, 1140, 27, 145220, 48, 846020],
    [7, 1940, 28, 162440, 49, 900840],
    [8, 3040, 29, 180980, 50, 957980],
    [9, 4480, 30, 200880, 51, 1017500],
    [10, 6340, 31, 222180, 52, 1079420],
    [11, 8620, 32, 244940, 53, 1143800],
    [12, 11420, 33, 269200, 54, 1210700],
    [13, 14740, 34, 295000, 55, 1280160],
    [14, 18660, 35, 322420, 56, 1352220],
    [15, 23220, 36, 351460, 57, 1426940],
    [16, 28480, 37, 382220, 58, 1504360],
    [17, 34460, 38, 414700, 59, 1584520],
    [18, 41220, 39, 448980, 60, 1667500],
    [19, 48820, 40, 485100, 61, 1753300],
    [20, 57280, 41, 523120, null, null],
    [21, 66680, 42, 563060, null, null],
  ];
  return (
    <table className={table["table"]} style={{ margin: "10px auto" }}>
      <thead>
        <tr>
          <th>群等級</th>
          <th>積分</th>
          <th>群等級</th>
          <th>積分</th>
          <th>群等級</th>
          <th>積分</th>
        </tr>
      </thead>
      <tbody>
        {groupLevels.map((row, idx) => (
          <tr key={idx}>
            {row.map((value, i) => (
              <td key={i}>{value}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default GroupLevelTable;
