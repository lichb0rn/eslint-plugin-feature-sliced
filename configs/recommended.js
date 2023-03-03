const path = require('path');

module.exports = {
  plugins: [
    'conarti-fsd',
  ],
  extends: [
    path.resolve(__dirname, '../rules/import-order'),
  ],
  rules: {
    'conarti-fsd/layers-slices': ['error', {
      allowTypeImports: true,
    }],
    'conarti-fsd/path-checker': 'error',
    'conarti-fsd/public-api-imports': 'error',
  },
};
