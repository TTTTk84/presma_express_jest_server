module.exports = {
  // Jestの検索対象となるパス
  roots: ["<rootDir>"],
  // テストコードを書いたファイルを特定するための条件
  testMatch: [
    "**/__tests__/**/*.+(ts|tsx|js)",
    "**/?(*.)+(spec|test).+(ts|tsx|js)",
  ],
  // ts/tsxファイルに対してts-jestを使うよう設定
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  preset: "ts-jest",
};
