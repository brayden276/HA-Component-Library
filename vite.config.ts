import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

export default defineConfig(({ command, mode }) => {
  const isProduction = mode === 'production';
  const useProductionLitInDevServer = command === 'serve';
  const nodeModules = resolve(__dirname, 'node_modules');

  // The standalone browser preview can inherit a legacy ShadyDOM shim. Lit's
  // development renderer routes attributes through that shim, which is not
  // compatible with modern browser elements. Only the dev server resolves Lit
  // to its browser production modules; the library build is unchanged.
  const devLitAliases = useProductionLitInDevServer
    ? [
        { find: /^lit$/, replacement: resolve(nodeModules, 'lit/index.js') },
        { find: /^lit\/(.*)$/, replacement: `${resolve(nodeModules, 'lit')}/$1` },
        { find: /^lit-html$/, replacement: resolve(nodeModules, 'lit-html/lit-html.js') },
        { find: /^lit-html\/(.*)$/, replacement: `${resolve(nodeModules, 'lit-html')}/$1` },
        { find: /^lit-element\/(.*)$/, replacement: `${resolve(nodeModules, 'lit-element')}/$1` },
        { find: /^@lit\/reactive-element$/, replacement: resolve(nodeModules, '@lit/reactive-element/reactive-element.js') },
        { find: /^@lit\/reactive-element\/(.*)$/, replacement: `${resolve(nodeModules, '@lit/reactive-element')}/$1` },
      ]
    : [];

  return {
    resolve: {
      alias: devLitAliases,
    },
    optimizeDeps: useProductionLitInDevServer
      ? {
          exclude: ['lit', 'lit-html', 'lit-element', '@lit/reactive-element'],
        }
      : undefined,
    plugins: [
      dts({
        entryRoot: 'src',
        outDir: 'dist',
        insertTypesEntry: true,
        rollupTypes: true,
      }),
    ],
    define: {
      'process.env.NODE_ENV': JSON.stringify(isProduction ? 'production' : 'development')
    },
    build: {
      lib: {
        entry: resolve(__dirname, 'src/index.ts'),
        name: 'HAComponentLibrary',
        fileName: () => 'ha-component-library.js',
        formats: ['es']
      },
      rollupOptions: {
        // Home Assistant loads custom cards as standalone browser ES modules.
        // We bundle Lit & dependencies directly so it works out-of-the-box in Lovelace dashboards.
        external: [],
        output: {
          inlineDynamicImports: true,
          assetFileNames: 'ha-component-library.[ext]'
        }
      },
      outDir: 'dist',
      sourcemap: !isProduction,
      minify: isProduction ? 'esbuild' : false,
      target: 'es2022'
    },
    server: {
      port: 5173,
      host: true,
      open: false
    }
  };
});
