import React, { createContext, useContext, useState, useEffect } from 'react'

import { useCurrentUser } from './CurrentUserContext';
import { axiosReq, axiosRes } from '../api/axiosDefaults';
import { followHelper, unfollowHelper } from '../utils/utils';

export const ProfileDataContext = createContext();
export const SetProfileDataContext = createContext();

export const useProfileData = () => useContext(ProfileDataContext);
export const useSetProfileData = () => useContext(SetProfileDataContext);

const ProfileDataProvider = ({ children }) => {

    const [profileData, setProfileData] = useState({
        pageProfile: { results: [] },
        popularProfiles: { results: [] },
    })

    const currentUser = useCurrentUser();

    const handleFollow = async (clickedProfile) => {
        try {
            const { data } = await axiosRes.post("/followers/", {
                followed: clickedProfile.id,
            });

            setProfileData((prevState) => ({
                ...prevState,
                pageProfile: {
                    results: prevState.pageProfile.results.map((profile) =>
                        followHelper(profile, clickedProfile, data.id)
                    ),
                },
                popularProfiles: {
                    ...prevState.popularProfiles,
                    results: prevState.popularProfiles.results.map((profile) =>
                        followHelper(profile, clickedProfile, data.id)
                    ),
                },
            }));
        } catch (err) {
            console.log(err);
        }
    }

    const handleUnfollow = async (clickedProfile) => {
        try {
            console.log(`/followers/${clickedProfile.following_id}/`)
            const url = '/followers/' + clickedProfile.following_id + '/';
            console.log(url);
            await axiosRes.delete(url);

            setProfileData((prevState) => ({
                ...prevState,
                pageProfile: {
                    results: prevState.pageProfile.results.map((profile) =>
                        unfollowHelper(profile, clickedProfile)
                    ),
                },
                popularProfiles: {
                    ...prevState.popularProfiles,
                    results: prevState.popularProfiles.results.map((profile) =>
                        unfollowHelper(profile, clickedProfile)
                    ),
                }
            }))

        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        const handleMount = async () => {
            try {
                const { data } = await axiosReq.get(
                    '/profiles/?ordering=-followers_count'
                )
                setProfileData(prevState => ({
                    ...prevState,
                    popularProfiles: data,
                }))
            } catch (err) {
                console.log(err);
            }
        }
        handleMount();
    }, [currentUser])

    return (
        <ProfileDataContext.Provider value={profileData}>
            <SetProfileDataContext.Provider value={{ setProfileData, handleFollow, handleUnfollow }}>
                {children}
            </SetProfileDataContext.Provider>
        </ProfileDataContext.Provider>
    )
}

export default ProfileDataProvider