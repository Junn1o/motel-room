import axios from 'axios';
import { API_BASE_URL } from './URL';
export const getPost = (hireState,statusState,minPrice,maxPrice,minArea,maxArea,category,isVip,sortBy,isAscending,pageNumber,pageSize) => {
  const queryParams = [];
  if (hireState !== null && hireState !== undefined) {
    queryParams.push(`hireState=${hireState}`);
  }

  if (statusState !== null && statusState !== undefined) {
    queryParams.push(`statusState=${statusState}`);
  }

  if (minPrice !== null && minPrice !== undefined) {
    queryParams.push(`minPrice=${minPrice}`);
  }

  if (maxPrice !== null && maxPrice !== undefined) {
    queryParams.push(`maxPrice=${maxPrice}`);
  }

  if (minArea !== null && minArea !== undefined) {
    queryParams.push(`minArea=${minArea}`);
  }

  if (maxArea !== null && maxArea !== undefined) {
    queryParams.push(`maxArea=${maxArea}`);
  }

  if (category !== null && category !== undefined) {
    queryParams.push(`category=${category}`);
  }

  if (isVip !== null && isVip !== undefined) {
    queryParams.push(`isVip=${isVip}`);
  }

  if (sortBy !== null && sortBy !== undefined) {
    queryParams.push(`sortBy=${sortBy}`);
  }

  if (isAscending !== null && isAscending !== undefined) {
    queryParams.push(`isAscending=${isAscending}`);
  }

  if (pageNumber !== null && pageNumber !== undefined) {
    queryParams.push(`pageNumber=${pageNumber}`);
  }

  if (pageSize !== null && pageSize !== undefined) {
    queryParams.push(`pageSize=${pageSize}`);
  }
  const queryString = queryParams.join('&');
  return axios.get(
    `${API_BASE_URL}/Post/Get-all-post?${queryString}`
  );
};

export const getPostbyId = (id) => {
  return axios.get(
    `${API_BASE_URL}/Post/Get-post-by-id?id=${id}`
  );
}
const apiUrl = `${API_BASE_URL}/User/get-user-with-id`;
const getUserData = async () => {
  const userId = localStorage.getItem('userid');
  if (userId) {
    try {
      const fullUrl = `${apiUrl}?id=${userId}`;
      const response = await axios.get(fullUrl);
      return response.data;
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw error;
    }
  } else {
    console.error('userId is not available.');
    return null;
  }
};
export const updateUser = async (userId, formDataObject, config) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/User/update-customer?id=${userId}`,
      formDataObject,
      config
    );

    // Assuming your API returns the updated user data
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { getUserData };
export const detailPost = (postId) => {
  return axios.get(`${API_BASE_URL}/Post/Get-post-by-id?id=${postId}`)
}
export const PostRoom = (id, {title, description, address, price, area, status, isHire, categoryids})  =>{
  return axios.put(`${API_BASE_URL}/Post/add-post`, {
    title: title,
    description : description,
    address : address,
    price : price,
    area : area,
    status : status,
    isHire : isHire,
    categoryids : categoryids,
  });
}
export const getCategoryData = () => {
  return axios.get(`${API_BASE_URL}/Category/get-all-category`);
}
export const detailUser = (userId) => {
  return axios.get(`${API_BASE_URL}/User/get-user-with-id?id=${userId}`)
} 
export const deletePost = (id) => {
  return axios.delete(`${API_BASE_URL}/Post/delete-post-with-id/?id=${id}`);
};
