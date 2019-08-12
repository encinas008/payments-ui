import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable()
export class InputValidatorService {

  public onlyLetters(e) {
    const code = e.keyCode;
    if (!(code >= 65 && code <= 90 || code >= 97 && code <= 122 || code == 32 || code == 8 || code == 9)) { 
      e.preventDefault();
      return;
    }
  }

  public onlyNumbers(e) {
    if (!((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105) || e.keyCode == 8 || e.keyCode == 9)) {
      e.preventDefault();
      return;
    }
  }
}