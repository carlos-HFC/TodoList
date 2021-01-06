import { FormEvent, useState } from 'react'
import { FaPlusCircle } from 'react-icons/fa'

import { Button, Notification } from '.'

interface TodoProps {
   add: (param: string) => string
}

const AddItem: React.FC<TodoProps> = ({ add }) => {
   const [todo, setTodo] = useState("")
   const [show, setShow] = useState(false)
   const [exists, setExists] = useState(false)

   function handleSubmitTodo(e: FormEvent) {
      e.preventDefault()
      const adicionar = add(todo.trim())

      setShow(true)

      if (adicionar === "Erro") {
         setExists(true)
         setTimeout(() => setShow(false), 3000)
         return null
      } else {
         setExists(false)
         setTimeout(() => setShow(false), 3000)
         setTodo("")
      }
   }

   return (
      <section className="mt-4">
         <Notification show={show} exists={exists} />
         <div className="row mb-3">
            <form className="col-12 form-inline justify-content-between" onSubmit={handleSubmitTodo}>
               <label htmlFor="todo" title="Insira título da atividade" className="col-form-label mb-2">To Do:</label>
               <input type="text" id="todo" title="Insira título da atividade" className="form-control col-12 col-md-8 mb-2" minLength={1} autoComplete="off"
                  value={todo} onChange={e => setTodo(e.target.value)}
               />
               <Button background="success" className="my-query__btn mb-2" title="Adicionar tarefa" disabled={!todo.trim()}>
                  <FaPlusCircle className="mr-2" />Adicionar
               </Button>
            </form>
         </div>
      </section>
   )
}

export default AddItem