import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    let tempBalance: Balance = { income: 0, outcome: 0, total: 0 };

    this.transactions.forEach(transaction => {
      if (transaction.type === 'income') {
        tempBalance = {
          income: transaction.value + tempBalance.income,
          outcome: tempBalance.outcome,
          total: transaction.value + tempBalance.income - tempBalance.outcome,
        };
      } else {
        tempBalance = {
          income: tempBalance.income,
          outcome: transaction.value + tempBalance.outcome,
          total: tempBalance.income - (transaction.value + tempBalance.outcome),
        };
      }

      return tempBalance;
    });

    return tempBalance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ type, value, title });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
