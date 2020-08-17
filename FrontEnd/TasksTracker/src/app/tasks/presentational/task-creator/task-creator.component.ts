import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Task } from 'src/app/core/models/task';

@Component({
  selector: 'app-task-creator',
  templateUrl: './task-creator.component.html',
  styleUrls: ['./task-creator.component.scss']
})
export class TaskCreatorComponent implements OnInit {

  @Output() taskCeated = new EventEmitter<Task>();

  constructor() { }

  ngOnInit(): void {
  }

  submit(task: Task): void{
    this.taskCeated.next(task);
  }

}
