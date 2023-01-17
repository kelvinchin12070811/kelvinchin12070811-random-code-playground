import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, inject, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Board, Task } from '../board.modal';
import { BoardService } from '../board.service';
import { TaskDialogComponent } from '../dialogs/task-dialog.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent {
  @Input()
  public board!: Board;

  public boardService = inject(BoardService);
  private dialog = inject(MatDialog);

  taskDrop(ev: CdkDragDrop<string[]>) {
    moveItemInArray(this.board.tasks!, ev.previousIndex, ev.currentIndex);
    this.boardService.updateTasks(this.board.id!, this.board.tasks!);
  }

  openDialog(task?: Task, idx?: number): void {
    const newTask: Task = { label: 'purple' };
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '500px',
      data: task
        ? { task: { ...task }, isNew: false, boardID: this.board.id, idx }
        : { task: newTask, isNew: true },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;
      if (result.isNew) {
        this.boardService.updateTasks(this.board.id!, [
          ...this.board.tasks!,
          result.task,
        ]);
      } else {
        const update = this.board.tasks;
        update?.splice(result.idx, 1, result.task);
        this.boardService.updateTasks(this.board.id!, this.board.tasks!);
      }
    });
  }

  handleDelete(): void {
    this.boardService.deleteBoard(this.board.id!);
  }
}
