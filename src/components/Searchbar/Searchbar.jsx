import { Component } from 'react';

export class Searchbar extends Component {
   state = {
      searchValue: '',
   };

   onInputUpdate = event => {
      this.setState({ searchValue: event.target.value });
   };

   onSubmitHandler = event => {
      event.preventDefault();
      this.props.onSubmit(this.state.searchValue);
      this.setState({ searchValue: '' });
   };

   render() {
      return (
         <form onSubmit={this.onSubmitHandler}>
            <input type="text" onChange={this.onInputUpdate} value={this.state.searchValue} />
            <button type="submit">Submit</button>
         </form>
      );
   }
}
