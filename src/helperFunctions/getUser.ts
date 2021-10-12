import { USER_SELF } from '@/components/constants/url';

const userData = async () => {
  const response = await fetch(USER_SELF, {
    headers: { 'Content-type': 'application/json' },
    credentials: 'include',
  });
  const data = await response.json();
  return data;
};

export default userData;
