import { VueConstructor } from 'vue';

export interface NavigateProps {
  to?: string | object;
  url?: string;
  replace?: boolean;
}

export default function navigate(
  instance: InstanceType<VueConstructor> & NavigateProps,
) {
  const { to, url, replace } = instance;
  const router = (instance as any)?.$router;
  if (to && router) {
    replace ? router.replace(to) : router.push(to);
  } else if (url) {
    replace ? window.location.replace(url) : (window.location.href = url);
  }
}
