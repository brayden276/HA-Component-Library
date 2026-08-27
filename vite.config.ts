import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production';

  return {
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
