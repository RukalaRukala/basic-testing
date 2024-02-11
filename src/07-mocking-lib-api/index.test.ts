import { throttledGetDataFromApi } from './index';
import axios from 'axios';

describe('throttledGetDataFromApi', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  test('should create instance with provided base url', async () => {
    const baseURL = 'https://jsonplaceholder.typicode.com';
    jest.spyOn(axios, 'create');
    await throttledGetDataFromApi('/posts/1');
    expect(axios.create).toHaveBeenCalledWith({ baseURL });
  });

  test('should perform request to correct provided url', async () => {
    const data = jest.spyOn(axios.Axios.prototype, 'get');
    await throttledGetDataFromApi('/posts/1');
    jest.runAllTimers();
    expect(data).toBeCalledWith('/posts/1');
  });

  test('should return response data', async () => {
    const response = [{ id: 1, title: 'Testing' }];
    axios.Axios.prototype.get = jest.fn().mockResolvedValue({ data: response });
    const data = await throttledGetDataFromApi('/posts/1');
    jest.runAllTimers();
    expect(data).toEqual(response);
  });
});
