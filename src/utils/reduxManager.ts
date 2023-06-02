
import { Dispatch } from '@reduxjs/toolkit';

class ReduxManager {
    dispatch: Dispatch<any> | unknown;
}

const reduxManager = new ReduxManager();
export default reduxManager;