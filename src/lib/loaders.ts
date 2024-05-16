import axios from "axios"
import { LoaderFunctionArgs, defer } from "react-router-dom";
import { formatCurrency } from "./formatCurrency";

export const singlePageLoader = async ({ request, params }: LoaderFunctionArgs) => {
  let data = (await axios.get(`/api/post/${params.id}`)).data.value;
  const postDetail = data.postdetail;
  const user = data.user;

  data = {
    ...data,
    bedroom: data.bedroom !== 0 ? '--' : data.bedroom,
    bathroom: data.bathroom !== 0 ? '--' : data.bathroom,
    price: formatCurrency(data.price),
    user: user,
    postdetail: {
      ...data.postdetail,
      school: postDetail.school > 0 ? (postDetail.school > 999 ? `${postDetail.school / 1000} km` : `${postDetail.school} m`) : '--',
      bus: postDetail.bus > 0 ? (postDetail.bus > 999 ? `${postDetail.bus / 1000} km` : `${postDetail.bus} m`) : '--',
      restaurant: postDetail.restaurant > 0 ? (postDetail.restaurant > 999 ? `${postDetail.restaurant / 1000} km` : `${postDetail.restaurant} m`) : '--',
    }
  }

  return data;
}


export const listPageLoader = async ({ request, params }: LoaderFunctionArgs) => {
  const query = request.url.split('?')[1];
  // console.log(query);
  const res = axios.get(`/api/post?${query}`);

  return defer({
    posts: res,
  });
}


export const profilePageLoader = async ({ request, params }: LoaderFunctionArgs) => {

  const res = axios.get(`/api/user/profilePosts`);
  return defer({
    user: res,
  });
}
