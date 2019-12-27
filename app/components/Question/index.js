/**
 *
 * Question
 *
 */

import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import TextInput from 'components/TextInput';
import { grid, layout, space } from 'styled-system';

const Wrapper = styled.div`
  width: 566px;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  row-gap: 8px;
  margin: 0 0 16px;
`;

const BoldText = styled.div`
  ${grid};
  font-weight: bold;
  width: max-content;
  margin: 0 4px 0 0;
`;

const Input = styled.div`
  ${grid};
  display: flex;
  flex-flow: row;
  align-items: center;
  margin: 0 0 0 4px;
`;

const StyledInput = styled(TextInput)`
  ${layout};
  margin: 0 0 0 auto;
`;

const Icon = styled.svg`
  flex: none;
  transition: fill 0.25s;
  width: 18px;
  height: 18px;
`;

const ButtonIcon = styled.button`
  ${grid};
  background-color: #fafafa;
  padding: 0;
  width: max-content;
  height: max-content;
  margin: 4px 0;
  color: #0082c8;
  border: 0;
  &:hover {
    cursor: pointer;
  }
`;

function Question(props) {
  const [question, setQuestion] = useState({
    key: null,
    user_id: null,
    question_text: null,
    annswer_options: null,
  });

  const [editable, setEditable] = useState(false);

  const initialQuestion = props.question;

  useEffect(() => {
    if (props.question) setQuestion(props.question);
  }, [props.question]);

  useEffect(() => setEditable(props.editable), [props.editable]);

  return (
    <Wrapper>
      <Input gridColumn={1}>
        <BoldText>Key: </BoldText>
        <StyledInput value={question.key} minHeight={10} width={160} />
      </Input>
      <Input gridColumn={6}>
        <BoldText>User ID: </BoldText>
        <StyledInput value={question.user_id} minHeight={10} width={160} />
      </Input>
      <ButtonIcon gridColumn={12}>
        <Icon viewBox="0 0 1792 1792">
          {editable ? (
            <path d="M512 1536h768v-384h-768v384zm896 0h128v-896q0-14-10-38.5t-20-34.5l-281-281q-10-10-34-20t-39-10v416q0 40-28 68t-68 28h-576q-40 0-68-28t-28-68v-416h-128v1280h128v-416q0-40 28-68t68-28h832q40 0 68 28t28 68v416zm-384-928v-320q0-13-9.5-22.5t-22.5-9.5h-192q-13 0-22.5 9.5t-9.5 22.5v320q0 13 9.5 22.5t22.5 9.5h192q13 0 22.5-9.5t9.5-22.5zm640 32v928q0 40-28 68t-68 28h-1344q-40 0-68-28t-28-68v-1344q0-40 28-68t68-28h928q40 0 88 20t76 48l280 280q28 28 48 76t20 88z" />
          ) : (
            <path d="M491 1536l91-91-235-235-91 91v107h128v128h107zm523-928q0-22-22-22-10 0-17 7l-542 542q-7 7-7 17 0 22 22 22 10 0 17-7l542-542q7-7 7-17zm-54-192l416 416-832 832h-416v-416zm683 96q0 53-37 90l-166 166-416-416 166-165q36-38 90-38 53 0 91 38l235 234q37 39 37 91z" />
          )}
        </Icon>
      </ButtonIcon>
      <Input gridColumn={1}>
        <BoldText>Question: </BoldText>
        <StyledInput
          value={question.question_text}
          minHeight={10}
          width={160}
        />
      </Input>
      <Input gridColumn={6}>
        <BoldText>Answers: </BoldText>
        <StyledInput
          value={question.annswer_options}
          minHeight={10}
          width={160}
        />
      </Input>
      <ButtonIcon gridColumn={12}>
        <Icon viewBox="0 0 1792 1792">
          {editable ? (
            <path d="M1664 896q0 156-61 298t-164 245-245 164-298 61q-172 0-327-72.5t-264-204.5q-7-10-6.5-22.5t8.5-20.5l137-138q10-9 25-9 16 2 23 12 73 95 179 147t225 52q104 0 198.5-40.5t163.5-109.5 109.5-163.5 40.5-198.5-40.5-198.5-109.5-163.5-163.5-109.5-198.5-40.5q-98 0-188 35.5t-160 101.5l137 138q31 30 14 69-17 40-59 40h-448q-26 0-45-19t-19-45v-448q0-42 40-59 39-17 69 14l130 129q107-101 244.5-156.5t284.5-55.5q156 0 298 61t245 164 164 245 61 298z" />
          ) : (
            <path d="M1490 1322q0 40-28 68l-136 136q-28 28-68 28t-68-28l-294-294-294 294q-28 28-68 28t-68-28l-136-136q-28-28-28-68t28-68l294-294-294-294q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 294 294-294q28-28 68-28t68 28l136 136q28 28 28 68t-28 68l-294 294 294 294q28 28 28 68z" />
          )}
        </Icon>
      </ButtonIcon>
    </Wrapper>
  );
}

Question.propTypes = {};

export default Question;
