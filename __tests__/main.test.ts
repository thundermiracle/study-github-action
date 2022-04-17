/* eslint-disable no-process-env */
import * as cp from 'child_process';
import * as path from 'path';

import { describe, expect, it } from '@jest/globals';

import { wait } from '../src/wait';

describe('main.ts', () => {
  it('throws invalid number', async () => {
    const input = parseInt('foo', 10);
    await expect(wait(input)).rejects.toThrow('milliseconds not a number');
  });

  it('wait 500 ms', async () => {
    const start = new Date();
    await wait(500);
    const end = new Date();
    const delta = Math.abs(end.getTime() - start.getTime());
    expect(delta).toBeGreaterThan(450);
  });

  // shows how the runner will run a javascript action with env / stdout protocol
  it('runs', () => {
    process.env.INPUT_MILLISECONDS = '500';
    const np = process.execPath;
    const ip = path.join(__dirname, '..', 'lib', 'main.js');
    const options: cp.ExecFileSyncOptions = {
      env: process.env,
    };
    // eslint-disable-next-line no-console
    console.log(cp.execFileSync(np, [ip], options).toString());
  });
});
