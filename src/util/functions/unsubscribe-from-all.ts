import type {Subscription} from 'rxjs';

type Subs = Subscription | Subscription[] | undefined | null;

/**
 * Function to unsubscribe from a list of `subscriptions` or a single `subscription`
 * @param {Subscription | Subscription[] | undefined | null} subs array of `subscriptions` to unsubscribe from
 */
export function unsubscribeFromAll(subs: Subs): void {
  if (subs) {
    if (Array.isArray(subs)) {
      subs.forEach(s => {
        s.unsubscribe()
      })
    } else {
      subs.unsubscribe();
    }
  }
}
