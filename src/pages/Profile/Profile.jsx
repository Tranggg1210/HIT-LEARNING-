import "./Profile.scss";
import BackgroundProfile from "../../assets/images/F8.png";
import ChuNhiem1 from '../../assets/images/chu_nhiem.jpg';
import { useNavigate, useParams } from 'react-router-dom';
import { IconChevronLeft, IconBrandFacebook, IconMail, IconId,IconUserCircle  } from '@tabler/icons-react';
import { Typography } from '@mui/material';

const Profile = () => {
    const navigate = useNavigate();
    const id = useParams();
    console.log('id', id);

    return (
        <div className="profile-container">
            <div className="back-button" onClick={() => navigate(-1)}>
                <IconChevronLeft stroke={2} className="icon-chevron-left" />
                <span>Quay Lại</span>
            </div>
            <div className="header-profile">
                <div className="background-profile">
                    <img src={BackgroundProfile} alt="Background" />
                </div>
                <button className="edit-button" onClick={() => navigate('/editprofile')}>
                <IconUserCircle stroke={2} />
                    Chỉnh sửa thông tin
                </button>
                <div className="profile">
                    <div className="profile-pic">
                        <div className="profile-img">
                            <img src={ChuNhiem1} alt="Profile" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="profile-name">
                <h1>Nguyễn Bá Khương</h1>
            </div>
            <div className="content-profile">
                <div className="intro">
                    <h3>Giới thiệu</h3>
                    <div className="infor-profile">
                        <p>
                            <IconBrandFacebook stroke={2} className="icon" />
                            <span>jaispdjis</span>
                        </p>
                        <p>
                            <IconMail stroke={2} />
                            <span>sdafg</span>
                        </p>
                        <p>
                            <IconId stroke={2} />
                            <span>sdfgd</span>
                        </p>
                    </div>
                    <h3 className="mysefl">Mô tả bản thân </h3>
                    <p></p>
                </div>
            </div>
        </div>
    );
};

export default Profile;
