import userImage from '../../../assets/images/user.jpg';
import adminImage from '../../../assets/images/admin.jpg';

export const getUserImage = (authorName, identify) => {
  console.log(authorName, identify);
  if (authorName.includes('admin')) {
    return adminImage;
  }
  return userImage;
};
