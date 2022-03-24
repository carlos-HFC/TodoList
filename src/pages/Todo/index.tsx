import { lazy, Suspense, useRef } from "react";
import { FormEvent, useEffect, useState } from "react";
import { VscListSelection, VscSave } from "react-icons/vsc";

import { Button, Input } from "../../components";

import { Filter, List, Main } from "./styles";

const Item = lazy(() => import('../../components').then(({ Item }) => ({ default: Item })));

interface TTodos {
  id: number;
  text: string;
  checked: boolean;
}

interface TFilterTodos {
  filter: boolean;
  todos: TTodos[];
}

const INITIAL_STATE_TODOS_FILTERED = {} as TFilterTodos;
const INITIAL_STATE_EDIT_TODO = {} as TTodos;
const INITIAL_STATE_FILTER_TODO = {
  text: "",
  type: ""
};

export function Todo() {
  const listRef = useRef<HTMLUListElement | null>(null);

  const [openFilter, setOpenFilter] = useState(false);
  const [item, setItem] = useState("");
  const [edit, setEdit] = useState(INITIAL_STATE_EDIT_TODO);
  const [filter, setFilter] = useState(INITIAL_STATE_FILTER_TODO);
  const [todos, setTodos] = useState<TTodos[]>(JSON.parse(localStorage.getItem(String(process.env.REACT_APP_TODO_LIST)) as string) || []);
  const [todosFiltered, setTodosFiltered] = useState(INITIAL_STATE_TODOS_FILTERED);

  useEffect(() => localStorage.setItem(String(process.env.REACT_APP_TODO_LIST), JSON.stringify(todos)), [todos]);

  function addItem(e: FormEvent) {
    e.preventDefault();

    if (!item.trim()) return;

    const newTodo = { text: item.trim(), id: todos.length + 1, checked: false };

    setTodos([...todos, newTodo]);

    setItem("");
  }

  function removeItem(id: number) {
    const filtered = todos.filter(todo => todo.id !== id);

    setTodos(filtered);
  }

  function handleToggleChecked(id: number) {
    const filtered = todos.filter(todo => todo.id !== id);

    const todoById = todos.find(todo => todo.id === id) as TTodos;

    Object.assign(todoById, { checked: !todoById.checked });

    setTodos([...filtered, todoById].sort((a, b) => a.id - b.id));
  }

  function editItem(id: number) {
    const todoById = todos.find(todo => todo.id === id) as TTodos;

    setEdit(todoById);
  }

  function handleSaveEdit(e: FormEvent) {
    e.preventDefault();

    const filtered = todos.filter(todo => todo.id !== edit.id);

    const todoById = todos.find(todo => todo.id === edit.id) as TTodos;

    Object.assign(todoById, { text: edit.text });

    setTodos([...filtered, todoById].sort((a, b) => a.id - b.id));

    setEdit(INITIAL_STATE_EDIT_TODO);
  }

  function handleFilterTodo(e: FormEvent) {
    e.preventDefault();

    const filtered = todos.filter(todo => {
      if (filter.text) {
        if (filter.type === "Done") return todo.checked && todo.text.toLowerCase().startsWith(filter.text.toLowerCase());
        if (filter.type === "Incomplete") return !todo.checked && todo.text.toLowerCase().startsWith(filter.text.toLowerCase());
        return todo.text.toLowerCase().startsWith(filter.text.toLowerCase());
      } else {
        if (filter.type === "Done") return todo.checked;
        if (filter.type === "Incomplete") return !todo.checked;
        return todo;
      }
    });

    if (filtered.length > 0) {
      listRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    setTodosFiltered({ todos: filtered, filter: true });
  }

  function cancelFilterTodo() {
    setTodosFiltered(INITIAL_STATE_TODOS_FILTERED);
    setFilter(INITIAL_STATE_FILTER_TODO);
  }

  return (
    <Main>
      <div className="container">
        <h1>Insira suas atividades</h1>

        <form onSubmit={addItem}>
          <Input value={item} onChange={e => setItem(e.target.value)} />
          <Button variant="success" disabled={!item.trim()}>
            Adicionar
          </Button>
        </form>

        <Filter open={openFilter}>
          <header>
            <h2>Filtrar</h2>
            <Button onClick={() => setOpenFilter(open => !open)}>
              <VscListSelection />
            </Button>
          </header>

          <div className="filter">
            <form onSubmit={handleFilterTodo}>
              <Input label="Título To Do"
                value={filter.text} onChange={e => setFilter({ ...filter, text: e.target.value })}
              />
              <fieldset>
                <span>Tipo</span>
                <div className="filter_types">
                  <div className="filter_types-check">
                    <input type="radio" id="All" name="filterTodos"
                      checked={!filter.type} value="" onChange={e => setFilter({ ...filter, type: e.target.value })}
                    />
                    <label htmlFor="All">Todos</label>
                  </div>
                  <div className="filter_types-check">
                    <input type="radio" id="Incomplete" name="filterTodos"
                      checked={filter.type === "Incomplete"} value="Incomplete" onChange={e => setFilter({ ...filter, type: e.target.value })}
                    />
                    <label htmlFor="Incomplete">A fazer</label>
                  </div>
                  <div className="filter_types-check">
                    <input type="radio" id="Done" name="filterTodos"
                      checked={filter.type === "Done"} value="Done" onChange={e => setFilter({ ...filter, type: e.target.value })}
                    />
                    <label htmlFor="Done">Concluídos</label>
                  </div>
                </div>
              </fieldset>
              <div className="filter_btns">
                <Button type="submit">
                  Filtrar
                </Button>
                <Button variant="secondary" onClick={cancelFilterTodo} type="reset">
                  Cancelar
                </Button>
              </div>
            </form>
          </div>
        </Filter>

        <List ref={listRef}>
          {(todosFiltered.todos || todos).map(todo => edit.id === todo.id ? (
            <form onSubmit={handleSaveEdit}>
              <input type="text"
                defaultValue={edit.text} onChange={e => setEdit({ ...edit, text: e.target.value })}
              />
              <Button>
                <VscSave />
              </Button>
            </form>
          ) : (
            <Suspense fallback={"ola"}>
              <Item key={todo.id} checked={todo.checked}
                onChecked={() => handleToggleChecked(todo.id)}
                onEdit={() => editItem(todo.id)}
                onDelete={() => removeItem(todo.id)}
              >
                {todo.text}
              </Item>
            </Suspense>
          ))}
        </List>
      </div>
    </Main>
  );
}