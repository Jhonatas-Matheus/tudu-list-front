import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { DisplayMode, SectionViewTitle } from '../interfaces/screen';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  public showSpecificTaskModal!: Subject<DisplayMode>
  public createTaskModal!: Subject<DisplayMode>
  public showCalenderModal!: Subject<DisplayMode>
  public showProfileModal!: Subject<DisplayMode>
  public sectionViewTitle!: Subject<SectionViewTitle>
  constructor() { 
    this.showSpecificTaskModal = new Subject<DisplayMode>()
    this.showSpecificTaskModal.next('close')
    this.createTaskModal = new Subject<DisplayMode>()
    this.createTaskModal.next('close')
    this.showCalenderModal = new Subject<DisplayMode>()
    this.showCalenderModal.next('close')
    this.showProfileModal = new Subject<DisplayMode>()
    this.showProfileModal.next('close')
    this.sectionViewTitle = new Subject<SectionViewTitle>()
    this.sectionViewTitle.next('Tarefas')
  }
}
