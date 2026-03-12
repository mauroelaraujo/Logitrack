# Copilot Instructions

Este documento orienta o uso do GitHub Copilot neste projeto React + Vite, com PrimeReact e PrimeFlex, para garantir sugestões de código alinhadas às melhores práticas e padrões do repositório.

## Padrões Gerais
- Priorize componentes funcionais e hooks do React.
- Utilize PrimeReact para componentes visuais e PrimeFlex para layout responsivo.
- Mantenha o código modular, reutilizável e com separação clara entre lógica, apresentação e configuração.
- Prefira o uso de contextos para autenticação e gerenciamento de estado global.
- Siga a estrutura de pastas definida em `src/`.

## Boas Práticas de Código
- Use nomes de variáveis, funções e componentes claros e descritivos.
- Adote convenções de nomenclatura camelCase para variáveis e PascalCase para componentes.
- Importe apenas o necessário de cada biblioteca.
- Evite duplicação de código e repita lógica apenas quando necessário.
- Utilize ESLint para garantir padronização e qualidade.

## Estilo e Layout
- Utilize classes utilitárias do PrimeFlex para espaçamento, alinhamento e grid.
- Prefira componentes do PrimeReact para formulários, tabelas, diálogos e menus.
- Garanta responsividade e acessibilidade em todos os componentes.

## Documentação e Comentários
- Documente funções e componentes complexos com comentários claros.
- Mantenha o `README.md` atualizado com instruções de uso e arquitetura.

## Testes e Validação
- Sugira testes unitários para funções e componentes críticos.
- Oriente o uso de mocks para chamadas à API em testes.

## Segurança
- Oriente boas práticas para manipulação de dados sensíveis e autenticação JWT.
- Evite exposição de dados confidenciais no frontend.
- Para funcionalidades administrativas, aplique sempre a mesma lógica de autorização em UI e rota:
   - Ocultar itens de menu para usuários sem role `Admin`.
   - Manter proteção de rota com validação de role `Admin` (além da ocultação visual).
   - Reutilizar utilitários compartilhados de role para evitar duplicação de lógica.

## Padrão de Erros de API
- Centralize endpoints e utilitários HTTP em `src/utils/api.ts`.
- Para falhas HTTP, use `ApiError` com status e mensagem padronizados.
- Ao tratar respostas não-OK, prefira `createApiErrorFromResponse` para aproveitar mensagem retornada pela API.
- Ao capturar exceções desconhecidas (timeout/network/erro inesperado), normalize com `normalizeApiError`.
- Evite `throw new Error(...)` para erros de API; use sempre o padrão tipado para permitir decisões de fluxo (ex.: redirecionamento 403).
- Em páginas novas com consumo de API, use `useApiErrorNavigation` para redirecionar por status (401/403/500) de forma consistente.

## Exemplos de Sugestão
- Sugira componentes que utilizem PrimeReact e PrimeFlex.
- Oriente o uso de hooks personalizados para lógica reutilizável.
- Sugira padrões de proteção de rotas e contexto de autenticação.

---
Essas instruções garantem que o Copilot gere código alinhado ao padrão do projeto, facilitando manutenção, escalabilidade e colaboração.
