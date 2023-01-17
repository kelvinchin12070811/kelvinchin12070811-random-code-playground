import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Subscription } from 'rxjs';

import { BoardService } from '../board.service';
import { Board } from '../board.modal';

@Component({
  selector: 'app-board-list',
  templateUrl: './board-list.component.html',
  styleUrls: ['./board-list.component.scss'],
})
export class BoardListComponent implements OnInit, OnDestroy {
  public boardService = inject(BoardService);

  public boards!: Board[];
  private boardSubscription!: Subscription;

  ngOnInit(): void {
    this.boardSubscription = this.boardService
      .getUserBoards()
      .subscribe((boards) => {
        boards.forEach((board) => (this.boards = board));
        console.log(this.boards);
      });
  }

  ngOnDestroy(): void {
    this.boardSubscription.unsubscribe();
  }

  drop(ev: CdkDragDrop<string[]>) {
    moveItemInArray(this.boards, ev.previousIndex, ev.currentIndex);
    this.boardService.sortBoards(this.boards);
  }
}
