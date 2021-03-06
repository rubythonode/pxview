import React, { Component } from 'react';
import { connect } from 'react-redux';
import IllustList from '../../components/IllustList';
import * as newMangasActionCreators from '../../common/actions/newMangas';
import { getNewMangasItems } from '../../common/selectors';

class NewMangas extends Component {
  componentDidMount() {
    const { fetchNewMangas, clearNewMangas } = this.props;
    clearNewMangas();
    fetchNewMangas();
  }

  loadMoreItems = () => {
    const { fetchNewMangas, newMangas: { loading, nextUrl } } = this.props;
    if (!loading && nextUrl) {
      fetchNewMangas(nextUrl);
    }
  };

  handleOnRefresh = () => {
    const { fetchNewMangas, clearNewMangas } = this.props;
    clearNewMangas();
    fetchNewMangas(null, true);
  };

  render() {
    const { newMangas, items } = this.props;
    return (
      <IllustList
        data={{ ...newMangas, items }}
        loadMoreItems={this.loadMoreItems}
        onRefresh={this.handleOnRefresh}
      />
    );
  }
}

export default connect(state => {
  const { newMangas } = state;
  return {
    newMangas,
    items: getNewMangasItems(state),
  };
}, newMangasActionCreators)(NewMangas);
