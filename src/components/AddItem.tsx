import { FormEvent, useState } from 'react'
import { FaPlusCircle } from 'react-icons/fa'

import { Button } from '.'

interface TodoProps {
   add: (param: string) => string
}

export default function AddItem({ add }: TodoProps) {
   const [todo, setTodo] = useState("")
   const [show, setShow] = useState(false)
   const [msg, setMsg] = useState({
      header: "",
      body: "",
      style: "",
   })

   function handleSubmitTodo(e: FormEvent) {
      e.preventDefault()
      const adicionar = add(todo.trim())

      if (adicionar === "Erro") {
         setShow(true)
         setMsg({
            style: "danger",
            header: "Oopss...",
            body: "Essa atividade já está cadastrada!"
         })
         setTimeout(() => setShow(false), 3000)
         return null
      } else {
         setShow(true)
         setMsg({
            style: "success",
            header: "Oba!",
            body: "Sua atividade foi cadastrada com sucesso!"
         })
         setTimeout(() => setShow(false), 3000)
         setTodo("")
      }
   }

   return (
      <section className="mt-5">
         <div className={`notification alert notification-${msg.style}`} style={show ? { right: "2%" } : { right: -400 }}>
            <div className={`notification-header-${msg.style}`}>
               <strong className="mr-auto">{msg.header}</strong>
            </div>
            <div className="notification-body">{msg.body}</div>
         </div>
         <div className="row mb-3">
            <form className="col-12 form-inline justify-content-between" onSubmit={handleSubmitTodo}>
               <label htmlFor="todo" className="col-form-label mb-2">To Do:</label>
               <input type="text" id="todo" className="form-control col-12 col-md-8 mb-2" minLength={1} autoComplete="off"
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