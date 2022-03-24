import { FormEvent, useEffect, useState } from "react";

import { Button, Input, Item } from "../../components";

import { List, Main } from "./styles";

interface Todos {
  id: number;
  text: string;
  checked: boolean;
}

export function Todo() {
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
  const [todos, setTodos] = useState<Todos[]>(JSON.parse(localStorage.getItem(String(process.env.REACT_APP_TODO_LIST)) as string) || []);

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
            <Item key={todo.id} checked={todo.checked} onChecked={() => handleToggleChecked(todo.id)} onDelete={() => removeItem(todo.id)}>
              {todo.text}
            </Item>
          ))}
        </List>
      </div>
    </Main>
  );
}