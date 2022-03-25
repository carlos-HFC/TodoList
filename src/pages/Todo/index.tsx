
import { ChangeEvent, FormEvent, lazy, Suspense, useRef, useState } from "react";
import { VscSave } from "react-icons/vsc";

import { TTodos } from "../../@types";
import { Button, Input } from "../../components";
import { INITIAL_STATE_EDIT_TODO } from "../../constants";
import { useTodo } from "../../context";

import { Main } from "./styles";

const Filter = lazy(() => import('../../components').then(({ Filter }) => ({ default: Filter })));
const Item = lazy(() => import('../../components').then(({ Item }) => ({ default: Item })));
const List = lazy(() => import('./styles').then(({ List }) => ({ default: List })));

export function Todo() {
  const { todos, todosFiltered, handleSetTodos } = useTodo();

  const listRef = useRef<HTMLUListElement | null>(null);

  const [item, setItem] = useState("");
  const [edit, setEdit] = useState(INITIAL_STATE_EDIT_TODO);

  function addItem(e: FormEvent) {
    e.preventDefault();

    if (!item.trim()) return;

    let allTodos = [...todos];

    let lastTodo = (allTodos?.pop()?.id || allTodos.length) + 1;

    const newTodo = { text: item.trim(), id: lastTodo, checked: false };

    handleSetTodos([...todos, newTodo]);

    setItem("");
  }

  function removeItem(id: number) {
    const filtered = todos.filter(todo => todo.id !== id);

    handleSetTodos(filtered);
  }

  function handleToggleChecked(id: number) {
    const filtered = todos.filter(todo => todo.id !== id);

    const todoById = todos.find(todo => todo.id === id) as TTodos;

    Object.assign(todoById, { checked: !todoById.checked });

    handleSetTodos([...filtered, todoById].sort((a, b) => a.id - b.id));
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

    handleSetTodos([...filtered, todoById].sort((a, b) => a.id - b.id));

    setEdit(INITIAL_STATE_EDIT_TODO);
  }

  function readFile(file: File) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
      reader.readAsText(file);
    });
  }

  function uploadTodos(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files && e.target.files[0];

    readFile(file as File)
      .then(base => {
        const importedTodos = JSON.parse(base as string) as TTodos[];

        let concatTodos = [...importedTodos, ...todos];

        const newTodos = concatTodos.filter((todo, index, newArr) => newArr.findIndex(v2 => v2.id === todo.id) === index).sort((a, b) => a.id - b.id);

        handleSetTodos(newTodos);
      });
  }

  function downloadTodos() {
    const blob = new Blob([JSON.stringify(todos)], { type: 'text/json' });

    const a = document.createElement('a');
    a.download = 'todos.json';
    a.href = window.URL.createObjectURL(blob);

    const clickEvent = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true
    });

    a.dispatchEvent(clickEvent);
    a.remove();
  }

  return (
    <Main>
      <div className="container">
        <h1>Insira suas atividades</h1>

        <form onSubmit={addItem}>
          <Input id="ToDo" value={item} onChange={e => setItem(e.target.value)} />
          <Button variant="success" disabled={!item.trim()}>
            Adicionar
          </Button>
        </form>

        <div className="external_funcionalities">
          <Button as="label">
            Importar JSON
            <input type="file" onChange={uploadTodos} />
          </Button>
          <Button onClick={downloadTodos} disabled={!todos.length}>
            Exportar JSON
          </Button>
        </div>

        <Suspense fallback={"Loading"}>
          <Filter listRef={listRef} />

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
              <Item key={todo.id} checked={todo.checked}
                onChecked={() => handleToggleChecked(todo.id)}
                onEdit={() => editItem(todo.id)}
                onDelete={() => removeItem(todo.id)}
              >
                {todo.text}
              </Item>
            ))}
          </List>
        </Suspense>
      </div>
    </Main>
  );
}