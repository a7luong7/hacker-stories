module.exports = {
  env: {
    es2021: true,
    node: true,
    browser: true,
  },
  extends: [
    'plugin:react/recommended',
    'plugin:import/recommended',
    'airbnb-typescript'
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
  },
  plugins: [
    'react',
  ],
  rules: {
    'linebreak-style': ['error', 'windows'],
    'react/prop-types': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'jsx-a11y/label-has-associated-control': ['error', {
      required: {
        some: ['nesting', 'id'],
      },
    }],
    //"import/extensions": "off"
  },
  "settings": {
    "import/resolver": {
      "node": {
        "extensions": [".js", ".jsx", ".ts", ".tsx"],
        "moduleDirectory": ['node_modules', 'src'],
      },
      typescript: {} // this loads <rootdir>/tsconfig.json to eslint
    }
  },
};
