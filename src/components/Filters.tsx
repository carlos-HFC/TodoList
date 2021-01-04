import { FormEvent, useState } from "react"
import { FaFilter } from "react-icons/fa"

import { Button, RadioButton } from '.'

interface FilterTodoProps {
   filtrarTodo(value: string, type: string): void
}

export default function Filters({ filtrarTodo }: FilterTodoProps) {
   const [value, setValue] = useState('')
   const [type, setType] = useState('All')

   function filtrar(e: FormEvent) {
      e.preventDefault()
      filtrarTodo(value, type)
   }

   return (
      <section className="mb-4">
         <form onSubmit={filtrar} className="row mb-3">
            <div className="col-lg-6 mb-2">
               <label>Título</label>
               <input type="text" className="form-control"
                  value={value} onChange={e => setValue(e.target.value)}
               />
            </div>
            <fieldset className="form-group col-lg-4 col-12 mb-2">
               <legend className="col-form-label">Tipo</legend>
               <div className="row">
                  <div className="col-12">
                     <RadioButton id="All" name="FiltrarTodo"
                        value="All" onChange={e => setType(e.target.value)} checked={type === 'All'}
                     >
                        All
                     </RadioButton>
                     <RadioButton id="Todo" name="FiltrarTodo"
                        value="Todo" onChange={e => setType(e.target.value)} checked={type === 'Todo'}
                     >
                        To Do
                     </RadioButton>
                     <RadioButton id="Done" name="FiltrarTodo"
                        value="Done" onChange={e => setType(e.target.value)} checked={type === 'Done'}
                     >
                        Done
                     </RadioButton>
                  </div>
               </div>
            </fieldset>
            <div className="col-lg col-12 mb-2 d-flex align-items-end justify-content-end ">
               <Button background="primary" className="my-query__btn">
                  <FaFilter className="mr-2" />Filtrar
               </Button>
            </div>
         </form>
      </section>
   )
}
