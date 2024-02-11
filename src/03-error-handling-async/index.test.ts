import {
  resolveValue,
  throwError,
  throwCustomError,
  rejectCustomError,
  MyAwesomeError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const result = await resolveValue(1);
    expect(result).toBe(1);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const result = () => throwError('My Error');
    expect(result).toThrow('My Error');
  });

  test('should throw error with default message if message is not provided', () => {
    const result = () => throwError();
    expect(result).toThrow();
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    const result = () => throwCustomError();
    expect(result).toThrow('This is my awesome custom error!');
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    await expect(rejectCustomError()).rejects.toThrow(MyAwesomeError);
  });
});
