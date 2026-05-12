# Quanto Custa Mesmo?

*Quanto custa mesmo?* é uma ferramenta web de análise crítica de consumo que utiliza IA generativa para revelar o custo real de um produto, para além do preço de etiqueta.

## Motivação

O projeto surgiu a partir de algumas convicções pessoais. A primeira é o **direito ao reparo** (*right to repair*): um movimento e proposta de legislação que defende a capacidade dos consumidores de consertarem seus próprios aparelhos eletrônicos, eletrodomésticos e veículos, em oposição a fabricantes que colam baterias, serializam componentes, se recusam a vender peças avulsas e praticam a obsolescência programada. A segunda é a **autonomia do consumidor**, que só se realiza a partir da informação, não apenas a respeito do preço, mas do custo por uso, da consertabilidade do produto, do *lock-in* de ecossistema *etc*. A terceira é o **controle financeiro**, com a compreensão de que desejo é diferente de necessidade e de que, com frequência, "barato" e "caro" são noções que não se encerram no valor da etiqueta.

## Sobre

*Quanto Custa Mesmo?* parte de duas premissas simples: a de que o preço de um produto não reflete seu custo real e a de que informação é condição para um consumo consciente. A ferramenta recebe o nome de um produto e devolve uma análise estruturada que inclui:

- **Custo por uso**. Durabilidade estimada e custo mensal em diferentes cenários.
- **Reparabilidade**. Facilidade de conserto, disponibilidade de peças, postura da marca.
- **Custos ocultos**. Acessórios obrigatórios, assinaturas, *lock-in* de ecossistema.
- **Perguntas provocativas**. Questões específicas que o consumidor raramente se faz antes de comprar.
- **Alternativas**. Opções usadas, concorrentes, soluções *DIY* ou de reparo.
- **Veredito**. Uma opinião clara e fundamentada sobre a decisão de compra

## Tendência explorada

A tendência explorada foi a **IA Generativa** como ferramenta de análise crítica, em vez de geradora de conteúdo criativo. A qualidade do resultado depende, sobretudo, da engenharia de *prompt* aplicada. Neste projeto, foram utilizadas técnicas de *few-shot learning*, regras de tom e estrutura e posicionamento ideológico explícito, orientado ao consumo consciente e à anti-obsolescência.

## Stack técnica

| Camada | Tecnologia |
|--------|-----------|
| Interface | HTML, CSS e JavaScript |
| Modelo de linguagem | DeepSeek (via API REST) |
| Engenharia de *prompt* | Few-shot com exemplo de referência completo |
| Desenvolvimento assistido | Kiro CLI (chat interativo) |

## Como executar

### Pré-requisitos

- Python 3 (para o servidor local)
- API key do [DeepSeek](https://platform.deepseek.com) (depósito mínimo de US$ 2)

### Execução

```bash
cd quanto-custa-mesmo
python3 -m http.server 8000
```

Acesse `http://localhost:8000` no navegador, configure a API key no campo indicado e digite o nome de um produto.

## Estrutura do projeto

```
quanto-custa-mesmo/
├── index.html      
├── style.css       
├── app.js          
├── prompt.js       
├── markdown.js     
└── README.md
```

## Ferramentas utilizadas no desenvolvimento

- **[Kiro CLI](https://kiro.dev)**. Assistente de IA para desenvolvedores criado pela Amazon, utilizado na modalidade chat interativo para geração de código, iteração no *prompt* e resolução de problemas técnicos.
- **[DeepSeek API](https://platform.deepseek.com)**. Modelo de linguagem que executa a análise de produtos em tempo real.

## Contexto acadêmico

Trata-se de um experimento prático desenvolvido para a disciplina **Tendências em Mídias e Interação**, com o objetivo de produzir um artefato funcional que dialogue com pelo menos uma das tendências estudadas e demonstre uso inteligente de ferramentas de IA.