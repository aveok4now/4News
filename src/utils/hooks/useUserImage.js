import userImage from '../../../assets/images/user.jpg';
import guestImage from '../../../assets/images/guest.jpg';
import adminImage from '../../../assets/images/admin.jpg';
import useUserCredentials from './useUserCredentials';

const useUserImage = () => {
  const identify = useUserCredentials();

  const checkUserImage = userIdentify => {
    if (userIdentify === 'Гость') {
      return guestImage;
    } else if (userIdentify.includes('admin')) {
      return adminImage;
    } else {
      return userImage;
    }
  };

  return checkUserImage(identify);
};

export default useUserImage;
