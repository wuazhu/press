import Vue from 'vue'
import moxios from 'moxios'
import sinon from 'sinon'
import mutations from '@/module/client/mutation'
import * as actions from '@/module/client/action'
import * as constants from '@/module/client/constant'
import app from '@/module/client/app.vue'

import { testAction, createVM, destoryVM, triggerEvent } from '../fixture/util'
describe("mutations", () => {
    it(constants.RESPONSE_CLIENTS, () => {
        let state = {}
        mutations[constants.RESPONSE_CLIENTS](state)
        expect(state.clientsFetched).to.equal(true)
    })
})
describe("actions", () => {
    beforeEach(() => {
        moxios.install()
    })
    afterEach(() => {
        moxios.uninstall()
    })
    it('should RESPONSE_CLIENTS when fetched', done => {
        let ret = {
            status: 'ok',
            data: []
        }
        let expectedMutations = [
            { type: constants.REQUEST_CLIENTS },
            { type: constants.RESPONSE_CLIENTS, payload: ret.data }
        ]
        moxios.stubRequest('/mock/clients', {
            status: 200,
            responseText: JSON.stringify(ret)
        })
        testAction(actions.fetchClients, [], {}, actions, expectedMutations, done)
    })
})
