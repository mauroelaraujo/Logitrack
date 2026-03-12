# Copilot Instructions

Este arquivo define diretrizes para o uso do GitHub Copilot e outras ferramentas de IA no projeto Logitrack Backend, visando garantir qualidade, segurança e padronização.

## 1. Padrões de Código
- Siga as convenções Java e Spring Boot (nomes de classes, métodos, variáveis, pacotes).
- Utilize Lombok para reduzir boilerplate (ex: @Getter, @Setter, @RequiredArgsConstructor).
- Prefira DTOs para comunicação entre camadas e APIs.
- Use tipo record para DTOs imutáveis.
- Use mapeadores para conversão entre entidades e DTOs.
- Centralize tratamento de exceções com @ControllerAdvice.
- Implemente segurança com JWT/OAuth2 e valide dados de entrada com Bean Validation.
- Documente endpoints com Swagger/OpenAPI e mantenha a documentação atualizada.
- Escreva testes automatizados para controllers, services e mappers usando JUnit e Mockito, garantindo cobertura mínima de 80% para código crítico.
- utilize sempre o padrão de projeto MVC (Model-View-Controller) para organizar o código e separar responsabilidades.
- Evite código duplicado e siga o princípio DRY (Don't Repeat Yourself) para manter o código limpo e fácil de manter.
- Use logs para monitorar o comportamento da aplicação e facilitar a depuração.
- Utilize Clean Architecture para organizar o código em camadas, garantindo separação de responsabilidades e facilitando a manutenção e escalabilidade do projeto.
- Siga as melhores práticas de segurança, como proteger endpoints sensíveis, validar dados de entrada e evitar exposição de segredos ou credenciais em código ou documentação.

## 2. Estrutura de Pastas
- `controller/`: Endpoints REST.
- `service/`: Regras de negócio.
- `repository/`: Persistência JPA.
- `model/`: Entidades.
- `dto/`: Data Transfer Objects.
- `mapper/`: Conversão entre entidades e DTOs.
- `sec/`: Segurança (JWT, OAuth2).
- `advice/`: Tratamento global de exceções.

## 3. Documentação
- Documente endpoints com Swagger/OpenAPI.
- Adicione comentários explicativos em métodos complexos.
- Atualize README.md e arquivos de instrução sempre que houver mudanças relevantes.

## 4. Testes
- Implemente testes automatizados para controllers, services e mappers.
- Utilize JUnit e Mockito.
- Garanta cobertura mínima de 80% para código crítico.

## 5. Segurança
- Proteja endpoints sensíveis com JWT/OAuth2.
- Nunca exponha segredos ou credenciais em código ou documentação.
- Valide dados de entrada com Bean Validation.

## 6. Dependências
- Use apenas dependências necessárias e mantenha-as atualizadas.
- Prefira dependências estáveis e amplamente utilizadas.

## 7. Contribuição
- Siga o fluxo de pull requests e revisão de código.
- Descreva claramente as mudanças em cada PR.
- Resolva conflitos antes de solicitar merge.

## 8. Boas Práticas Copilot
- Sempre revise o código sugerido pela IA antes de commitar.
- Evite aceitar sugestões que não estejam alinhadas com os padrões do projeto.
- Use Copilot para acelerar tarefas repetitivas, mas priorize decisões técnicas humanas.

## 9. Resolução de Problemas Comuns

### Incompatibilidade de Versões (NoSuchMethodError)
- Ao encontrar erros de `NoSuchMethodError` com `ControllerAdviceBean` ou similares:
  - Verifique compatibilidade entre Spring Framework, Spring Boot e bibliotecas de terceiros (ex: springdoc-openapi).
  - Para Spring 6.2.x, use **springdoc-openapi v2.8.0+**.
  - Execute `mvn clean install` após atualizar dependências.
  - Reinicie a aplicação e limpe o cache do VS Code se necessário (`Ctrl+Shift+P` → `Developer: Reload Window`).

### Limpeza de Cache do VS Code
- Feche o VS Code completamente.
- Apague as pastas de cache (Windows):
  - `%APPDATA%\Code\Cache`
  - `%APPDATA%\Code\CachedData`
  - `%APPDATA%\Code\Service Worker`
- Reabra o VS Code.

## 10. Licença
- Respeite a licença MIT do projeto.
