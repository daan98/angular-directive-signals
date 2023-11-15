import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[customLabel]'
})
export class CustomLabelDirective implements OnInit {
  

  private htmlElement ?: ElementRef<HTMLElement>;
  private _color       : string                 = "red";
  private _errors ?: ValidationErrors | null;

  @Input() set color (value : string) {
    this._color = value;
    this.setColor();
  };

  @Input() set errors(value : ValidationErrors | null | undefined) {
    this._errors = value;
    console.log('CustomLabel Errors: ', this._errors);
    console.log('CustomLabel Errors: ', value);
    this.setErrorMessage();
  }

  constructor(
    private el : ElementRef<HTMLElement>
  ) {
    this.htmlElement = el;
  }

  public ngOnInit(): void {
    
  }

  public setColor() : void {
    if(!this.htmlElement) {
      return;
    }

    this.htmlElement.nativeElement.style.color = this._color;
  }

  public setErrorMessage() : void {
    if(!this.htmlElement) {
      return;
    }

    if(!this._errors) {
      this.htmlElement.nativeElement.innerText = "There are no errors.";
      return;
    }

    const errors = Object.keys(this._errors!);

    switch (errors[0]) {
      case 'required':
        this.htmlElement.nativeElement.innerText = "This field is required";
        break;

      case 'minlength':
        const requiredLength = this._errors['minlength']['requiredLength'];
        this.htmlElement.nativeElement.innerText = `This field need a minimun of ${requiredLength} characters`;
        break;

      case 'email':
        this.htmlElement.nativeElement.innerText = "This field must be a valid email.";
        break;
    
      default:
        this.htmlElement.nativeElement.innerText = "There's an error, please try again later.";
        console.log('Form group error: ', errors[0]);
        break;
    }
  }
}
