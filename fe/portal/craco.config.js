const eslint = require('./.eslintrc.js')

module.exports = {
  eslint: {
    enable: true,
    mode: 'extends',
    configure: eslint,
  },
  style: {
    postcss: {
      mode: "extends",
      plugins: [],
      env: {
        autoprefixer: {},
      },
      loaderOptions: {
        module: {
          rules: [
            {
              test: /\.css$/i,
              use: [
                'style-loader',
                'css-loader',
                {
                  loader: 'postcss-loader',
                  options: {
                    postcssOptions: {
                      plugins: [
                        'postcss-preset-env',
                      ],
                    },
                  },
                },
              ],
            },
          ],
        },
      }
    }
  }

}