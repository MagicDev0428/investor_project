import { Component } from '@angular/core';

@Component({
  selector: 'app-adam-form',
  templateUrl: './adam-form.component.html',
  styleUrls: ['./investorForm.scss', './adam-form.component.scss'],
})
export class AdamFormComponent {

  amount = '';
  textAlign = '';

  constructor() { }

  ngOnInit(): void {
    this.amount = String.fromCharCode(3647);
    this.textAlign = 'right';
  }

  onlyNumbers(event: KeyboardEvent) {
    if (
      event.key !== "Backspace" &&
      event.key !== "Delete" &&
      event.key !== "ArrowLeft" &&
      event.key !== "ArrowRight" &&
      event.key !== "Tab" &&
      (event.key < "0" || event.key > "9")
    ) {
      event.preventDefault();
    }
  }

  validation(event: any) {
    let asciiCode = 3647; // ASCII code for Thai Baht symbol
    let thb_character = String.fromCharCode(asciiCode);
    let value = event.target.value;
    value = value.replace(/,/g, ''); // Remove existing commas
    value = value.replace(thb_character, ''); //Remove existing thb mark
    value = value.replace(' ', ''); //Remove existing spaces
    value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ','); // Add commas every three numbers
    value = value.replace(value, thb_character + ' ' + value);
    this.amount = value;
  }

}
