import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Router, RouterState } from '@angular/router';
import { Subscription } from 'rxjs';
import { DisplayMode } from 'src/app/interfaces/screen';
import { ModalService } from 'src/app/services/modal.service';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy{
  public routerSubscribe!: Subscription
  public currentPath!: string
  constructor(
    private router: Router,
    private taskService: TaskService,
    private modalService: ModalService
    ){}
  ngOnDestroy(): void {
    this.routerSubscribe.unsubscribe()
  }

  public verifyCurrentRoute(){
    return this.currentPath === '/'
  }

  public switchToCreateTaskSection(screenMode: DisplayMode){
    this.taskService.switchTaskSection(screenMode)
  }

  public closeAllModals(){
    this.modalService.createTaskModal.next('close')
    this.modalService.showCalenderModal.next('close')
    this.modalService.showProfileModal.next('close')
    this.modalService.showSpecificTaskModal.next('close')
    this.modalService.sectionViewTitle.next('Tarefas')
  }
  public handleOpenModalCreateTask(){
    this.modalService.createTaskModal.next('open')
    this.modalService.showCalenderModal.next('close')
    this.modalService.showProfileModal.next('close')
    this.modalService.showSpecificTaskModal.next('close')
    this.modalService.sectionViewTitle.next('Criar Tarefa')
  }
  public handleOpenModalCalendar(){
    this.modalService.createTaskModal.next('close')
    this.modalService.showCalenderModal.next('open')
    this.modalService.showProfileModal.next('close')
    this.modalService.showSpecificTaskModal.next('close')
    this.modalService.sectionViewTitle.next('Tarefas')
  }

  ngOnInit(): void {
    this.routerSubscribe = this.router.events.subscribe((eventRoute:any)=>{
      if( eventRoute instanceof NavigationEnd || eventRoute === undefined){
        this.currentPath = eventRoute.url
      }else{
        this.currentPath = eventRoute?.routerEvent?.url
      }
    })
  }
}

