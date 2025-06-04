import table from "@/styles/common/table.module.css";
import level from "@/styles/common/level.module.css";

const LevelTable = () => {
  const levelData = [
    { lv: 1, exp: 0 },
    { lv: 2, exp: 1 },
    { lv: 3, exp: 4 },
    { lv: 4, exp: 13 },
    { lv: 5, exp: 30 },
    { lv: 6, exp: 57 },
    { lv: 7, exp: 97 },
    { lv: 8, exp: 152 },
    { lv: 9, exp: 224 },
    { lv: 10, exp: 317 },
    { lv: 11, exp: 431 },
    { lv: 12, exp: 571 },
    { lv: 13, exp: 737 },
    { lv: 14, exp: 933 },
    { lv: 15, exp: 1161 },
    { lv: 16, exp: 1424 },
    { lv: 17, exp: 1723 },
    { lv: 18, exp: 2061 },
    { lv: 19, exp: 2441 },
    { lv: 20, exp: 2864 },
    { lv: 21, exp: 3334 },
    { lv: 22, exp: 3853 },
    { lv: 23, exp: 4422 },
    { lv: 24, exp: 5046 },
    { lv: 25, exp: 5725 },
    { lv: 26, exp: 6463 },
    { lv: 27, exp: 7261 },
    { lv: 28, exp: 8122 },
    { lv: 29, exp: 9049 },
    { lv: 30, exp: 10044 },
    { lv: 31, exp: 11109 },
    { lv: 32, exp: 12247 },
    { lv: 33, exp: 13460 },
    { lv: 34, exp: 14750 },
    { lv: 35, exp: 16121 },
    { lv: 36, exp: 17573 },
    { lv: 37, exp: 19111 },
    { lv: 38, exp: 20735 },
    { lv: 39, exp: 22449 },
    { lv: 40, exp: 24255 },
    { lv: 41, exp: 26156 },
    { lv: 42, exp: 28153 },
    { lv: 43, exp: 30249 },
    { lv: 44, exp: 32447 },
    { lv: 45, exp: 34748 },
    { lv: 46, exp: 37156 },
    { lv: 47, exp: 39673 },
    { lv: 48, exp: 42301 },
    { lv: 49, exp: 45042 },
    { lv: 50, exp: 47899 },
    { lv: 51, exp: 50875 },
    { lv: 52, exp: 53971 },
    { lv: 53, exp: 57190 },
    { lv: 54, exp: 60535 },
    { lv: 55, exp: 64008 },
  ];
  return (
    <table className={table["table"]}>
      <thead>
        <tr>
          <th>等級圖示</th>
          <th>等級</th>
          <th>所需經驗值</th>
        </tr>
      </thead>
      <tbody>
        {levelData.map(({ lv, exp }) => (
          <tr key={lv}>
            <td>
              <span className={`${level["levelIcon"]} ${level[`lv-${lv}`]}`} />
            </td>
            <td>{lv}</td>
            <td>{exp}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default LevelTable;
