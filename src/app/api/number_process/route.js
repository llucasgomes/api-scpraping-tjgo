import { isNotSearch, processo } from "@/lib/data"
import { scraping } from "@/lib/puppeteer/search_process"

export async function POST(request) {
  const { searchProcess } = await request.json()


  await scraping(searchProcess.slice(0,10))

  // VERIFICAÇÃO DE ERRO
  if (isNotSearch.is) {
    return Response.json({
      Message: 'erro',
    })
  }

  

  return Response.json({
    Message: 'ok',
    processo
  })
}
