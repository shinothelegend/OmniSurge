const fs = require('fs');
const path = require('path');
const readline = require('readline');

const transcriptPath = 'C:/Users/JAIBAJRANG/.gemini/antigravity/brain/f8282b52-2ddd-41a7-9e81-cfecfbd4a7d7/.system_generated/logs/transcript_full.jsonl';

const files = {};

const rl = readline.createInterface({
  input: fs.createReadStream(transcriptPath),
  crlfDelay: Infinity,
});

rl.on('line', (line) => {
  try {
    const data = JSON.parse(line);
    // We only process steps up to step 1730 (prior to the scrib3 prompt at 1731)
    if (data.step_index <= 1730 && data.tool_calls) {
      for (const tc of data.tool_calls) {
        if (!tc.args) continue;
        const args = typeof tc.args === 'string' ? JSON.parse(tc.args) : tc.args;
        if (!args.Path) continue;

        const normalized = path.normalize(args.Path);
        if (!normalized.toLowerCase().includes('omnisurge\\frontend')) continue;

        if (tc.name === 'write_file') {
          files[normalized] = args.Content;
        } else if (tc.name === 'edit_file') {
          if (!files[normalized]) {
            if (fs.existsSync(normalized)) {
              files[normalized] = fs.readFileSync(normalized, 'utf8');
            } else {
              files[normalized] = '';
            }
          }
          if (args.Target && files[normalized].includes(args.Target)) {
            files[normalized] = files[normalized].split(args.Target).join(args.Replacement || '');
          }
        }
      }
    }
  } catch (err) {
    // Ignore JSON parse errors for non-JSON lines
  }
});

rl.on('close', () => {
  console.log(`Replaying complete. Found ${Object.keys(files).length} files to restore.`);
  for (const [filePath, content] of Object.entries(files)) {
    // Do not overwrite node_modules or package-lock if any
    if (filePath.includes('node_modules')) continue;
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Restored:', filePath);
  }
  console.log('All DESIGN.md files restored successfully!');
});

