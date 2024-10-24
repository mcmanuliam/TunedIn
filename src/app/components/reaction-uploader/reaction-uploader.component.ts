import type {KeyValue} from "@angular/common";
import {CommonModule} from "@angular/common";
import {Component, forwardRef, Input} from "@angular/core";
import {FormsModule, NG_VALUE_ACCESSOR} from "@angular/forms";
import {IonInput, IonButton, IonIcon} from '@ionic/angular/standalone';
import {HapticDirective} from "../../../util/haptic.directive";
import {AbstractValueAccessor} from "../abstract.value.accessor";

@Component({
  imports: [
    CommonModule,
    IonIcon,
    IonInput,
    IonButton,
    FormsModule,
    HapticDirective
  ],
  providers: [
    {
      multi: true,
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ReactionUploaderComponent),
    }
  ],
  selector: 'reaction-uploader',
  standalone: true,
  styleUrls: ['./reaction-uploader.component.scss'],
  templateUrl: './reaction-uploader.component.pug',
})
export class ReactionUploaderComponent extends AbstractValueAccessor<string> {
  @Input()
  public reaction!: KeyValue<string, string>

  public inputId!: string;

  public ngOnInit(): void {
    this.value = '';
    this.inputId = `input-${this.reaction.key}`
  }

  public override writeValue(value: string): void {
    if (value && value !== '') {
      this.value = value;
    }
  }

  public override registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  public override registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public onFileSelected(event: Event): void {
    this.busy = true;
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.value = e.target?.result as string
        this.busy = false;
      };
      const selectedFile = target.files[0];
      reader.readAsDataURL(selectedFile);
    }
  }

  public triggerFileInput(): void {
    const fileInput = document.getElementById(this.inputId) as HTMLInputElement;
    fileInput.click();
  }
}