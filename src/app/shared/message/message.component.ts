import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-message',
  template: `
    <div *ngIf="temErro()" class="ui-messages ui-messages-error">
      {{ text }}
    </div>
  `,
  styles: [`
    .ui-messages-error {
      margin: 0;
      margin-top: 4px;
    }
  `]
})
export class MessageComponent {

  @Input()
  error: string= ""
  @Input()
  control: FormControl = new FormControl({});
  @Input()
  text: string = ""

  temErro(): boolean {
    return this.control.hasError(this.error) && this.control.dirty;
  }
}
