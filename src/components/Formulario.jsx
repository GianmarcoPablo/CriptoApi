import { useEffect,useState } from "react"
import styled from "@emotion/styled"
import useSelectModenas from "../hooks/useSelectModenas"
import { monedas } from "../data/monedas"

const InputSubmit = styled.input `
    background-color: #9497ff;
    border: none;
    width: 100%;
    padding: 10px;
    color: #fff;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 20px;
    border-radius: 5px;
    transition: background-color .3s ease;
    margin-top: 30px;
    &:hover {
        background-color: #7a7dfe;
        cursor: pointer;
    }
`

const Formulario = () => {

  const [criptos,setCriptos] = useState([])

  const [moneda,SelectMonedas] = useSelectModenas("Elige tu moneda",monedas)
  const [criptomoneda,SelectCriptomoneda] = useSelectModenas("Elige tu Criptomoneda",criptos)

  useEffect(() => {
    const consultarApi = async () =>{
      const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD"
      const respuesta = await fetch(url)
      const resultado = await respuesta.json()
      const arrayCriptos = resultado.Data.map( cripto=>{
        const objeto = {
          id: cripto.CoinInfo.Name,
          nombre: cripto.CoinInfo.FullName
        }
        return objeto
      })

      setCriptos(arrayCriptos)
    }
    consultarApi()
  }, [])
  
  return (
    <form>
        <SelectMonedas/>
        <SelectCriptomoneda/>
        <InputSubmit 
            type="submit"
            value="Cotizar"
        />
    </form>
  )
}

export default Formulario