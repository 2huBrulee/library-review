import { v1 } from 'utils/matildaAPI';

export const questionRequests = {
  createQuestion: (book, question) =>
    v1.post(`questions`, {
      question: {
        text_id: book.text_id,
        body: question.body,
        answer_options: question.answer_options,
      },
    }),

  editQuestion: question =>
    v1.patch(`questions/key/${question.key}`, {
      question,
    }),
};
