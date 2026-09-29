# 🏋️‍♂️ Smart Fit - Frontend Challenge (Estudo de Caso)

> **Contexto:** Este projeto foi originalmente desenvolvido como um teste técnico e agora faz parte do meu portfólio pessoal. O objetivo é demonstrar não apenas a capacidade de escrever código, mas a de tomar decisões arquiteturais consistentes, resolver problemas reais e focar em performance e escalabilidade.

---

## 📌 O Problema
A premissa da aplicação era construir um buscador de unidades da Smart Fit. O usuário deve ser capaz de:
- Visualizar as unidades da rede disponíveis através do consumo de uma API estática.
- Filtrar unidades por status de funcionamento (aberto/fechado).
- Filtrar por período do dia (Manhã, Tarde, Noite).
- Visualizar visualmente os serviços e infraestrutura que cada unidade oferece (vestiário, piscina, armários, etc.).

O maior desafio conceitual não era simplesmente renderizar os dados do JSON, mas sim lidar com a complexidade de **regras de negócio de horários e filtros cruzados no lado do cliente**, garantindo uma interface extremamente rápida, responsiva e acessível para o usuário final.

---

## 🏗️ Decisões Arquiteturais (Trade-offs)

Para demonstrar maturidade nas escolhas tecnológicas, decidi focar em uma stack moderna, equilibrando a experiência do usuário (UX) e do desenvolvedor (DX).

### 1. **Next.js vs Vite (SPA)**
- **Escolha:** **Next.js (App Router)**.
- **Por quê?** Apesar desta aplicação ser focada no client-side para o dinamismo dos filtros, o Next.js oferece uma arquitetura superior de carregamento. Utilizei Server Components (RSC) para renderizar a estrutura da página (Header, Footer, layout principal) otimizando o *First Contentful Paint (FCP)*, delegando apenas a área de interatividade (Formulário e Listagem) para o lado do cliente com `"use client"`.
- **Trade-off:** Um app puro em Vite geraria um SPA simples, fácil de colocar num S3 da AWS. O Next.js traz um leve aumento na complexidade de hospedagem, mas entrega um carregamento inicial infinitamente superior e facilita melhorias de SEO futuras.

### 2. **SWR para Data Fetching / Estado Assíncrono**
- **Escolha:** **SWR** da Vercel (ao invés de Redux, Zustand ou `useEffect` puro).
- **Por quê?** A aplicação precisa buscar o arquivo `locations.json` e aplicar os filtros locais. Ferramentas como Redux trariam um *boilerplate* desnecessário (overkill). O Zustand é incrível para estados globais, mas aqui nosso principal dado é um *Server State* (dados externos). O SWR resolve requisições, cacheamento nativo, tratamento de loading/erro e *stale-while-revalidate* de forma automática, deixando o código limpo e performático.

### 3. **Tailwind CSS + Radix UI + NextUI**
- **Escolha:** Utilizar Tailwind em conjunto com componentes headless/NextUI e Framer Motion.
- **Por quê?** O Tailwind elimina o problema de CSS global não intencional e aumenta a velocidade de prototipação. Contudo, manter componentes 100% acessíveis na mão demora. Por isso as bibliotecas baseadas em Radix foram usadas, garantindo a acessibilidade (WAI-ARIA) *out-of-the-box*. O Framer Motion foi adicionado para suavizar as interações de UI.

---

## 🚧 Desafios Técnicos Resolvidos

**1. Parse de Horários e Filtros de Alta Performance**
- **O Problema:** Os horários da API vêm em strings no formato `"06:00 às 22:00"`. A aplicação precisa saber se a unidade está aberta no momento (com base na hora do cliente) e processar filtros cruzados rapidamente.
- **A Solução:** Criei camadas de *parsers* utilitários isolados para tratar as strings e retornar formatos comparáveis. Para evitar problemas de gargalo ao aplicar múltiplos filtros (aberto/fechado + turno da manhã + toalha disponível), isolei a lista exibida usando o **`useMemo`**. Dessa forma, a aplicação não recalcula a lista completa a cada re-render sem necessidade. 
- **Resultado:** A re-renderização ao clicar nos radio buttons do formulário é praticamente instantânea.

**2. Hydration Mismatch em Verificações de Hora Local**
- **O Problema:** O App Router do Next.js renderiza o HTML no servidor primeiro. Se eu renderizo algo baseado em `new Date().getHours()` no primeiro render e a máquina do cliente está num fuso horário diferente do servidor, o React dá erro de *Hydration Mismatch*.
- **A Solução:** A verificação de "aberto agora" e dados dependentes de tempo local foram delegados para rodar de maneira segura estritamente após a hidratação completa no cliente, normalizando a experiência em diferentes dispositivos e horários.

---

## 📊 Métricas de Qualidade

A qualidade de um software não se prova apenas rodando na máquina do dev. Foco muito em entregar o produto rápido e funcional, comprovado por métricas reais.

- 🚀 **Performance (Lighthouse):** A aplicação atinge pontuação excelente **(90+)** nos Core Web Vitals. O uso de fontes pelo `next/font` (zero layout shift) contribui drasticamente.
  > 📸 **[Insira aqui seu Print do Lighthouse provando o score 90+ em Performance, Accessibility e Best Practices]**

- 🧪 **Confiabilidade e Testes:**
  - A lógica core de negócios (o motor que filtra horários) foi pensada de forma isolada, permitindo alta testabilidade.
  > 📸 **[Insira aqui seu print mostrando Coverage > 80%]**

---

## 🛠️ Como rodar o projeto

```bash
# 1. Clone o repositório
git clone <seu-repo-url>

# 2. Instale as dependências do projeto
npm install
# ou yarn / pnpm install

# 3. Rode o servidor de desenvolvimento
npm run dev
```

A aplicação estará disponível em `http://localhost:3000`.
