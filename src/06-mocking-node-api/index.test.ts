import {
  doStuffByInterval,
  doStuffByTimeout,
  readFileAsynchronously
} from './index';
import * as fs from "fs";
import * as path from "path";

jest.mock('path', () => {
  const originalModule = jest.requireActual('path');

  return {
    ...originalModule,

    join: (path1: string, path2: string) => `${path1}/${path2}`,
  };
});

// const foo = {join};
const callback = jest.fn();

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const timeout = 500;
    doStuffByTimeout(callback, timeout);
    jest.advanceTimersByTime(timeout);
    expect(callback).toHaveBeenCalled();
  });

  test('should call callback only after timeout', () => {
    const timeout = 500;
    doStuffByTimeout(callback, timeout);
    jest.advanceTimersByTime(timeout - 100);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(200);
    expect(callback).toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const timeout = 500;
    doStuffByInterval(callback, timeout);
    jest.advanceTimersByTime(timeout);
    expect(callback).toHaveBeenCalled();
  });

  test('should call callback multiple times after multiple intervals', () => {
    const timeout = 500;
    doStuffByInterval(callback, timeout);
    jest.advanceTimersByTime(timeout - 100);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(200);
    expect(callback).toHaveBeenCalled();
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const pathToFile = './index.ts';
    jest.spyOn(path, 'join')
    await readFileAsynchronously(pathToFile);
    expect(path.join).toHaveBeenCalledWith(__dirname, pathToFile);
  });

  test('should return null if file does not exist', async () => {
    const mockFile = '...not existed...';
    await expect(readFileAsynchronously(mockFile)).resolves.toBeNull();
  });

  test('should return file content if file exists', async () => {
    const mockFile = 'src/06-mocking-node-api/index.test.ts';
    fs.readFile(mockFile, 'utf8', async (data) => {
      await expect(readFileAsynchronously(mockFile)).resolves.toBe(data);
    });
  });
});
