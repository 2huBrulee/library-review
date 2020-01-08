/**
 *
 * Question
 *
 */

import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import TextInput from 'components/TextInput';
import { grid, layout, space, typography } from 'styled-system';
import Popover, { ArrowContainer } from 'react-tiny-popover';
import { questionValidations } from 'containers/Books/validations';

const Wrapper = styled.div`
  width: 566px;
  display: grid;
  grid-template-columns: 28px 1fr;
  row-gap: 4px;
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
  height: 32px;
  align-items: center;
  margin: 0 0 0 4px;
`;

const StyledInput = styled(TextInput)`
  ${layout};
  margin-left: auto;
  right: 0;
  ${({ invalid }) => invalid && `border: 1px solid red;`}
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
  color: #0082c8;
  border: 0;
  &:hover {
    cursor: pointer;
  }
`;

const DetailContainer = styled.div`
  ${grid};
  ${space};
  ${layout};
  ${typography};
  box-sizing: border-box;
`;

const BoldTextSpan = styled.span`
  ${space};
  font-weight: bold;
`;

const TextSpan = styled.span`
  ${space};
  white-space: nowrap;
`;

const SaveButton = styled.button`
  width: 120px;
  margin: 15px 8px;
  background-color: #fafafa;
  border-color: #ff8000;
  border-style: solid;
  border-width: 1px;
  border-radius: 5px;
  align-items: center;
  height: 25px;
  padding: 0 15px;
  justify-content: center;
  display: flex;
  font-size: 16px;
  color: #ff8000;
  cursor: pointer;
`;

const CancelButton = styled.button`
  width: 120px;
  margin: 15px 8px;
  background-color: #fafafa;
  border-color: #ff8000;
  border-style: solid;
  border-width: 1px;
  border-radius: 5px;
  align-items: center;
  height: 25px;
  padding: 0 15px;
  justify-content: center;
  display: flex;
  font-size: 16px;
  color: #ff8000;
  cursor: pointer;
`;

const DeleteButton = styled.button`
  width: 120px;
  margin: 15px 8px;
  grid-column: 3;
  background-color: #fafafa;
  border-color: #ff8000;
  border-style: solid;
  border-width: 1px;
  border-radius: 5px;
  align-items: center;
  height: 25px;
  padding: 0 15px;
  justify-content: center;
  display: flex;
  font-size: 16px;
  color: #ff8000;
  cursor: pointer;
`;

const ButtonSection = styled.div`
  grid-column: 2;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 16px;
  justify-items: center;
`;

const Label = styled.span`
  border-radius: 4px;
  margin: 0 24px;
  padding: 0 20px;
  background-color: #cccccc;
  display: inline-flex;
  align-items: center;
  color: white;
`;

const InvalidAlertWrapper = styled.div`
  color: red;
`;

const Alert = props => (
  <InvalidAlertWrapper>{props.message}</InvalidAlertWrapper>
);

const Question = props => {
  const { createQuestion, editQuestion, book } = props;

  const [question, setQuestion] = useState({
    key: '',
    id: '',
    user_id: '',
    body: '',
    global: true,
    answer_options: [],
  });

  const [editable, setEditable] = useState(false);
  const [questionEdited, setQuestionEdited] = useState(false);
  const [answerEdited, setAnswerEdited] = useState(false);
  const [invalidInput, setInvalidInput] = useState(false);

  const questionBodyHandler = e => {
    setQuestion({ ...question, body: e.target.value });
    setQuestionEdited(true);
  };
  const answersHandler = e => {
    setQuestion({
      ...question,
      answer_options: e.target.value.split(','),
    });
    setAnswerEdited(true);
  };
  const cancelEdition = () => {
    setEditable(false);
    setQuestion(props.question);
  };

  useEffect(() => {
    if (props.question) setQuestion(props.question);
  }, [props.question]);

  useEffect(() => setEditable(props.editable), [props.editable]);

  const createQuestionHandler = () => {
    if (
      questionValidations.validateAnswer(question.answer_options) &&
      questionValidations.validateQuestionBody(question.body)
    ) {
      createQuestion(book, {
        body: question.body,
        answer_options: question.answer_options.map(answer => answer.trim()),
      });
      setQuestion({
        key: '',
        id: '',
        user_id: '',
        body: '',
        global: true,
        answer_options: [],
      });
    } else {
      setInvalidInput(true);
    }
  };

  const editQuestionHandler = () => {
    if (
      questionValidations.validateAnswer(question.answer_options) &&
      questionValidations.validateQuestionBody(question.body)
    ) {
      editQuestion(book, {
        body: question.body,
        answer_options: question.answer_options.map(answer => answer.trim()),
        key: question.key,
        status: 'UPDATED',
      });
      setEditable(false);
    } else {
      setInvalidInput(true);
    }
  };

  const deleteQuestionHandler = () => {
    editQuestion(book, {
      global: false,
    });
    setEditable(false);
  };

  return (
    <Wrapper>
      {!editable && (
        <ButtonIcon gridColumn={1} onClick={() => setEditable(true)}>
          <Icon viewBox="0 0 1792 1792">
            <path d="M491 1536l91-91-235-235-91 91v107h128v128h107zm523-928q0-22-22-22-10 0-17 7l-542 542q-7 7-7 17 0 22 22 22 10 0 17-7l542-542q7-7 7-17zm-54-192l416 416-832 832h-416v-416zm683 96q0 53-37 90l-166 166-416-416 166-165q36-38 90-38 53 0 91 38l235 234q37 39 37 91z" />
          </Icon>
        </ButtonIcon>
      )}
      <DetailContainer height={24} lineHeight="24px" gridColumn={2}>
        <BoldTextSpan ml={1}>
          {props.newQuestion ? `New Question:` : `Key: `}
        </BoldTextSpan>
        <TextSpan ml={1}>{question.key}</TextSpan>
        {!props.question.global && <Label>DISABLED</Label>}
      </DetailContainer>
      {editable ? (
        <Input gridColumn="2/13">
          <BoldText>Q: </BoldText>
          <Popover
            isOpen={
              !questionValidations.validateQuestionBody(question.body) &&
              (questionEdited || invalidInput)
            }
            position={'right'} // preferred position
            disableReposition
            content={<Alert message="Must  contain 4 underscores" />}
          >
            <StyledInput
              onChange={questionBodyHandler}
              value={question.body}
              minHeight={10}
              width="91%"
              invalid={
                invalidInput &&
                !questionValidations.validateQuestionBody(question.body)
              }
            />
          </Popover>
        </Input>
      ) : (
        <DetailContainer height={24} lineHeight="24px" gridColumn={2}>
          <BoldTextSpan ml={1}>Q: </BoldTextSpan>
          <TextSpan ml={1}>{question.body}</TextSpan>
        </DetailContainer>
      )}
      {editable ? (
        <Input gridColumn="2/13">
          <BoldText>A: </BoldText>
          <Popover
            isOpen={
              !questionValidations.validateAnswer(question.answer_options) &&
              (answerEdited || invalidInput)
            }
            position={'right'} // preferred position
            disableReposition
            content={<Alert message="Can´t be empty" />}
          >
            <StyledInput
              onChange={answersHandler}
              value={
                question.answer_options
                  ? question.answer_options.join(',')
                  : null
              }
              minHeight={10}
              width="91%"
              invalid={
                invalidInput &&
                !questionValidations.validateAnswer(question.answer_options)
              }
            />
          </Popover>
        </Input>
      ) : (
        <DetailContainer height={24} lineHeight="24px" gridColumn="2/13">
          <BoldTextSpan ml={1}>A: </BoldTextSpan>
          <TextSpan ml={1}>
            {question.answer_options
              ? question.answer_options.join(', ')
              : null}
          </TextSpan>
        </DetailContainer>
      )}
      {editable && (
        <ButtonSection>
          <SaveButton
            onClick={
              props.newQuestion ? createQuestionHandler : editQuestionHandler
            }
          >
            Save
          </SaveButton>
          {!props.newQuestion && (
            <CancelButton onClick={cancelEdition}>Cancel</CancelButton>
          )}
          <DeleteButton onClick={deleteQuestionHandler}>Delete</DeleteButton>
        </ButtonSection>
      )}
    </Wrapper>
  );
};

Question.propTypes = {};

export default Question;
