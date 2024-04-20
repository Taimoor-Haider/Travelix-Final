function getImageURL(name) {
  return new URL(`../assets/images/${name}`, import.meta.url).href;
}
function getProfileURL(name) {
  return new URL(`../assets/profileImages/${name}`, import.meta.url).href;
}

function getLogoURL(name) {
  return new URL(`../assets/${name}`, import.meta.url).href;
}
export { getImageURL, getLogoURL, getProfileURL };
