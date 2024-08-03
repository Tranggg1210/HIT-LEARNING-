import "./Profile.scss"
import BackgroundProfile from "../../assets/images/F8.png"
import ChuNhiem1 from '../../assets/images/chu_nhiem.jpg'
import { useNavigate, useParams } from 'react-router-dom'
import { IconChevronLeft } from '@tabler/icons-react';
import { IconBrandFacebook } from '@tabler/icons-react';
import { IconMail } from '@tabler/icons-react';
import { IconId } from '@tabler/icons-react';
const Profile = () => {

    const id = useParams();
    console.log('id', id)


    return (
        <div className="profile-container">
            <div className="header-profile">
                <div className="background-profile"><img src={BackgroundProfile} alt="" /></div>
                <div className="profile">
                    <div className="profile-pic"><img src={ChuNhiem1} alt="" /></div>
                </div>

            </div>
            <div className="profile-name"> <h1>Nguyễn Bá Khương</h1></div>
            <div className="content-profile">
                <div className="intro">
                    <h3>Giới thiệu</h3>
                    <div className="infor-profile">
                        <p><IconBrandFacebook stroke={2} /></p>
                        <p><IconMail stroke={2} /></p>
                        <p><IconId stroke={2} /></p>
                    </div>
                    <h3 className="mysefl">Mô tả bản thân </h3>
                    <p></p>

                </div>
            </div>
        </div>
    )
}
export default Profile;
