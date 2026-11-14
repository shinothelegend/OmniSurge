const fs = require('fs');
const path = require('path');
const oxide = require('@tailwindcss/oxide');
const { compile } = require('@tailwindcss/node');

async function build() {
  const css = '@import "tailwindcss";';
  const compiled = await compile(css, { base: path.resolve(__dirname, '..'), onDependency: () => {} });
  const s = new oxide.Scanner({});
  const candidates = s.scan();
  console.log(`[Tailwind] Discovered ${candidates.length} candidate classes.`);
  const out = compiled.build(candidates);
  const outPath = path.resolve(__dirname, '../src/app/tailwind-built.css');
  fs.writeFileSync(outPath, out, 'utf8');
  console.log(`[Tailwind] Generated ${outPath} (${out.length} bytes).`);
}

build().catch(err => {
  console.error(err);
  process.exit(1);
});
