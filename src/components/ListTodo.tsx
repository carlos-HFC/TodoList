import exportFromJSON from "export-from-json"
import { FormEvent, useState } from "react"
import { FaCheck, FaEdit, FaTrash } from "react-icons/fa"

import { Button, Json } from "."

interface ListTodoProps {
   todos: string[]
   todoFilter: string[]
   done: number[]
   remove: (param: string) => void
   handleDone: (id: number) => void
}

interface Edition {
   id: number
   item: string
}

const ListTodo: React.FC<ListTodoProps> = ({ todos, remove, done, handleDone, todoFilter }) => {
   const [edit, setEdit] = useState<Edition | undefined>()

   function editItem(todo: string, id: number) {
      const filtered = todos.filter(el => todo === el).toString()
      setEdit({ id, item: filtered })
   }

   function saveEdit(e: FormEvent) {
      e.preventDefault()
      const filtered = todos.findIndex((el, i) => i === edit?.id)
      todos.fill(String(edit?.item), filtered, filtered + 1)
      localStorage.setItem("TODO", JSON.stringify(todos))
      setEdit(undefined)
   }

   function style(item: string, index: number) {
      let estilo = ''

      if (done.includes(index)) estilo += 'checked '

      if (todoFilter.length >= 1 && !todoFilter.includes(item)) estilo += 'd-none '

      return estilo
   }

   function exportJson() {
      const data = JSON.stringify(localStorage.getItem("TODO"))
      exportFromJSON({ data, fileName: 'TODO', exportType: 'json' })
   }

   return (
      <section className="mt-4">
         <div className="importButtons">
            <Json />
            <Button background="typescript" disabled={!todos.length} title="Exportar arquivo JSON" className="btn-sm ml-2" onClick={exportJson}>
               Exportar JSON
            </Button>
         </div>
         {todoFilter[0] === "Error404\\NotFound" ? (
            <h2 className="mt-3 text-center" title="Não há resultados para o(s) filtro(s)">Não há resultados para o(s) filtro(s)</h2>
         ) : (
               <div className="d-flex justify-content-center align-items-center flex-column">
                  <ul className="my-list">
                     {!todos.length ? (
                        <div className="d-flex justify-content-center align-items-center">
                           <h3 className="text-center" title="Você não tem atividades cadastradas!">Você não tem atividades cadastradas!</h3>
                        </div>
                     ) : (
                           todos.map((el, i) => i === edit?.id ? (
                              <li key={i} className={style(el, i)}>
                                 <form onSubmit={saveEdit} className="form-inline justify-content-between w-100">
                                    <input type="text" className="form-control w-75" title="Edite o título da atividade"
                                       defaultValue={edit.item} onChange={e => setEdit({ ...edit, item: e.target.value })}
                                    />
                                    <Button background="success" className="btn-sm" title="Salvar tarefa">
                                       <FaCheck />
                                    </Button>
                                 </form>
                              </li>
                           ) : (
                                 <li key={i} className={style(el, i)}>
                                    <div className="form-check-inline" title={el}>
                                       <input type="checkbox" id={el} className="form-check-input"
                                          defaultChecked={done.includes(i)} onClick={() => handleDone(i)}
                                       />
                                       <label htmlFor={el}>{el}</label>
                                    </div>
                                    <div className="btn-group">
                                       <Button background="warning" className="btn-sm" disabled={done.includes(i)} title="Editar tarefa" onClick={() => editItem(el, i)}>
                                          <FaEdit />
                                       </Button>
                                       <Button background="danger" className="btn-sm" disabled={done.includes(i)} title="Remover tarefa" onClick={() => remove(el)}>
                                          <FaTrash />
                                       </Button>
                                    </div>
                                 </li>
                              ))
                        )}
                  </ul>
               </div>
            )}
      </section>
   )
}

export default ListTodo