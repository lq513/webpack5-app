module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb-typescript',
    // 'airbnb',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
    project: ['./tsconfig.json'],
  },
  plugins: [
    'react',
    '@typescript-eslint',
    'import',
  ],
  settings: {
    'import/resolver': {
      webpack: {
        config: './config/webpack.base.js', // eslint识别别名
      },
    },
  },
  rules: {
    'linebreak-style': 0, // 换行符号
  },
};

// interface ParserOptions {
//   ecmaFeatures?: {
//     jsx?: boolean;
//     globalReturn?: boolean;
//   };
//   ecmaVersion?: number | 'latest';

//   jsxPragma?: string | null;
//   jsxFragmentName?: string | null;
//   lib?: string[];

//   project?: string | string[];
//   projectFolderIgnoreList?: string[];
//   tsconfigRootDir?: string;
//   extraFileExtensions?: string[];
//   warnOnUnsupportedTypeScriptVersion?: boolean;

//   program?: import('typescript').Program;
//   moduleResolver?: string;
// }