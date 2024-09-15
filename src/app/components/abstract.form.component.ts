/*
 * Abstract class that serves as a base for form components handling generic data types.
 *
 * The class provides a structure for form components by defining a `value` property to hold form data,
 * a `busy` state to track the loading or processing status, and an `onSubmit` method that must be
 * implemented by any subclass.
 */
export abstract class AbstractFormComponent<T> {
  public value!: T;

  public busy = false;

  public abstract onSubmit(): Promise<void> | void;
}
