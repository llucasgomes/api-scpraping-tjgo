import { isNotSearch, processo } from '../lib/data/data'
import { scraping } from '../lib/puppeteer/search_process'

export const getProcess = async (req, res) => {
  // RECEBER OS DADOS
  const { searchProcess } = req.body

  await scraping(searchProcess.slice(0, 10))

  // VERIFICAÇÃO DE ERRO
  if (isNotSearch.is) {
    return res.status(400).json('Erro ao processar')
  }

  return res.status(200).json(processo)
}
