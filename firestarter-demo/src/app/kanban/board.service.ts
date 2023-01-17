import { Injectable, inject } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import {
  Firestore,
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  arrayRemove,
  query,
  where,
  orderBy,
  collectionData,
  writeBatch,
} from '@angular/fire/firestore';
import { switchMap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

import { Board, Task } from './board.modal';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  private fAuth = inject(Auth);
  private fStore = inject(Firestore);

  /**
   * Create new board for the current user.
   * @param data Details of the {@link Board} to create.
   */
  async createBoard(data: Board) {
    const user = this.fAuth.currentUser;
    return addDoc(collection(this.fStore, 'boards'), {
      ...data,
      uid: user?.uid,
      tasks: [{ description: 'Hello World', label: 'yellow' }],
    });
  }

  /**
   * Delete the given doc for the current user.
   * @param boardID ID of the board to remove.
   */
  deleteBoard(boardID: string) {
    const boards = collection(this.fStore, 'boards');
    const docToDelete = doc(boards, boardID);
    return deleteDoc(docToDelete);
  }

  /**
   * Update the tasks of the given doc for the current user.
   * @param boardID ID of the board to update its tasks.
   * @param tasks New array of tasks to store.
   */
  updateTasks(boardID: string, tasks: Task[]) {
    const boards = collection(this.fStore, 'boards');
    const docToUpdate = doc(boards, boardID);
    return updateDoc(docToUpdate, { tasks });
  }

  /**
   * Remove the given task from the given board for the current user.
   * @param boardID ID of the board to remove the given task.
   * @param task Task to remove.
   */
  removeTask(boardID: string, task: Task) {
    const boards = collection(this.fStore, 'boards');
    const docToUpdate = doc(boards, boardID);
    return updateDoc(docToUpdate, {
      tasks: arrayRemove(task),
    });
  }

  /**
   * Get all the boards that owned by the current user.
   */
  getUserBoards() {
    return authState(this.fAuth).pipe(
      switchMap(async (user) => {
        if (user != null) {
          const boards = collection(this.fStore, 'boards');
          const queryResult = query<Board>(
            boards,
            where('uid', '==', user.uid),
            orderBy('priority')
          );
          return collectionData<Board>(queryResult, {
            idField: 'id',
          });
        } else {
          return of([]);
        }
      })
    );
  }

  /**
   * Reorder boards when priority changed.
   * @param boards Boards to sort
   */
  sortBoards(boards: Board[]) {
    const dbBoards = boards.map((board) =>
      doc(collection(this.fStore, 'boards'), 'id')
    );
    const batch = writeBatch(this.fStore);
    dbBoards.forEach((board, index) =>
      batch.update(board, { priority: index })
    );
    batch.commit();
  }
}
