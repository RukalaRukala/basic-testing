import { simpleCalculator, Action } from './index';

describe('simpleCalculator table-tests', () => {
  const testCases = [
    { a: 5, b: 3, action: Action.Add, expected: 8 },
    { a: 7, b: 3, action: Action.Subtract, expected: 4 },
    { a: 8, b: 3, action: Action.Multiply, expected: 24 },
    { a: 18, b: 3, action: Action.Divide, expected: 6 },
    { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
    { a: 2, b: 3, action: '&', expected: null },
    { a: 'B', b: 'N', action: Action.Add, expected: null },
  ];

  testCases.forEach((testCase, index) => {
    test(`Test case ${index + 1}: action ${testCase.action}, args ${
      testCase.a
    } and ${testCase.b}`, () => {
      const result = simpleCalculator({
        a: testCase.a,
        b: testCase.b,
        action: testCase.action,
      });
      expect(result).toBe(testCase.expected);
    });
  });
});
