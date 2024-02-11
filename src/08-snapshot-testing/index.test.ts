import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  test('should generate linked list from values 1', () => {
    const values = ['A', 'B', 'C'];
    const expectedList = {
      value: 'A',
      next: {
        value: 'B',
        next: {
          value: 'C',
          next: {
            value: null,
            next: null,
          },
        },
      },
    };

    const result = generateLinkedList(values);

    expect(result).toStrictEqual(expectedList);
  });

  test('should generate linked list from values 2', () => {
    const values = [4, 5, 6];

    const result = generateLinkedList(values);

    expect(result).toMatchSnapshot();
  });
});
