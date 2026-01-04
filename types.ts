
export enum TransactionStatus {
  IDLE = 'IDLE',
  BURNING = 'BURNING',
  PROVING = 'PROVING',
  MINTING = 'MINTING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED'
}

export interface TransactionStep {
  status: TransactionStatus;
  label: string;
  description: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface BurnData {
  amount: string;
  recipient: string;
  sender: string;
}
