// import { put } from 'redux-saga/effects';

export const requestPending = type => `${type}/pending`

export const requestSuccess = type => `${type}/success`

export const requestFail = type => `${type}/fail`
