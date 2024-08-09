import "./Profile.scss";
import React, { useState } from 'react';
import BackgroundProfile from "../../assets/images/F8.png";
import ChuNhiem1 from '../../assets/images/chu_nhiem.jpg';
import { useNavigate, useParams } from 'react-router-dom';
import { IconChevronLeft, IconSchool, IconBrandFacebook, IconMail, IconId, IconUserCircle } from '@tabler/icons-react';
import { Typography } from '@mui/material';
import useAuth from "../../hooks/useAuth";
import EditProfile from "../EditProfile/EditProfile";

const Profile = () => {
    const navigate = useNavigate();
    const currentUser = useAuth();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const handleOpenEditModal = () => {
        setIsEditModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
    };
    console.log(handleCloseEditModal)
    


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
                <button className="edit-button" onClick={handleOpenEditModal}>
                    <IconUserCircle stroke={2} />
                    Chỉnh sửa thông tin
                </button>
                <div className="profile">
                    <div className="profile-pic">
                        <div className="profile-img">
                            <img src={currentUser?.user?.linkAvatar || ChuNhiem1} alt="Profile" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="profile-name">
                <h1>{currentUser?.user?.name || "Chưa có dữ liệu"}</h1>
            </div>
            <div className="content-profile">
                <div className="intro">
                    <h3>Giới thiệu</h3>
                    <div className="infor-profile">
                        <p>
                            <IconBrandFacebook stroke={2} className="icon" />
                            <a href={currentUser?.user?.linkFb}>{currentUser?.user?.linkFb || "Chưa có dữ liệu"}</a>
                        </p>
                        <p>
                            <IconMail stroke={2} />
                            <span>{currentUser?.user?.email || "Chưa có dữ liệu"}</span>
                        </p>
                        <p>
                            <IconSchool stroke={2} />
                            <span>{currentUser?.user?.className || "Chưa có dữ liệu"}</span>
                        </p>
                    </div>
                    <h3 className="mysefl">Mô tả bản thân </h3>
                    <p>{currentUser?.user?.description}</p>
                </div>
            </div>
            {isEditModalOpen && (
                <EditProfile
                    opens={isEditModalOpen}
                    userData={currentUser?.user}
                    onClose={handleCloseEditModal}
                />
            )}
        </div>
    );
};

export default Profile;
