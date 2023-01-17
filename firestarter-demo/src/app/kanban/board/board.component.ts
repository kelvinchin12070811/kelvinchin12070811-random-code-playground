import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, inject, Input } from '@angular/core';

import { Board } from '../board.modal';
import { BoardService } from '../board.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent {
  @Input()
  public board!: Board;

  public boardService = inject(BoardService);

  taskDrop(ev: CdkDragDrop<string[]>) {
    moveItemInArray(this.board.tasks!, ev.previousIndex, ev.currentIndex);
    this.boardService.updateTasks(this.board.id!, this.board.tasks!);
  }
}
