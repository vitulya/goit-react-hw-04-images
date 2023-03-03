import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api';

export const getImages = async (page = 1, value) => {
  // const { data } = await axios.get(
  //   `q=${value}&page=${page}&key=31754694-dbfcbb04bb6ff6c5ba99a7a93&image_type=photo&orientation=horizontal&per_page=12`
  // );
  const { data } = await axios.get(
    `/?q=${value}&image_type=photo&orientation=horizontal&safesearch=true&key=31754694-dbfcbb04bb6ff6c5ba99a7a93&page=${page}&per_page=12`
  );

  return data;
};

// `https://pixabay.com/api/?q=cat&page=${page}&key=31754694-dbfcbb04bb6ff6c5ba99a7a93&image_type=photo&orientation=horizontal&per_page=12`
