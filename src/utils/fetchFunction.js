const API_KEY = '32683940-309b63abead1b8e1ecbca20b5';
const BASIC_URL = 'https://pixabay.com/api/';
const IMAGE_TYPE = 'photo';
const ORIENTATION = 'horizontal';
const PER_PAGE = 12;

export async function fetchPictures(queryParametr, page) {
   const queryData = await fetch(
      `${BASIC_URL}?key=${API_KEY}&q=${queryParametr}&page=${page}&image_type=${IMAGE_TYPE}&orientation=&${ORIENTATION}&per_page=${PER_PAGE}`
   );
   return queryData;
}
