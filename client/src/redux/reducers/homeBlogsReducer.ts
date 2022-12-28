import * as types from '~/redux/types/blogType';

const homeBlogsReducer = (
    state: types.IHomeBlogs[] = [],
    action: types.IGetHomeBlogsType
): types.IHomeBlogs[] => {
    switch (action.type) {
        case types.GET_HOME_BLOGS:
            return action.payload;
        default:
            return state;
    }
};

export default homeBlogsReducer;
