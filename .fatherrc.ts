import { IBundleOptions } from 'father';
import path from 'path';

const options: IBundleOptions = {
  esm: {
    type: 'rollup',
    importLibToEs: true
  },
  cjs: 'rollup',
  extraBabelPlugins: [
    ['import', { libraryName: 'antd', style: true }]
  ],
  // @ts-ignore
  doc: {
    base: '/react-table',
    propsParser: false,
    modifyBundlerConfig: (config) => {
      config['resolve'].alias = Object.assign({}, config['resolve'].alias, {
        '@table': path.resolve(__dirname, 'src'),
      });
      return config;
    },
    public: 'docs/public',
    indexHtml: 'docs/index.html',
    title: 'React Table',
    repository: 'https://github.com/ts-react/react-table',
    description: 'react table component',
  }
};

export default options;
