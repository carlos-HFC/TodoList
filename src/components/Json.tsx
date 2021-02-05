import { ChangeEvent } from 'react'

const Json: React.FC<{}> = () => {
  const todos = JSON.parse(localStorage.getItem("TODO") as string) || []

  function readFile(file: File) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result)
      reader.onerror = (error) => reject(error)
      reader.readAsText(file)
    })
  }

  function upload(e: ChangeEvent<HTMLInputElement>) {
    const arquivo = e.target.files && e.target.files[0]

    readFile(arquivo as File)
      .then(base => {
        const newTodo = JSON.parse(base as string)

        const arr = Array.from(new Set([...JSON.parse(newTodo), ...todos]))

        localStorage.setItem("TODO", JSON.stringify(arr))
        window.location.reload()
      })
  }

  return (
    <label htmlFor="uploadJson" title="Importar arquivo JSON" className="btn btn-typescript btn-sm">
      <input type="file" id="uploadJson" className="d-none" accept=".json" onChange={upload} />
      Importar JSON
    </label>
  )
}

export default Json
