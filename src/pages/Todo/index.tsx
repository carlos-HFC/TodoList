import { FormEvent, useState } from 'react';

import { Button, Input, Item } from '../../components';

import { List, Main } from "./styles";

interface Todos {
  id: number;
  text: string;
  checked: boolean;
}

export function Todo() {
  // function handleDone(id: number) {
  //   const already = checked.findIndex(el => el === id);

  //   if (already >= 0) {
  //     const filtered = checked.filter(el => el !== id);
  //     setChecked(filtered.sort());
  //   } else {
  //     setChecked([...checked, id].sort());
  //   }
  // }

  // function filtrarTodo(value: string, type: string) {
  //   let filtered = todos;

  //   filtered = filtered.filter((item, i) => {
  //     if (value) {
  //       if (type === 'Done') return checked.includes(i) && item.toLowerCase().startsWith(value.toLowerCase());
  //       else if (type === 'Todo') return !checked.includes(i) && item.toLowerCase().startsWith(value.toLowerCase());
  //       else return item.toLowerCase().startsWith(value.toLowerCase());
  //     } else {
  //       if (type === 'Done') return checked.includes(i);
  //       else if (type === 'Todo') return !checked.includes(i);
  //       else return item;
  //     }
  //   });

  //   if (filtered.length === 0) filtered = ["Error404\\NotFound"];

  //   setTodoFilter(filtered);
  // }

  const [item, setItem] = useState("");
  const [todos, setTodos] = useState<Todos[]>([]);

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

  function handleDone(id: number) {
    const filtered = todos.filter(todo => todo.id !== id);

    const todo = todos.find(todo => todo.id === id) as Todos;

    Object.assign(todo, { checked: !todo.checked });

    setTodos([...filtered, todo].sort((a, b) => a.id - b.id));
  }

  return (
    <Main>
      <div className="container">
        <h1>Insira suas atividades</h1>

        <form onSubmit={addItem}>
          <Input value={item} onChange={e => setItem(e.target.value)} />
          <Button variant="success">
            Adicionar
          </Button>
        </form>

        <List>
          {todos.map(todo => (
            <Item key={todo.id} checked={todo.checked} onChecked={() => handleDone(todo.id)} onDelete={() => removeItem(todo.id)}>
              {todo.text}
            </Item>
          ))}
        </List>
      </div>
    </Main>
  );
}