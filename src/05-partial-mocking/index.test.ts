import {
  mockOne,
  mockTwo,
  mockThree,
  unmockedFunction
} from './index';

jest.spyOn(console, 'log');

jest.mock('./index', () => {
  const originalModule = jest.requireActual<typeof import('./index')>('./index');
  return {
    ...originalModule,
    mockOne: jest.fn(),
    mockTwo: jest.fn(),
    mockThree: jest.fn()
  };
});

describe('partial mocking', () => {
  afterAll(() => {
    jest.unmock('./index');
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    const spyLog = jest.spyOn(console, 'log');
    mockOne();
    mockTwo();
    mockThree();
    expect(spyLog).not.toHaveBeenCalled();
    spyLog.mockRestore();
  });

  test('unmockedFunction should log into console', () => {
    const spyLog = jest.spyOn(console, 'log');
    unmockedFunction();
    expect(spyLog).toHaveBeenCalledWith('I am not mocked');
    spyLog.mockRestore();
  });
});
