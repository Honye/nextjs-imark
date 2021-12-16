import { useRouter } from 'next/router';

export const useToken = () => {
  const router = useRouter();
  const query: { token?: string } = router.query;
  const { token } = query;
  if (token) {
    const { asPath } = router;
    const _unuse = 'https://placeholder.com';
    const url = new URL(asPath, _unuse);
    url.searchParams.delete('token');
    const path = url.toString().replace(new RegExp(`^${_unuse.replace(/\//g, '\/')}`), '');
    router.replace(path);
  }
};
