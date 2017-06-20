import type { Operator } from 'rxjs/Operator';
import type { rxjs$Scheduler } from 'rxjs';
import type { Middleware } from 'redux';
import {Observable} from 'rxjs'

declare module 'redux-observable' {
    declare class ActionsObservable<T> extends Observable<T> {
        /**
         * Just like RxJS itself, we can't actually make this method always type-safe
         * because we would need non-final position spread params e.g.
         *   `static of<T>(...items: T, scheduler?: Scheduler): ActionsObservable<T>`
         * which isn't possible in either JavaScript or TypeScript. So instead, we
         * provide safe typing for up to 6 items, following by a scheduler.
         */
        static of<T>(item1: T, scheduler?: rxjs$Scheduler): ActionsObservable<T>;
        static of<T>(item1: T, item2: T, scheduler?: rxjs$Scheduler): ActionsObservable<T>;
        static of<T>(item1: T, item2: T, item3: T, scheduler?: rxjs$Scheduler): ActionsObservable<T>;
        static of<T>(item1: T, item2: T, item3: T, item4: T, scheduler?: rxjs$Scheduler): ActionsObservable<T>;
        static of<T>(item1: T, item2: T, item3: T, item4: T, item5: T, scheduler?: rxjs$Scheduler): ActionsObservable<T>;
        static of<T>(item1: T, item2: T, item3: T, item4: T, item5: T, item6: T, scheduler?: rxjs$Scheduler): ActionsObservable<T>;
        static of<T>(...array: Array<T | rxjs$Scheduler>): ActionsObservable<T>;

        static from<T>(ish: ObservableInput<T>, scheduler?: rxjs$Scheduler): ActionsObservable<T>;
        static from<T, R>(ish: ArrayLike<T>, scheduler?: rxjs$Scheduler): ActionsObservable<R>;

        lift<R>(operator: Operator<T, R>): ActionsObservable<R>;
        ofType(...key: string[]): ActionsObservable<T>;
    }

    declare type Epic<T, S> = {
        (action$: ActionsObservable<T>, store: MiddlewareAPI<S>): rxjs$Observable<T>;
    }

    declare type EpicMiddleware<T, S> = {
        ...Middleware,
        replaceEpic(nextEpic: Epic<T, S>): void;
    }

    declare type Adapter<T> = {
        input: (input$: rxjs$Observable<T>) => rxjs$Observable<T>;
        output: (output$: rxjs$Observable<T>) => rxjs$Observable<T>;
    }

    declare type Options = {
        adapter?: Adapter;
    }

    declare function createEpicMiddleware<T, S>(rootEpic: Epic<T, S>, options?: Options): EpicMiddleware<T, S>;

    declare function combineEpics<T, S>(...epics: Epic<T, S>[]): Epic<T, S>;
}

