import { useState, useEffect } from 'react';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { LoadMore } from './LoadmoreButton/LoadMoreButton';
import { Loader } from './Spinner/Spinner';
// import { GalleryWindow } from './GalleryWindow/GalleryWindow';

import { fetchPictures } from 'utils/fetchFunction';

export const App = () => {
   const [queryParameter, setQueryParameter] = useState('');
   const [currentPage, setCurrentPage] = useState(1);
   const [pictures, setPictures] = useState([]);
   const [isLoading, setIsLoading] = useState(false);

   useEffect(() => {
      if (!queryParameter) {
         return;
      }
      setIsLoading(true);
      fetchPictures(queryParameter)
         .then(response => response.json())
         .then(data => {
            setCurrentPage(1);
            setPictures([...data.hits]);
            setIsLoading(false);
         });
   }, [queryParameter]);

   useEffect(() => {
      if (currentPage === 1) {
         return;
      }
      setIsLoading(true);
      fetchPictures(queryParameter, currentPage)
         .then(response => response.json())
         .then(data => {
            setPictures([...pictures, ...data.hits]);
            setIsLoading(false);
         });
   }, [currentPage]);

   function incrementPage() {
      setCurrentPage(prevState => prevState + 1);
   }

   function onSubmit(searchQuery) {
      setQueryParameter(searchQuery);
   }

   return (
      <>
         <Searchbar onSubmit={onSubmit} />
         {isLoading && <Loader />}
         <ImageGallery galleryData={pictures} />
         {pictures.length >= 12 && <LoadMore incrementPage={incrementPage} />}
      </>
   );
};

// export class App extends Component {
//    state = {
//       queryParameter: '',
//       currentPage: 1,
//       pictures: [],
//       isLoading: false,
//    };

//    componentDidUpdate(_, prevState) {
//       const { queryParameter, currentPage } = this.state;
//       if (prevState.queryParameter !== queryParameter) {
//          this.setState({ isLoading: true });
// fetchPictures(queryParameter)
//    .then(response => response.json())
//    .then(data => {
//       console.log('currentPageQuery', currentPage);
//       this.setState({ currentPage: 1, pictures: [...data.hits], isLoading: false });
//    });
//       }
//       if (prevState.currentPage !== currentPage && currentPage !== 1) {
//          this.setState({ isLoading: true });
// fetchPictures(queryParameter, currentPage)
//    .then(response => response.json())
//    .then(data => {
//       this.setState(prevState => {
//          console.log('currentPage', currentPage);
//          return { pictures: [...prevState.pictures, ...data.hits], isLoading: false };
//       });
//    });
//       }

//       return;
//    }

// incrementPage = () => {
//    this.setState(prevState => {
//       return { currentPage: prevState.currentPage + 1 };
//    });
// };

// onSubmit = searchQuery => {
//    this.setState({ queryParameter: searchQuery });
// };

//    render() {
//       const { isLoading, pictures } = this.state;
// return (
//    <>
//       <Searchbar onSubmit={this.onSubmit} />
//       {isLoading && <Loader />}
//       <ImageGallery galleryData={pictures} />
//       {pictures.length >= 12 && <LoadMore incrementPage={this.incrementPage} />}
//    </>
// );
//    }
// }
