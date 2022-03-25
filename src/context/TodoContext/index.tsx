import { createContext, ReactNode, useContext, useEffect, useState } from "react";

import { TTodos, TFilterTodos } from "../../@types";
import { INITIAL_STATE_TODOS_FILTERED } from "../../constants";

interface TodoContextProps {
  todos: TTodos[];
  todosFiltered: TFilterTodos;
  handleSetTodos(param: TTodos[]): void;
  handleSetTodosFiltered(param: TFilterTodos): void;
}

interface TodoProviderProps {
  children: ReactNode;
}

export const TodoContext = createContext({} as TodoContextProps);

export const useTodo = () => useContext(TodoContext);

export function TodoProvider({ children }: TodoProviderProps) {
  const [todos, setTodos] = useState<TTodos[]>(JSON.parse(localStorage.getItem(String(process.env.REACT_APP_TODO_LIST)) as string) || []);
  const [todosFiltered, setTodosFiltered] = useState(INITIAL_STATE_TODOS_FILTERED);

  useEffect(() => localStorage.setItem(String(process.env.REACT_APP_TODO_LIST), JSON.stringify(todos)), [todos]);

  const handleSetTodos = (value: TTodos[]) => setTodos(value);

  const handleSetTodosFiltered = (value: TFilterTodos) => setTodosFiltered(value);

  return (
    <TodoContext.Provider value={{ todos, todosFiltered, handleSetTodos, handleSetTodosFiltered }}>
      {children}
    </TodoContext.Provider>
  );
}