export function getUserCredentials() {
  const userCredentials = localStorage.getItem('userCredentials');
  return userCredentials ? JSON.parse(userCredentials) : null;
}

export function setUserCredentials(userCredentials) {
  localStorage.setItem('userCredentials', JSON.stringify(userCredentials));
}

export function removeUserCredentials() {
  localStorage.removeItem('userCredentials');
}