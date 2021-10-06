import { USER_SELF } from '@/components/constants/url';

const userData: Promise<any> = fetch(USER_SELF, {
  headers: { 'Content-type': 'application/json' },
  credentials: 'include',
})
  .then((data) => data.json());

export default userData;
