import assert from 'node:assert/strict';
import { test } from 'node:test';
import { normalizeBasePath, parseAllowedHosts } from '../config/environment.js';

test('base paths support root, arbitrary nested prefixes and trailing slash normalization', () => {
  for (const [input, expected] of [['', ''], ['/', ''], ['/foo', '/foo'], ['/projects/yori/', '/projects/yori']]) {
    assert.equal(normalizeBasePath(input), expected);
  }
  for (const input of ['foo', '//host', '/foo//bar', '/foo?x=1', '/foo#bar', '/foo bar', '/foo\\bar', '/foo/../bar', '/./foo']) {
    assert.throws(() => normalizeBasePath(input), /BASE_PATH/);
  }
});

test('host allowlist trims entries and preserves Vite defaults when unset', () => {
  assert.equal(parseAllowedHosts(undefined), undefined);
  assert.deepEqual(parseAllowedHosts(' , '), []);
  assert.deepEqual(parseAllowedHosts(' project.example.com, , dev.example.com '), ['project.example.com', 'dev.example.com']);
});
