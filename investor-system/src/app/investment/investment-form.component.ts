import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import {
  Validators,
  FormGroup,
  NonNullableFormBuilder,
  FormControl,
} from "@angular/forms";
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-investment-form',
  templateUrl: './investment-form.component.html',
  styleUrls: ['../adam/investorForm.scss', './investment-form.component.scss'],
})

export class InvestmentFormComponent {

  amount = '';
  textAlign = '';
  files: any[] = [];

  protected investmentForm: FormGroup;

  constructor(private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder) {

   }

  ngOnInit(): void {
    this.amount = String.fromCharCode(3647);
    this.textAlign = 'right';
    this.investmentForm = this.formBuilder.group(
      {
        investmentNo: new FormControl(""),
        amount: new FormControl(),
        startDate: new FormControl(""),
        endDate: new FormControl(""),
        monthlyProfit: new FormControl(),
        annualProfit: new FormControl(),
        endProfit: new FormControl(),
        investmentType: new FormControl(),
        description: new FormControl(),
        receiptImages: new FormControl()
      });
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

  currency_style(event: any) {
    let thb_character = String.fromCharCode(3647);
    let value = event.target.value;
    value = value.replace(/,/g, ''); // Remove existing commas
    value = value.replace(thb_character, ''); //Remove existing thb mark
    value = value.replace(' ', ''); //Remove existing spaces
    value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ','); // Add commas every three numbers
    value = value.replace(value, thb_character + ' ' + value);
    this.amount = value;
  }

  protected onSubmit(): void {

  }

  /**
* on file drop handler
*/
  onFileDropped($event) {
    this.prepareFilesList($event);
  }
  /**
  * handle file from browsing
  */
  fileBrowseHandler(target) {
    let files = target?.files;
    this.prepareFilesList(files);
  }

  /**
  * Convert Files list to normal array list
  * @param files (Files List)
  */
  prepareFilesList(files: Array<any>) {
    for (const item of files) {
      this.files.push(item);
    }
    //this.addInvestorForm.get('passportImage').setValue(this.files);

  }

  /**
   * format bytes
   * @param bytes (File size in bytes)
   * @param decimals (Decimals point)
   */
  formatBytes(bytes, decimals = 0) {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  /**
 * Delete file from files list
 * @param index (File index)
 */
  deleteFile(index: number) {
    this.files.splice(index, 1);
  }

}
