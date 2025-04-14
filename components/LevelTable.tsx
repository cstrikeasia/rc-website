import Image from "next/image";

// CSS
import table from "@/styles/common/table.module.css";

const LevelTable = () => {
  const levelData = [
    { level: 1, exp: 0 },
    { level: 2, exp: 1 },
    { level: 3, exp: 4 },
    { level: 4, exp: 13 },
    { level: 5, exp: 30 },
    { level: 6, exp: 57 },
    { level: 7, exp: 97 },
    { level: 8, exp: 152 },
    { level: 9, exp: 224 },
    { level: 10, exp: 317 },
    { level: 11, exp: 431 },
    { level: 12, exp: 571 },
    { level: 13, exp: 737 },
    { level: 14, exp: 933 },
    { level: 15, exp: 1161 },
    { level: 16, exp: 1424 },
    { level: 17, exp: 1723 },
    { level: 18, exp: 2061 },
    { level: 19, exp: 2441 },
    { level: 20, exp: 2864 },
    { level: 21, exp: 3334 },
    { level: 22, exp: 3853 },
    { level: 23, exp: 4422 },
    { level: 24, exp: 5046 },
    { level: 25, exp: 5725 },
    { level: 26, exp: 6463 },
    { level: 27, exp: 7261 },
    { level: 28, exp: 8122 },
    { level: 29, exp: 9049 },
    { level: 30, exp: 10044 },
    { level: 31, exp: 11109 },
    { level: 32, exp: 12247 },
    { level: 33, exp: 13460 },
    { level: 34, exp: 14750 },
    { level: 35, exp: 16121 },
    { level: 36, exp: 17573 },
    { level: 37, exp: 19111 },
    { level: 38, exp: 20735 },
    { level: 39, exp: 22449 },
    { level: 40, exp: 24255 },
    { level: 41, exp: 26156 },
    { level: 42, exp: 28153 },
    { level: 43, exp: 30249 },
    { level: 44, exp: 32447 },
    { level: 45, exp: 34748 },
    { level: 46, exp: 37156 },
    { level: 47, exp: 39673 },
    { level: 48, exp: 42301 },
    { level: 49, exp: 45042 },
    { level: 50, exp: 47899 },
    { level: 51, exp: 50875 },
    { level: 52, exp: 53971 },
    { level: 53, exp: 57190 },
    { level: 54, exp: 60535 },
    { level: 55, exp: 64008 },
  ];
  const levelImages = Object.fromEntries(
    Array.from({ length: 55 }, (_, i) => {
      const level = i + 1;
      return [level, require(`@/images/level/${level}.png`)];
    })
  );
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
        {levelData.map(({ level, exp }) => (
          <tr key={level}>
            <td>
              <Image
                src={levelImages[level]}
                alt={`Level ${level}`}
                width={15}
                height={15}
              />
            </td>
            <td>{level}</td>
            <td>{exp}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default LevelTable;
