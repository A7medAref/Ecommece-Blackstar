function error(err, setLoading) {
  if (setLoading) setLoading(false);
  setTimeout(() => window.alert(err.response.data.message), 100);
}
export default error;
