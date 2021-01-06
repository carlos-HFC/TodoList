import { FormEvent, useState } from "react"
import { FaArrowCircleDown, FaFilter } from "react-icons/fa"
import styled from "styled-components"

import { Button, RadioButton } from '.'

interface FilterTodoProps {
   filtrarTodo: (value: string, type: string) => void
   disabled: boolean
}

const Collapse = styled.div<{ open: boolean }>`
   overflow: hidden;
   ${props => {
      if (props.open) {
         return `
            max-height: 500px;
            transition: max-height 1s;
         `
      } else {
         return `
            max-height: 0;
            transition: .3s;
         `
      }
   }}
`

const Icon = styled(FaArrowCircleDown) <{ open: boolean }>`
   transition: .5s;
   margin-right: .5rem;
   transform: ${props => props.open ? 'rotate(180deg)' : 'rotate(0deg)'};
`

const Filters: React.FC<FilterTodoProps> = ({ filtrarTodo, disabled }) => {
   const [value, setValue] = useState('')
   const [type, setType] = useState('All')
   const [open, setOpen] = useState(false)

   function filtrar(e: FormEvent) {
      e.preventDefault()
      filtrarTodo(value, type)
   }

   return (
      <section className="mb-4">
         <div className="d-flex justify-content-center align-items-center">
            <button onClick={() => setOpen(open => !open)} className="btn btn-primary" title="Utilizar filtros" aria-controls="collapse">
               <Icon open={open} />Filtros
            </button>
         </div>
         <Collapse open={open} id="collapse">
            <form onSubmit={filtrar} className="row mb-3">
               <div className="col-lg-6 mb-2" title="Filtrar pelo título da atividade">
                  <label htmlFor="todoTitle">Título</label>
                  <input type="text" id="todoTitle" className="form-control"
                     value={value} onChange={e => setValue(e.target.value)}
                  />
               </div>
               <fieldset className="form-group col-lg-4 col-12 mb-2">
                  <legend className="col-form-label">Tipo</legend>
                  <div className="row">
                     <div className="col-12">
                        <RadioButton id="All" name="FiltrarTodo" title="Filtrar todas as atividades"
                           value="All" onChange={e => setType(e.target.value)} checked={type === 'All'}
                        >
                           All
                        </RadioButton>
                        <RadioButton id="Todo" name="FiltrarTodo" title="Filtrar atividades a fazer"
                           value="Todo" onChange={e => setType(e.target.value)} checked={type === 'Todo'}
                        >
                           To Do
                        </RadioButton>
                        <RadioButton id="Done" name="FiltrarTodo" title="Filtrar atividades concluídas"
                           value="Done" onChange={e => setType(e.target.value)} checked={type === 'Done'}
                        >
                           Done
                        </RadioButton>
                     </div>
                  </div>
               </fieldset>
               <div className="col-lg col-12 mb-2 d-flex align-items-end justify-content-end">
                  <Button background="primary" className="my-query__btn" disabled={disabled} title="Filtrar atividades">
                     <FaFilter className="mr-2" />Filtrar
                  </Button>
               </div>
            </form>
         </Collapse>
      </section>
   )
}

export default Filters