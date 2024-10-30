import {Directive, HostListener, Input} from '@angular/core';
import {Haptics, ImpactStyle} from '@capacitor/haptics';

@Directive({
  selector: '[haptic]',
  standalone: true
})
export class HapticDirective {
  @Input()
  public hapticStyle: ImpactStyle = ImpactStyle.Light;

  @HostListener('click', ['$event'])
  public async onClick() {
    await Haptics.impact({style: this.hapticStyle});
  }
}