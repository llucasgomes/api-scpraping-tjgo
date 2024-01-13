import puppeteer from 'puppeteer';
import { url } from '../../constants/index.js';
import { isNotSearch, processo } from '../data/data.js';




export async function scraping(number_process) {
  console.time('Tempo: ')
  
  
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage()

  //ABRINDO A PAGINA WEB COM A URL DESIGNADA
  await page.goto(url)

  //AGUARDAR ENCONTRAR O SELETOR
  await page.waitForSelector('body > header > div.redQ > div > nav > div > ul > li:nth-child(2) > a',{ timeout: 5000 })
  
  await page.click('body > header > div.redQ > div > nav > div > ul > li:nth-child(2) > a')
  

  //DEFINIR UM TEMPO PARA ESPERAR A PAGINA
  await page.waitForTimeout(2000)
  

  await page.waitForSelector('#ProcessoNumero')
  
  
  //DIGITA O O NUMERO DE PROCESSO
  await page.type('#ProcessoNumero', number_process)


  //DEFINIR UM TEMPO PARA ESPERAR A PAGINA
  await page.waitForTimeout(2000)
  await page.click('#btnBuscarProcPublico')


  // console.log("Entrando na Validação")
   //DEFINIR UM TEMPO PARA ESPERAR A PAGINA
   await page.waitForTimeout(2000)

   
   //VERIFICAO SE ENCONTRAR O PROCESSO 
   const erro  = await page.$('#mensagem-conteudo > strong')

   if (erro !== null) {
    isNotSearch.is = true
    //  console.log('Nenhum dados Encontrado') 
    //  console.log(isNotSearch.is)
     await browser.close()
     console.log(isNotSearch.is)
    //  console.timeEnd('Tempo: ')
     return
   
   }



  // BUSCANDO DADOS DA PAGINA
  processo.id = await page.$eval('#tituloCapaProcesso',el => el.textContent)
  processo.area = await page.$eval('#conteudoLista > div:nth-child(1) > div > div.segundaFolhaCapa > dl > dd:nth-child(2)',el => el.innerText)
  processo.serventia = await page.$eval('#conteudoLista > div:nth-child(1) > div > div.segundaFolhaCapa > dl > dd:nth-child(4)',el => el.innerText)
  processo.valorCausa = await page.$eval('#conteudoLista > div:nth-child(1) > div > div.segundaFolhaCapa > dl > dd:nth-child(6)',el => el.innerText)
  processo.penhoraNoRosto = await page.$eval('#conteudoLista > div:nth-child(1) > div > div.segundaFolhaCapa > dl > dt:nth-child(7)',el => el.innerText)
  processo.faseProcessual = await page.$eval('#conteudoLista > div:nth-child(1) > div > div.segundaFolhaCapa > dl > dd:nth-child(10)',el => el.innerText)
  processo.segredoJustica = await page.$eval('#conteudoLista > div:nth-child(1) > div > div.segundaFolhaCapa > dl > dd:nth-child(12) > i > span',el => el.innerText)
  processo.situacao = await page.$eval('#conteudoLista > div:nth-child(1) > div > div.segundaFolhaCapa > dl > dd:nth-child(14)',el => el.innerText)
  processo.efeitoSuspensivo = await page.$eval('#conteudoLista > div:nth-child(1) > div > div.segundaFolhaCapa > dl > dd:nth-child(16) > i > span',el => el.innerText)
  processo.dataDistribuicao = await page.$eval('#conteudoLista > div:nth-child(1) > div > div.segundaFolhaCapa > dl > dd:nth-child(18)',el => el.innerText)
  processo.prioridade = await page.$eval('#conteudoLista > div:nth-child(1) > div > div.segundaFolhaCapa > dl > dd:nth-child(20)',el => el.innerText)
  processo.classe = await page.$eval('#conteudoLista > div:nth-child(1) > div > div.segundaFolhaCapa > dl > dd:nth-child(22)',el => el.innerText)
  processo.assunto = await page.$eval('#conteudoLista > div:nth-child(1) > div > div.segundaFolhaCapa > dl > dd:nth-child(24) > table > tbody > tr > td',el => el.innerText)
  processo.custa = await page.$eval('#conteudoLista > div:nth-child(1) > div > div.segundaFolhaCapa > dl > dd:nth-child(26)',el => el.innerText)
  

  //BUSCANDO DADOS DA TABELA 01  ( Advogados Habilitados )
  processo.advHabiltados = await page.evaluate(() => {
    // Seletor ID para a tabela (ajuste conforme sua estrutura HTML)
    const tabelaSelector = '#tabListaAdvogadoParte';

    // Selecionar todos os itens da tabela
    const itens = Array.from(document.querySelectorAll(`${tabelaSelector} tr`));

    // Extrair dados dos itens da tabela (exemplo: texto do primeiro td em cada tr)
    const dadosExtraidos = itens.map(item => {
      const tds = item.querySelectorAll('td');
      
      const advH = {
        parte:'',
        oab:'',
        nome:'',
        dativo:'',
        recebeIntimacao:'',
        dataHabilitacao:'',
        serventia:'',
      }
      
      for (let i = 0; i < tds.length; i++) {
        i == 0? advH.parte = tds[i].innerText : null
        i == 1? advH.oab = tds[i].innerText : null
        i == 2? advH.nome = tds[i].innerText : null
        i == 3? advH.dativo = tds[i].innerText : null
        i == 4? advH.recebeIntimacao = tds[i].innerText : null
        i == 5? advH.dataHabilitacao = tds[i].innerText : null
        i == 6? advH.serventia = tds[i].innerText : null
        // i == 6? result.push(advH) : null

      }


      return advH
    });

    return dadosExtraidos;
  });


  // BUSCANDO DADOS DA TABELA 02 ( Polo Ativo )
  processo.poloAtivo = await page.evaluate(() => {
    // Seletor CSS para a tabela (ajuste conforme sua estrutura HTML)
    const tabelaSelector = '#poloAtivoTable > tbody';

    // Selecionar todos os itens da tabela
    const itens = Array.from(document.querySelectorAll(`${tabelaSelector} tr`));

    // Extrair dados dos itens da tabela (exemplo: texto do primeiro td em cada tr)
    const dadosExtraidos = itens.map(item => {
      const conteudos = item.querySelectorAll('td span span');
      
      const poloAtivo = {
        name:''
      }
      
      for (let i = 0; i < conteudos.length; i++) {
        poloAtivo.name = conteudos[i].innerText
        // i == 6? result.push(advH) : null

      }


      return poloAtivo
    });

    return dadosExtraidos;
  });

  // BUSCANDO DADOS DA TABELA 03 ( Polo Passivo )
  processo.poloPassivo = await page.evaluate(() => {
    // Seletor CSS para a tabela (ajuste conforme sua estrutura HTML)
    const tabelaSelector = '#poloPassivoTable > tbody';

    // Selecionar todos os itens da tabela
    const itens = Array.from(document.querySelectorAll(`${tabelaSelector} tr`));

    // Extrair dados dos itens da tabela (exemplo: texto do primeiro td em cada tr)
    const dadosExtraidos = itens.map(item => {
      const conteudos = item.querySelectorAll('td span');
      
      const poloAtivo = {
        name:''
      }
      
      for (let i = 0; i < conteudos.length; i++) {
        poloAtivo.name = conteudos[i].innerText

      }


      return poloAtivo
    });

    return dadosExtraidos;
  });


  // FAZENDO O FILTRO DE LISTAS VAZIAS PARA DEPOIS ADICIONAR NOS DADOS
  const movimentos = await page.evaluate(() => {
    // Seletor CSS para a tabela (ajuste conforme sua estrutura HTML)
    const tabelaSelector = '#tabListaProcesso';

  

    // Selecionar todos os itens da tabela
    const itens = Array.from(document.querySelectorAll(`${tabelaSelector} li a`));

    // Extrair dados dos itens da tabela (exemplo: texto do primeiro td em cada tr)
    const dadosExtraidos = itens.map(item => {
      const elemetosfilhos = item.children
      
      const movimento = {
        id:'',
        tipo:'',
        usuarioResponsavel:'',
        conteudo:'',
        data:''
      }
      
      for (let i = 0; i < elemetosfilhos.length; i++) {
        
        i == 0? movimento.id = elemetosfilhos[i].innerText : null
        i == 1? movimento.tipo = elemetosfilhos[i].innerText : null

        if (i == 3) {
          const  usuario = elemetosfilhos[i].innerText
          movimento.usuarioResponsavel = usuario.replace('Usuário responsável: ','')
        }
        
        // i == 3? movimento.usuarioResponsavel = String(elemetosfilhos[i].innerText).replace('Usuário responsável: ','') : null
        // i == 3? movimento.usuarioResponsavel = elemetosfilhos[i].innerText : null
        i == 5? movimento.conteudo = elemetosfilhos[i].innerText : null
        i == 6? movimento.data = elemetosfilhos[i].innerText : null
      }


      return movimento
    });

    return dadosExtraidos;
  });

  processo.movimentos = movimentos.filter(item => item.id !='')

  await browser.close()

  // console.log('Finalizou a busca com sucesso')
  console.timeEnd('Tempo: ')
}

// scraping('5116585-99')
// console.log('Iniciando como:',isNotSearch.is)


