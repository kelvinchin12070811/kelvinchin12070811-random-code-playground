export interface Board {
  id?: string;
  title?: string;
  prioritiy?: number;
  tasks?: Task[];
}

export interface Task {
  description?: string;
  label?: 'purple' | 'blue' | 'green' | 'yellow' | 'red' | 'grey';
}
