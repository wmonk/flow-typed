// @flow

import type {ActionsObservable} from 'redux-observable'

import {combineEpics, createEpicMiddleware} from 'redux-observable'

type TestAction = {
    type: 'FAKE_ACTION',
    payload: 'fake_id'
}

const testEpic = (action$: ActionsObservable<TestAction>) =>
    action$
        .ofType('FAKE_ACTION')
        .map(action => action.payload)
        .switchMap(id => ({
            type: 'MOVE_ACTION',
            payload: {to: 'somewhere', id}
        }))

const foo = () => 'bar'

const shouldFail = combineEpics(foo)

export default combineEpics(testEpic)
