import { describe, expect, it } from 'vitest';
import { validateEmail, validatePassword, validateRequired } from './validation';

describe('validateEmail', () => {
  it('rejects empty input', () => {
    expect(validateEmail('')).toBe('Email is required');
    expect(validateEmail('   ')).toBe('Email is required');
  });

  it('rejects malformed emails', () => {
    expect(validateEmail('foo')).toBe('Please enter a valid email');
    expect(validateEmail('foo@')).toBe('Please enter a valid email');
    expect(validateEmail('foo@bar')).toBe('Please enter a valid email');
    expect(validateEmail('foo @bar.com')).toBe('Please enter a valid email');
  });

  it('accepts well-formed emails', () => {
    expect(validateEmail('test@example.com')).toBeNull();
    expect(validateEmail('a.b+c@sub.example.co.uk')).toBeNull();
  });
});

describe('validatePassword', () => {
  it('rejects empty password', () => {
    expect(validatePassword('')).toBe('Password is required');
  });

  it('rejects passwords shorter than 6 characters', () => {
    expect(validatePassword('12345')).toBe('Password must be at least 6 characters');
  });

  it('accepts 6+ character passwords', () => {
    expect(validatePassword('123456')).toBeNull();
    expect(validatePassword('a-longer-password')).toBeNull();
  });
});

describe('validateRequired', () => {
  it('rejects whitespace-only strings', () => {
    expect(validateRequired('')).toBe('This field is required');
    expect(validateRequired('  \t ')).toBe('This field is required');
  });

  it('uses supplied field name', () => {
    expect(validateRequired('', 'Name')).toBe('Name is required');
  });

  it('accepts non-empty content', () => {
    expect(validateRequired('x')).toBeNull();
  });
});
