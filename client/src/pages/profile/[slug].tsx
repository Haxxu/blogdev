import { useParams } from 'react-router-dom';

import { IParams, RootStore } from '~/utils/TypeScript';
import { useAppSelector } from '~/hooks';
import UserBlogs from '~/components/profile/UserBlogs';
import UserInfo from '~/components/profile/UserInfo';
import OtherInfo from '~/components/profile/OtherInfo';

const Profile = () => {
    const { slug }: IParams = useParams();
    const { auth } = useAppSelector((state: RootStore) => state);

    return (
        <div className="row my-3">
            <div className="col-md-5 mb-3">
                {auth.user?._id === slug ? <UserInfo /> : <OtherInfo />}
            </div>

            <div className="col-md-7">
                <UserBlogs />
            </div>
        </div>
    );
};

export default Profile;
