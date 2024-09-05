export abstract class AbstractFormComponent<T> {
  public value!: T;

  public busy = false;

  public abstract onSubmit(): Promise<void> | void;
}
