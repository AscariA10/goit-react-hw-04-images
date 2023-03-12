import { useState } from 'react';

export const Searchbar = ({ onSubmit }) => {
   const [search, setSearch] = useState('');

   function onSubmitHandler(event) {
      event.preventDefault();
      onSubmit(search);
      setSearch('');
   }

   function onInputUpdate(event) {
      setSearch(event.target.value);
   }

   return (
      <form onSubmit={onSubmitHandler}>
         <input type="text" onChange={onInputUpdate} value={search} />
         <button type="submit">Submit</button>
      </form>
   );
};

// export class Searchbar extends Component {
//    state = {
//       searchValue: '',
//    };

//    onInputUpdate = event => {
//       this.setState({ searchValue: event.target.value });
//    };

//    onSubmitHandler = event => {
//       event.preventDefault();
//       this.props.onSubmit(this.state.searchValue);
//       this.setState({ searchValue: '' });
//    };

//    render() {
// return (
//    <form onSubmit={this.onSubmitHandler}>
//       <input type="text" onChange={this.onInputUpdate} value={this.state.searchValue} />
//       <button type="submit">Submit</button>
//    </form>
// );
//    }
// }
