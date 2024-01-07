// my-dialog.component.ts
import { Component, ElementRef, AfterViewInit, ViewChild, ChangeDetectorRef, ApplicationRef, Input } from '@angular/core';

@Component({
  selector: 'app-drag-dialog',
  templateUrl: './draggable-dialog.component.html',
  styleUrls: ['./draggable-dialog.component.scss']
})
export class DraggableDialogComponent implements AfterViewInit {
  @ViewChild('dialog') dialog: ElementRef;
  @Input() params: any = {};

  left: number = 0;
  top: number = 0;
  offsetX: number = 0;
  offsetY: number = 0;
  isDragging: boolean = false;
  comp: string = '';
  isShown: boolean = true;

  constructor(
    private cdRef: ChangeDetectorRef,
    private appRef: ApplicationRef
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.initPosition();
    this.cdRef.detectChanges();
  }

  onMouseDown(event: MouseEvent) {
    this.isDragging = true;
    this.offsetX = event.clientX - this.left;
    this.offsetY = event.clientY - this.top;

    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
  }

  onMouseMove = (event: MouseEvent) => {
    if (this.isDragging) {
      this.left = event.clientX - this.offsetX;
      this.top = event.clientY - this.offsetY;
    }
  }

  onMouseUp = () => {
    this.isDragging = false;
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
  }

  closeDialog() {
    // Implement closing the dialog
  }

  initPosition() {
    // Center the dialog on the screen
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const dialogWidth = this.dialog.nativeElement.offsetWidth;
    const dialogHeight = this.dialog.nativeElement.offsetHeight;

    this.left = (screenWidth - dialogWidth) / 2;
    this.top = (screenHeight - dialogHeight) / 2;
  }

  onOpen(dialogName: string='') {
    this.comp = dialogName;
    this.isShown = false;
    this.cdRef.detectChanges();
    this.initPosition();
  }

  onClose(value: boolean) {
    this.isShown = value;
  }
}