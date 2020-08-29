import { takeLatest, call, put } from 'redux-saga/effects';
import { magento } from '../../magento';
import { MAGENTO } from '../../constants';

// worker saga: Add description
function* signUp({ payload }) {
  try {
    yield put({ type: MAGENTO.SIGN_UP_LOADING });
    const response = yield call(
      { content: magento, fn: magento.guest.signup },
      payload,
    );
    yield put({ type: MAGENTO.SIGN_UP_SUCCESS, response });
  } catch (error) {
    console.log(error);
    yield put({
      type: MAGENTO.SIGN_UP_FAILURE,
      payload: { errorMessage: error.message },
    });
  }
}
function* resetPassword({ payload: { email } }) {
  try {
    yield put({ type: MAGENTO.RESET_PASSWORD_LOADING });
    const response = yield call(
      { content: magento, fn: magento.guest.resetPassword },
      email,
      magento.configuration.password_reset_template,
    );
    yield put({ type: MAGENTO.RESET_PASSWORD_SUCCESS, payload: { response } });
  } catch (error) {
    console.log(error);
    yield put({
      type: MAGENTO.RESET_PASSWORD_FAILURE,
      payload: { errorMessage: error.message },
    });
  }
}
// watcher saga: watches for actions dispatched to the store, starts worker saga
export default function* watcherSaga() {

  yield takeLatest(MAGENTO.SIGN_UP_REQUEST, signUp);
  yield takeLatest(MAGENTO.RESET_PASSWORD_REQUEST, resetPassword);
}