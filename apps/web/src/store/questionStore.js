import create from 'zustand';

const useQuestionStore = create((set) => ({
  questions: [],
  loading: false,
  error: null,

  fetchQuestions: async () => {
    set({ loading: true, error: null });
    try {
      const response = await fetch('/api/questions');
      const data = await response.json();
      set({ questions: data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  addQuestion: async (newQuestion) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch('/api/questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newQuestion),
      });
      const data = await response.json();
      set((state) => ({ questions: [...state.questions, data], loading: false }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  deleteQuestion: async (questionId) => {
    set({ loading: true, error: null });
    try {
      await fetch(`/api/questions/${questionId}`, {
        method: 'DELETE',
      });
      set((state) => ({
        questions: state.questions.filter((question) => question._id !== questionId),
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));

export default useQuestionStore;