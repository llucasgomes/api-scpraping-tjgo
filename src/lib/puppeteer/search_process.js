import puppeteer from 'puppeteer'
import { url } from '../../constants/index.js'
import { isNotSearch, processo } from '../data/data.js'


export async function scraping(numberProcess) {
  const browser = await puppeteer.launch({ headless: 'new' })
  const page = await browser.newPage()

  // ABRINDO A PAGINA WEB COM A URL DESIGNADA
  await page.goto(url)

  // AGUARDAR ENCONTRAR O SELETOR
  await page.waitForSelector(
    'body > header > div.redQ > div > nav > div > ul > li:nth-child(2) > a',
    { timeout: 5000 },
  )

  await page.click(
    'body > header > div.redQ > div > nav > div > ul > li:nth-child(2) > a',
  )

  // // DEFINIR UM TEMPO PARA ESPERAR A PAGINA
  await page.waitForTimeout(2000)

  await page.waitForSelector('#ProcessoNumero')

  // DIGITA O O NUMERO DE PROCESSO
  await page.type('#ProcessoNumero', numberProcess)

  // DEFINIR UM TEMPO PARA ESPERAR A PAGINA
  await page.waitForTimeout(2000)
  await page.click('#btnBuscarProcPublico')

  // DEFINIR UM TEMPO PARA ESPERAR A PAGINA
  await page.waitForTimeout(2000)

  // VERIFICAO SE ENCONTRAR O PROCESSO
  const erro = await page.$('#mensagem-conteudo > strong')

  if (erro !== null) {
    isNotSearch.is = true
    await browser.close()
    return
  }

  // BUSCANDO DADOS DA PAGINA
  processo.id = await page.$eval('#tituloCapaProcesso', (el) => el.textContent)
  processo.area = await page.$eval(
    '#conteudoLista > div:nth-child(1) > div > div.segundaFolhaCapa > dl > dd:nth-child(2)',
    (el) => el.innerText,
  )
  processo.serventia = await page.$eval(
    '#conteudoLista > div:nth-child(1) > div > div.segundaFolhaCapa > dl > dd:nth-child(4)',
    (el) => el.innerText,
  )
  processo.valorCausa = await page.$eval(
    '#conteudoLista > div:nth-child(1) > div > div.segundaFolhaCapa > dl > dd:nth-child(6)',
    (el) => el.innerText,
  )
  processo.penhoraNoRosto = await page.$eval(
    '#conteudoLista > div:nth-child(1) > div > div.segundaFolhaCapa > dl > dt:nth-child(7)',
    (el) => el.innerText,
  )
  processo.faseProcessual = await page.$eval(
    '#conteudoLista > div:nth-child(1) > div > div.segundaFolhaCapa > dl > dd:nth-child(10)',
    (el) => el.innerText,
  )
  processo.segredoJustica = await page.$eval(
    '#conteudoLista > div:nth-child(1) > div > div.segundaFolhaCapa > dl > dd:nth-child(12) > i > span',
    (el) => el.innerText,
  )
  processo.situacao = await page.$eval(
    '#conteudoLista > div:nth-child(1) > div > div.segundaFolhaCapa > dl > dd:nth-child(14)',
    (el) => el.innerText,
  )
  processo.efeitoSuspensivo = await page.$eval(
    '#conteudoLista > div:nth-child(1) > div > div.segundaFolhaCapa > dl > dd:nth-child(16) > i > span',
    (el) => el.innerText,
  )
  processo.dataDistribuicao = await page.$eval(
    '#conteudoLista > div:nth-child(1) > div > div.segundaFolhaCapa > dl > dd:nth-child(18)',
    (el) => el.innerText,
  )
  processo.prioridade = await page.$eval(
    '#conteudoLista > div:nth-child(1) > div > div.segundaFolhaCapa > dl > dd:nth-child(20)',
    (el) => el.innerText,
  )
  processo.classe = await page.$eval(
    '#conteudoLista > div:nth-child(1) > div > div.segundaFolhaCapa > dl > dd:nth-child(22)',
    (el) => el.innerText,
  )
  processo.assunto = await page.$eval(
    '#conteudoLista > div:nth-child(1) > div > div.segundaFolhaCapa > dl > dd:nth-child(24) > table > tbody > tr > td',
    (el) => el.innerText,
  )
  processo.custa = await page.$eval(
    '#conteudoLista > div:nth-child(1) > div > div.segundaFolhaCapa > dl > dd:nth-child(26)',
    (el) => el.innerText,
  )

  // BUSCANDO DADOS DA TABELA 01  ( Advogados Habilitados )
  processo.advHabiltados = await page.evaluate(() => {
    const tabelaSelector = '#tabListaAdvogadoParte'

    const itens = Array.from(document.querySelectorAll(`${tabelaSelector} tr`))

    const dadosExtraidos = itens.map((item) => {
      const tds = item.querySelectorAll('td')

      const advH = {
        parte: '',
        oab: '',
        nome: '',
        dativo: '',
        recebeIntimacao: '',
        dataHabilitacao: '',
        serventia: '',
      }

      for (let i = 0; i < tds.length; i++) {
        if (i === 0) advH.parte = tds[i].innerText
        if (i === 1) advH.oab = tds[i].innerText
        if (i === 2) advH.nome = tds[i].innerText
        if (i === 3) advH.dativo = tds[i].innerText
        if (i === 4) advH.recebeIntimacao = tds[i].innerText
        if (i === 5) advH.dataHabilitacao = tds[i].innerText
        if (i === 6) advH.serventia = tds[i].innerText
      }

      return advH
    })

    return dadosExtraidos
  })

  // BUSCANDO DADOS DA TABELA 02 ( Polo Ativo )
  processo.poloAtivo = await page.evaluate(() => {
    const tabelaSelector = '#poloAtivoTable > tbody'

    const itens = Array.from(document.querySelectorAll(`${tabelaSelector} tr`))

    const dadosExtraidos = itens.map((item) => {
      const conteudos = item.querySelectorAll('td span span')

      const poloAtivo = {
        name: '',
      }

      for (let i = 0; i < conteudos.length; i++) {
        poloAtivo.name = conteudos[i].innerText
      }

      return poloAtivo
    })

    return dadosExtraidos
  })

  // BUSCANDO DADOS DA TABELA 03 ( Polo Passivo )
  processo.poloPassivo = await page.evaluate(() => {
    const tabelaSelector = '#poloPassivoTable > tbody'

    const itens = Array.from(document.querySelectorAll(`${tabelaSelector} tr`))

    const dadosExtraidos = itens.map((item) => {
      const conteudos = item.querySelectorAll('td span')

      const poloAtivo = {
        name: '',
      }

      for (let i = 0; i < conteudos.length; i++) {
        poloAtivo.name = conteudos[i].innerText
      }

      return poloAtivo
    })

    return dadosExtraidos
  })

  // FAZENDO O FILTRO DE LISTAS VAZIAS PARA DEPOIS ADICIONAR NOS DADOS
  const movimentos = await page.evaluate(() => {
    const tabelaSelector = '#tabListaProcesso'

    const itens = Array.from(
      document.querySelectorAll(`${tabelaSelector} li a`),
    )

    const dadosExtraidos = itens.map((item) => {
      const elemetosfilhos = item.children

      const movimento = {
        id: '',
        tipo: '',
        usuarioResponsavel: '',
        conteudo: '',
        data: '',
      }

      for (let i = 0; i < elemetosfilhos.length; i++) {
        if (i === 0) movimento.id = elemetosfilhos[i].innerText
        if (i === 1) movimento.tipo = elemetosfilhos[i].innerText

        if (i === 3) {
          const usuario = elemetosfilhos[i].innerText
          movimento.usuarioResponsavel = usuario.replace(
            'Usuário responsável: ',
            '',
          )
        }

        if (i === 5) movimento.conteudo = elemetosfilhos[i].innerText
        if (i === 6) movimento.data = elemetosfilhos[i].innerText
      }

      return movimento
    })

    return dadosExtraidos
  })

  processo.movimentos = movimentos.filter((item) => item.id !== '')

  await browser.close()

  
}