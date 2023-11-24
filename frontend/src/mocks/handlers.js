import axios from "axios";
import { rest } from "msw";

const baseURL = 'https://drf-walkthrough-jr-a4bd10db8e16.herokuapp.com/';

export const handlers = [
    rest.get(`${baseURL}dj-rest-auth/user/`, (req, res, ctx) => {
        return res(ctx.json(
            {
                "pk": 3,
                "username": "mickyo1",
                "email": "",
                "first_name": "",
                "last_name": "",
                "profile_id": 3,
                "profile_image": "https://res.cloudinary.com/dwhsm0rqr/image/upload/v1/drf_essentials_media/images/Paper_tqu84p"
              }
        ))
    }) 
    ,
    rest.post(`${baseURL}dj-rest-auth/logout/`, (req, res, ctx) => {
        return res(ctx.status(200));
    })
];