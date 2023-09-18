import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Observable, take } from 'rxjs';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.scss']
})
export class SnackBarComponent {
  public text!: Observable<string>
  public currentText!: string
  constructor(
    private snackbarService: SnackBarService,
    @Inject(MAT_SNACK_BAR_DATA) public data:any
    ){}
}
