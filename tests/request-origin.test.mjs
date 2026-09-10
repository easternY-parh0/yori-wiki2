import assert from 'node:assert/strict';
import { test } from 'node:test';
import { expectedRequestOrigin } from '../src/lib/server/request-origin.ts';

test('public origin overrides internal transport and normalizes origin notation', () => {
  const internal = 'http://127.0.0.1:5173';
  assert.equal(expectedRequestOrigin(undefined, internal), internal);
  assert.equal(expectedRequestOrigin('  ', internal), internal);
  assert.equal(expectedRequestOrigin(' https://PROJECT.example.com:443/ ', internal), 'https://project.example.com');
  assert.equal(expectedRequestOrigin('https://project.example.com:8443', internal), 'https://project.example.com:8443');
});

test('invalid public origins fail closed instead of using the internal origin', () => {
  for (const configured of ['not-a-url', 'null', '//project.example.com', 'ftp://project.example.com',
    'https://project.example.com/yoriwiki', 'https://user:pass@project.example.com',
    'https://project.example.com?x=1', 'https://project.example.com#fragment']) {
    assert.throws(() => expectedRequestOrigin(configured, 'http://127.0.0.1:5173'));
  }
});
