import path from "path";
import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";

const __dirname = path.resolve();

export default async (
  env: Record<string, string>,
  argv: { configName: string[]; mode: string },
) => {
  const plugins: webpack.WebpackPluginInstance[] = [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/index.html",
      scriptLoading: "blocking",
    }),
  ];

  const common: webpack.Configuration = {
    entry: {
      main: {
        import: "./src/main",
      },
    },
    resolve: {
      extensions: [".ts"],
    },
    output: {
      path: `${__dirname}/dist/`,
      filename: "[name].[contenthash].js",
      clean: true,
      publicPath: "/",
    },
    plugins,
  }

  const configSwc: webpack.Configuration = {
    name: "swc-loader",
    ...common,
    module: {
      rules: [
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          use: {
            loader: "swc-loader",
            options: {
              jsc: {
                parser: {
                  syntax: "typescript",
                },
              },
            },
          },
        },
      ],
    },
  };

  const configTs: webpack.Configuration = {
    name: "ts-loader",
    ...common,
    module: {
      rules: [
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          use: {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
            },
          },
        },
      ],
    },
  };

  return [
    configSwc,
    configTs,
  ];
};
