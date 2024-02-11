import {
  BankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from './index';
import { random } from 'lodash';

const account = new BankAccount(1000);
const anotherAccount = new BankAccount(1200);
describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    expect(account.getBalance()).toBe(1000);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => account.withdraw(1100)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    expect(() => account.transfer(1100, anotherAccount)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => account.transfer(1000, account)).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    account.deposit(200);
    expect(account.getBalance()).toBe(1200);
  });

  test('should withdraw money', () => {
    account.withdraw(300);
    expect(account.getBalance()).toBe(900);
  });

  test('should transfer money', () => {
    account.transfer(450, anotherAccount);
    expect(account.getBalance()).toBe(450);
    expect(anotherAccount.getBalance()).toBe(1650);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const result = await account.fetchBalance();
    if (result) {
      expect(result).toEqual(expect.any(Number));
    }
  });

  test('should set new balance if fetchBalance returned number', async () => {
    class MyBankAccount extends BankAccount {
      bal = 0;
      public async fetchBalance(): Promise<number | null> {
        this.bal = random(0, 100, false);
        return this.bal;
      }
    }
    const myAccount = new MyBankAccount(1000);
    await myAccount.synchronizeBalance();
    expect(myAccount.getBalance()).toBe(myAccount.bal);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    class MyBankAccount extends BankAccount {
      public async fetchBalance(): Promise<number | null> {
        return null;
      }
    }
    const myAccount = new MyBankAccount(1000);
    await expect(myAccount.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
