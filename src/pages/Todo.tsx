import { useEffect, useState } from 'react'

import { AddItem, Filters, ListTodo } from '../components'

export default function Todo() {
   const [todos, setTodos] = useState<string[]>(JSON.parse(localStorage.getItem("TODO") as string) || [])
   const [checked, setChecked] = useState<number[]>(JSON.parse(localStorage.getItem("DONE") as string) || [])
   const [todoFilter, setTodoFilter] = useState<string[]>([])

   useEffect(() => localStorage.setItem("TODO", JSON.stringify(todos)), [todos])
   useEffect(() => localStorage.setItem("DONE", JSON.stringify(checked)), [checked])

   function addItem(todo: string) {
      let filtered = todos.filter(el => todo === el)

      if (todos.length > 0 && filtered.length > 0) {
         return "Erro"
      } else {
         setTodos([...todos, todo])
         return "Sucesso"
      }
   }

   function removeItem(todo: string) {
      let filtered = todos.filter(el => todo !== el)
      setTodos(filtered)
   }

   function handleDone(id: number) {
      const already = checked.findIndex(el => el === id)

      if (already >= 0) {
         const filtered = checked.filter(el => el !== id)
         setChecked(filtered.sort())
      } else {
         setChecked([...checked, id].sort())
      }
   }

   function filtrarTodo(value: string, type: string) {
      let filtered = todos

      filtered = filtered.filter((item, i) => {
         if (value) {
            if (type === 'Done') return checked.includes(i) && item.toLowerCase().startsWith(value.toLowerCase())
            else if (type === 'Todo') return !checked.includes(i) && item.toLowerCase().startsWith(value.toLowerCase())
            else return item.toLowerCase().startsWith(value.toLowerCase())
         } else {
            if (type === 'Done') return checked.includes(i)
            else if (type === 'Todo') return !checked.includes(i)
            else return item
         }
      })

      if (filtered.length === 0) filtered = ["Error404\\NotFound"]

      setTodoFilter(filtered)
   }

   return (
      <main className="m-3">
         <div className="container p-3">
            <h2 className="text-center mb-3">Insira suas atividades</h2><hr />
            <Filters filtrarTodo={filtrarTodo} />
            <AddItem add={addItem} />
            <ListTodo todos={todos} remove={removeItem} done={checked} handleDone={handleDone} todoFilter={todoFilter} />
         </div>
      </main>
   )
}