import type {ControlValueAccessor} from "@angular/forms";

/**
 * Abstract class that serves as a base for form components implementing ControlValueAccessor.
 *
 * This class provides a reusable implementation of the ControlValueAccessor interface,
 * allowing custom form controls to integrate seamlessly with Angular's form infrastructure.
 * It handles the boilerplate of tracking form control values and notifying Angular of changes.
 * @template T The type of the form control's value.
 */
export abstract class AbstractValueAccessor<T> implements ControlValueAccessor {
  public busy = false;

  protected _value!: T;

  public get value(): T {
    return this._value;
  }

  public set value(val: T) {
    this._value = val;
    this.onChange(val);
    this.onTouched();
  }

  public writeValue(value: T): void {
    if (value !== undefined && value !== null) {
      this._value = value;
    }
  }

  public registerOnChange(fn: (value: T) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  protected onChange: (value: T) => void = () => {};

  protected onTouched: () => void = () => {};
}