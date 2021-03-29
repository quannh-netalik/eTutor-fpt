import {
    STATISTIC_REPORT_REQUEST,
    STATISTIC_REPORT_SUCCESS,
    STATISTIC_REPORT_FAIL
} from '../constants/report.constant';

export const statisticReport = (state = { statistic: {} }, action) => {
    switch (action.type) {
        case STATISTIC_REPORT_REQUEST:
            return {
                loading: true,
            };
        case STATISTIC_REPORT_SUCCESS:
            return {
                loading: false,
                statistic: action.payload,
            };
        case STATISTIC_REPORT_FAIL:
            return {
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
};

export default {
    statistic: statisticReport,
};