export interface ITodo {
  id: string;
  task: string;
  state: 'todo' | 'doing' | 'done';
  priority: number;
  superTask: null | string;
  subTask: string[];
  startedAt: string;
  endedAt: string;
}
