export default function getExtension(url = '') {
  return url.split('.').pop().split(/\#|\?/)[0];
}
