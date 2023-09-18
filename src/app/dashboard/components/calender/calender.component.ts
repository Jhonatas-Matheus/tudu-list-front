import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { CalendarOptions, EventClickArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { TaskService } from 'src/app/services/task.service';
import { DialogComponent } from '../dialog/dialog.component';
@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.scss']
})
export class CalenderComponent implements OnInit {
  public calendarOptions!: CalendarOptions
  constructor(
    private taskService: TaskService,
    public dialog: MatDialog,
    ){}
  public handleDayClick(info: EventClickArg) {
    info.jsEvent.preventDefault();
    // this.openDialog()
  }
  public openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
    data: 'Não sei',
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }
  ngOnInit(): void {
    this.taskService.tasks.subscribe((value)=>{
      this.calendarOptions = {
        initialView: 'dayGridMonth',
        plugins: [dayGridPlugin],
        // dayMaxEventRows: 1,
        eventClick: (event)=> this.handleDayClick(event),
        events: value.map((task)=> {
          return {
            title: task.title,
            date: task.deadline
          }
          // date: new Date(task.deadline)
        })
      };
    })
   
  }


  
}
