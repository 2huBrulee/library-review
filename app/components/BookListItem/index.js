/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
/**
 *
 * BookListItem
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

// import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
// import messages from './messages';

const Container = styled.div`
  max-height: 170px;
  margin: 10px 20px;
  padding: 10px 25px;
  border-width: 0px;
  border-top-color: lightgray;
  border-top-style: solid;
  display: flex;
  flex-direction: row;
  ${({ first }) => !first && `border-top-width: thin;`}
`;

const BookImg = styled.img`
  height: 100%;
`;

const Details = styled.div`
  flex: 1;
  display: flex;
  padding: 0 0 0 15px;
  flex-direction: column;
`;

const DetailLine = styled.div`
  margin: 5px;
`;

function BookListItem(props) {
  const {
    title,
    text_id,
    // gr_id,
    cover_url,
    lexile_score,
    series,
    series_index,
    text_variety,
    author_full_name,
    // hidden,
  } = props;
  return (
    <Container first={props.first}>
      <BookImg
        src={
          cover_url ||
          'http://s.gr-assets.com/assets/nophoto/book/111x148-bcc042a9c91a29c1d680899eff700a03.png'
        }
      />
      <Details>
        <DetailLine>{`TEXT ID: ${text_id}`}</DetailLine>
        <DetailLine>{`Author: ${author_full_name} Lexile: ${lexile_score}`}</DetailLine>
        <DetailLine>{`Title: ${title}`}</DetailLine>
        {series ? (
          <DetailLine>{`Series Name: ${series} Series Index: ${series_index}`}</DetailLine>
        ) : null}
        <DetailLine>{`Variety: ${text_variety}`}</DetailLine>
      </Details>
    </Container>
  );
}

BookListItem.propTypes = {};

export default withRouter(BookListItem);
