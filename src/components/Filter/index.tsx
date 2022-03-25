import { FormEvent, MutableRefObject, useState } from "react";
import { VscListSelection } from "react-icons/vsc";

import { Button, Input } from "..";
import { INITIAL_STATE_FILTER_TODO, INITIAL_STATE_TODOS_FILTERED } from "../../constants";
import { useTodo } from "../../context";

import { Wrapper } from "./style";

interface FilterProps {
  listRef: MutableRefObject<HTMLUListElement | null>;
}

export function Filter({ listRef }: FilterProps) {
  const { todos, handleSetTodosFiltered } = useTodo();

  const [openFilter, setOpenFilter] = useState(false);
  const [filter, setFilter] = useState(INITIAL_STATE_FILTER_TODO);

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

    handleSetTodosFiltered({ todos: filtered, filter: true });
  }

  function cancelFilterTodo() {
    handleSetTodosFiltered(INITIAL_STATE_TODOS_FILTERED);
    setFilter(INITIAL_STATE_FILTER_TODO);
  }

  return (
    <Wrapper open={openFilter}>
      <header>
        <h2>Filtrar</h2>
        <Button onClick={() => setOpenFilter(open => !open)} aria-label="Abrir filtros">
          <VscListSelection aria-hidden="true" />
        </Button>
      </header>

      <div className="filter">
        <form onSubmit={handleFilterTodo}>
          <Input label="Título To Do" type="text" id="TitleToDo"
            value={filter.text} onChange={e => setFilter({ ...filter, text: e.target.value })}
          />
          <fieldset>
            <span>Tipo</span>
            <div className="filter_types">
              <div className="filter_types-check">
                <input type="radio" id="All" name="filterTodos"
                  checked={!filter.type} value="" onChange={e => setFilter({ ...filter, type: e.target.value })}
                />
                <label htmlFor="All">All</label>
              </div>
              <div className="filter_types-check">
                <input type="radio" id="Incomplete" name="filterTodos"
                  checked={filter.type === "Incomplete"} value="Incomplete" onChange={e => setFilter({ ...filter, type: e.target.value })}
                />
                <label htmlFor="Incomplete">To Do</label>
              </div>
              <div className="filter_types-check">
                <input type="radio" id="Done" name="filterTodos"
                  checked={filter.type === "Done"} value="Done" onChange={e => setFilter({ ...filter, type: e.target.value })}
                />
                <label htmlFor="Done">Done</label>
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
    </Wrapper>
  );
}